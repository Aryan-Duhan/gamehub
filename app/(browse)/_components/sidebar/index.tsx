import { getRecommendedUsers } from "@/lib/recommended-user";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { Toggle } from "./toggle";
import { Wrapper } from "./wrapper";
import { getFollowedUser } from "@/lib/follow-service";
import { Following, FollowingSkeleton } from "./following";

export const Sidebar = async () => {
    const recommended = await getRecommendedUsers();
    const following = await getFollowedUser();
    return (
        <Wrapper>
            <Toggle />
            <div className="space-y-4 pt-4 lg:pt-0">
                <Following data = {following} />
                <Recommended data = {recommended} />     
            </div>
        </Wrapper>
    );
};

export const SideBarSkeleton= () => {
    return (
        <aside className="fixed l-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] Z-50">
            <FollowingSkeleton />
            <RecommendedSkeleton />

        </aside>
    );
};