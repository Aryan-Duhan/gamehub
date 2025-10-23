"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { onFollow , onUnFollow } from "@/actions/follow";
import { useTransition } from "react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface ActionsProps {
    hostIdentity : string;
    isHost : boolean;
    isFollowing : boolean;
};

export const Actions = ({
    hostIdentity,
    isHost,
    isFollowing
} : ActionsProps) => {
    const [isPending , startTransition] = useTransition();
    const { userId } = useAuth();
    const router = useRouter();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(hostIdentity)
            .then((data) => toast.success(`You are now following ${data.following.username}`))
            .catch(() => toast.error("something went wrong"))
        });
    };

    const handleUnfollow = () => {
        startTransition(() => {
            onUnFollow(hostIdentity)
            .then((data: { following: { username: any; }; }) => toast.success(`You have unfollowed ${data.following.username}`))
            .catch(() => toast.error("something went wrong"))
        });
    };

    const toggleFollow = () => {
        if (!userId){
            return router.push("/sign-in");
        }

        if (isHost) return;

        if (isFollowing){
            handleUnfollow();
        }else{
            handleFollow();
        }
    }

    return(
        <Button
            disabled={isPending || isHost} 
            onClick = {toggleFollow}
            variant= "primary"
            size= "sm"
            className="w-full lg:w-auto"
        >
            <Heart className={cn(
                "h-4 w-4 mr-2",
                isFollowing 
                    ? "fill-white"
                    : "fill-none"
            )} />
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    )
};

export const ActionsSkeleton = () => {
    return (
        <Skeleton className="h-10 w-full lg:w-24" />
    );
}