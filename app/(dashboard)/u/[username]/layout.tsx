import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

interface CreaterLayoutProps {
    params : {username : string};
    children: React.ReactNode;
}


const CreaterLayout = async ({
    params,
    children,
} : CreaterLayoutProps) => {
    const self = getSelfByUsername(params.username);

    if (!self){
        redirect("/");
    }

    return (
    <>
    <Navbar />
    <div className="flex h-full pt-20">
        <Sidebar />
        {children}
    </div>
    </>
    );
}

export default CreaterLayout