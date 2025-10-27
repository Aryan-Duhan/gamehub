import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/action";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";

interface UserPageProps {
    params : Promise<{
        username : string ;
    }>;
};

const userPage = async ({
    params
}: UserPageProps) => {
    const { username } = await params;
    console.log("Looking for user with username:", username);
    
    const user = await getUserByUsername(username);
    console.log("Found user:", user);

    if (!user) {
        console.log("User not found, redirecting to 404");
        notFound();
    }

    if (!user.stream) {
        console.log("User has no stream, redirecting to 404");
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id);

    if (isBlocked){
        console.log("User is blocked, redirecting to 404");
        notFound();
    }

    console.log("User data:", user);
    console.log("Stream data:", user.stream);
    console.log("Is following:", isFollowing);

    return (
        <StreamPlayer
            user={user}
            stream={user.stream}
            isFollowing={isFollowing}
         />
            
        
    );
};

export default userPage;    