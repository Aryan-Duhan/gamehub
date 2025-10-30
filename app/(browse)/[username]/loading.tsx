import { StreamPlayerSkeleton } from "@/components/stream-player";

const userLoading = () => {
    return (
        <div className="h-full">
            <StreamPlayerSkeleton />
        </div>
    );
};


export default userLoading;