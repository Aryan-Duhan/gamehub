import { getSelf } from "@/lib/auth-service";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { db } from "@/lib/db";

const f = createUploadthing();

export const ourFileRouter = {
  thumbnailUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const self = await getSelf();
      if (!self) throw new Error("Unauthorized");

      // Pass all we need to update DB later
      return {
        userId: self.id,
        username: self.username,
      };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        console.log("✅ Upload callback received for:", metadata.username);

        await db.stream.update({
          where: { userId: metadata.userId },
          data: { thumbnailUrl: file.url },
        });

        console.log("🧩 Thumbnail URL updated successfully.");
      } catch (error) {
        console.error("❌ DB update failed:", error);
      }

      return { fileUrl: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

