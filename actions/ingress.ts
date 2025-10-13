"use server";

import {
    IngressAudioEncodingPreset,
    IngressInput,
    IngressClient,
    IngressVideoEncodingPreset,
    RoomServiceClient,
    type CreateIngressOptions,
} from "livekit-server-sdk";
import { TrackSource } from "livekit-server-sdk/dist/proto/livekit_models";

import {db} from "@/lib/db";
import {getSelf} from "@/lib/auth-service";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

// Simple rate limiting to prevent multiple rapid requests
const lastRequestTime = new Map<string, number>();
const RATE_LIMIT_DELAY = 2000; // 2 seconds between requests per user

export const resetIngresses = async (hostIdentity : string) => {
    try {
        const ingresses = await ingressClient.listIngress({
            roomName : hostIdentity,
        });

        const rooms = await roomService.listRooms([hostIdentity]);

        // Add delay between API calls to avoid rate limiting
        for (const room of rooms){
            await roomService.deleteRoom(room.name);
            await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay
        }

        for (const ingress of ingresses){
            if(ingress.ingressId){
                await ingressClient.deleteIngress(ingress.ingressId);
                await new Promise(resolve => setTimeout(resolve, 100)); // 100ms delay
            }   
        }
    } catch (error) {
        console.error("Error resetting ingresses:", error);
        // Don't throw error, just log it and continue
    }
};

export const createIngress = async (ingressType : IngressInput) => {
    try {
        const self = await getSelf();
        
        // Check rate limiting
        const now = Date.now();
        const lastRequest = lastRequestTime.get(self.id);
        if (lastRequest && now - lastRequest < RATE_LIMIT_DELAY) {
            throw new Error("Please wait a moment before generating another connection.");
        }
        lastRequestTime.set(self.id, now);

        await resetIngresses(self.id);

        const options : CreateIngressOptions ={
            name : self.username,
            roomName : self.id,
            participantName : self.username,
            participantIdentity : self.id,
        };
        if (ingressType === IngressInput.WHIP_INPUT){
            options.bypassTranscoding = true;
        }
        else {
            options.video = {
                source : TrackSource.CAMERA,
                preset : IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
            };
            options.audio = {
                source : TrackSource.MICROPHONE,
                preset : IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
            };
        };
        
        const ingress = await ingressClient.createIngress(
            ingressType,
            options
        );

        if (!ingress || !ingress.url || !ingress.streamKey){
            throw new Error("Ingress not created");
        }
        
        await db.stream.update({
            where : {userId : self.id},
            data : {
                ingressId : ingress.ingressId,
                serverUrl : ingress.url,
                streamKey : ingress.streamKey,
            },
        });
        
        revalidatePath(`/u/${self.username}/keys`);
        return ingress;
    } catch (error) {
        console.error("Error creating ingress:", error);
        if (error instanceof Error && error.message.includes("429")) {
            throw new Error("Rate limit exceeded. Please wait a moment and try again.");
        }
        throw new Error("Failed to create ingress. Please try again.");
    }
};