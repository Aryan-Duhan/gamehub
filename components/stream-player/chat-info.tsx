import { useMemo } from "react";
import { Info } from "lucide-react";
import { Hint } from "@/components/hint";

interface ChatInfoProps {
    isDelayed : boolean;
    isFollowersOnly : boolean;

};

export const ChatInfo = ({
    isDelayed,
    isFollowersOnly,
} : ChatInfoProps) => {

    const hint = useMemo(() => {
        if(isFollowersOnly && !isDelayed){
            return "Only followers can chat";
        }

        if (isDelayed && !isFollowersOnly){
            return "Chat delayed for 3 seconds";
        }

        if (isDelayed && isFollowersOnly){
            return "Chat delayed for 3 seconds and only followers can chat";
        }

        return "" ;
    }, [isDelayed , isFollowersOnly]);


    const label = useMemo(() => {
        if(isFollowersOnly && !isDelayed){
            return "followers only";
        }

        if (isDelayed && !isFollowersOnly){
            return "Slow mode";
        }

        if (isDelayed && isFollowersOnly){
            return "Slow mode and followers only";
        }

        return "" ;
    }, [isDelayed , isFollowersOnly]);

    if (!isDelayed && !isFollowersOnly){
        return null;
    }

    return (
        <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 flex items-center gap-x-2 w-full rounded-t-md">
            <Hint label={hint}>
                <Info className="h-4 w-4" />
            </Hint>
            <p className="text-xs font-semibold">
                {label}
            </p>
        </div>
    );
};