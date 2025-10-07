import { Webhook } from "svix";
import {headers} from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(request: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET


    if (!WEBHOOK_SECRET) {
        throw new Error("please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local");
    }

    const headerPayload =  headers();
    const svix_id = (await headerPayload).get("svix-id");
    const svix_timestamp = (await headerPayload).get("svix-timestamp");
    const svix_signature = (await headerPayload).get("svix-signature");

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', { 
            status: 400 
        });
    }

    const payload = await request.json();
    const body = JSON.stringify(payload);

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt: WebhookEvent;

    try {
        evt = wh.verify(
            body,
            {
                "svix-id": svix_id,
                "svix-timestamp": svix_timestamp,
                "svix-signature": svix_signature,
            }
        ) as WebhookEvent;
    } 
    catch (err) {
        console.error("Error verifying WebHook:", err);
        return new Response('Error occured -- unable to verify event', { 
            status: 400 
        });
    }

    const eventType = evt.type;

    if (eventType === "user.created") {
        await db.user.create({
            data: {
                externalUserId: payload.data.id,
                username: payload.data.username,
                imageUrl: payload.data.image_url,
                stream : {
                    create : {
                        name : `${payload.data.username}'s Stream`,
                    },
                },
            },
        });
    }

    if (eventType === "user.updated") {
        await db.user.update({
            where: {
                externalUserId: payload.data.id,
            },
            data: {
                username: payload.data.username,
                imageUrl: payload.data.image_url,
            }
        });
    }

    if (eventType === "user.deleted") {
        await db.user.delete({
            where: {
                externalUserId: payload.data.id,
            }
        });
    }


    return new Response('Webhook received', { 
        status: 200 
    });

}
