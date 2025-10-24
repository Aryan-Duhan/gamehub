import { getSelf } from "@/lib/auth-service";
import { createUploadthing, type FileRouter } from "uploadthing/server";
import { UploadThingError } from "uploadthing/server";
import { db } from "@/lib/db";

const f = createUploadthing();

export const ourFileRouter = {
    thumbnailUploader: f({ image: { maxFileSize: "4MB" , maxFileCount: 1 } })
        .middleware(async() => {
            try {
                const self = await getSelf();
                console.log("Middleware - user authenticated:", self.id);
                return { user : self}
            } catch (error) {
                console.error("Middleware error:", error);
                throw new UploadThingError("Authentication failed");
            }
        })
        .onUploadComplete(async ({ metadata, file }) => {
            try {
                console.log("Upload complete - updating database:", {
                    userId: metadata.user.id,
                    fileUrl: file.url
                });
                
                // First check if stream exists
                const existingStream = await db.stream.findUnique({
                    where: {
                        userId: metadata.user.id
                    }
                });

                if (!existingStream) {
                    console.error("Stream not found for user:", metadata.user.id);
                    throw new UploadThingError("Stream not found");
                }

                const updatedStream = await db.stream.update({
                    where : {
                        userId : metadata.user.id
                    },
                    data : {
                        thumbnailUrl : file.url
                    },
                });
                
                console.log("Database updated successfully:", updatedStream);
                return { fileUrl : file.url };
            } catch (error) {
                console.error("Database update failed:", error);
                throw new UploadThingError("Failed to update database");
            }
        })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
