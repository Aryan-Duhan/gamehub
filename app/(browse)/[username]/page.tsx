import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { Actions } from "./_components/action";
import { isBlockedByUser } from "@/lib/block-service";

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

    if (!user){
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id);

    return (
        <div className="flex flex-col gap-y-4">
            <p>Username : {user.username}</p>
            <p>User ID: {user.id}</p>
            <p>is following : {`${isFollowing}`}</p>
            <p>is blocked by this user : {`${isBlocked}`}</p>
            <Actions userId={user.id} isFollowing={isFollowing} />
        </div>
    );
}

export default userPage;    