import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/action";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player/index";

interface UserPageProps {
    params : Promise<{
        username : string ;
    }>;
};

const userPage = async ({
    params
}: UserPageProps) => {
    const { username } = await params;
    const user = await getUserByUsername(username);
    
    if (!user) {
        notFound();
    }

    if (!user.stream) {
       
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id);

    if (isBlocked){
        notFound();
    }

    return (
        <div>
            <StreamPlayer
                user={user}
                stream={user.stream}
                isFollowing={isFollowing}
         /> 
        </div>
        
          
    );
};

export default userPage;    