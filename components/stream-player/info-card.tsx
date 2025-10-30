"use client";

import { Pencil } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { InfoModal } from "./info-modal";
import Image from "next/image";

interface InfoCardProps {
  name: string;
  thumbnailUrl: string | null;
  hostIdentity: string;
  viewerIdentity: string;
}

export const InfoCard = ({
  name,
  thumbnailUrl,
  hostIdentity,
  viewerIdentity,
}: InfoCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  if (!isHost) return null;

  return (
    <div className="px-4">
      <div className="rounded-xl bg-background">
        {/* Header */}
        <div className="flex items-center gap-x-2.5 p-4">
          <div className="rounded-md bg-blue-600 p-2 h-auto w-auto">
            <Pencil className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm lg:text-lg font-semibold capitalize">
              Edit your stream info
            </h2>
            <p className="text-muted-foreground text-xs lg:text-sm">
              Maximize your audience&apos;s engagement
            </p>
          </div>
          <InfoModal initialName={name} initialThumbnailUrl={thumbnailUrl} />
        </div>

        <Separator />

        {/* Stream info */}
        <div className="p-4 lg:p-6 space-y-4">
          {/* Stream name */}
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">Name</h3>
            <p className="text-sm font-semibold break-all">{name}</p>
          </div>

          {/* Thumbnail preview */}
          <div>
            <h3 className="text-sm text-muted-foreground mb-2">Thumbnail</h3>
            {thumbnailUrl ? (
              <div className="relative aspect-video rounded-md overflow-hidden w-[200px] border border-white/10">
                <Image
                  fill
                  src={thumbnailUrl}
                  alt={`${name} thumbnail`}
                  className="object-cover"
                />
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No thumbnail uploaded</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
