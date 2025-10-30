"use client";

import { useState, useTransition, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";
import { UploadButton } from "@/lib/uploadthing";

interface InfoModalProps {
  initialName: string;
  initialThumbnailUrl: string | null;
}

export const InfoModal = ({
  initialName,
  initialThumbnailUrl,
}: InfoModalProps) => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] = useState(initialThumbnailUrl);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    startTransition(() => {
      updateStream({
        name,
        thumbnailUrl,
      })
        .then(() => {
          toast.success("Stream info updated!");
          closeRef?.current?.click();
          router.refresh();
        })
        .catch(() => toast.error("Something went wrong"));
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" size="sm" className="ml-auto">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit stream info</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              disabled={isPending}
              placeholder="Stream name"
              onChange={onChange}
              value={name}
            />
          </div>

          <div className="space-y-2">
            <Label>Thumbnail</Label>
            <div className="rounded-xl border outline-dashed outline-muted p-3">
              <UploadButton
                endpoint="thumbnailUploader"
                onClientUploadComplete={(res) => {
                  console.log("✅ Client upload complete:", res);
                  const uploadedUrl = res?.[0]?.url; // ✅ correct field name
                  if (uploadedUrl) {
                    setThumbnailUrl(uploadedUrl);
                    toast.success("Thumbnail uploaded successfully!");
                  } else {
                    toast.error("No file URL returned from UploadThing.");
                  }
                }}
                onUploadError={(error) => {
                  console.error("❌ Upload failed:", error);
                  toast.error("Upload failed. Please try again.");
                }}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isPending} variant="primary" type="submit">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
