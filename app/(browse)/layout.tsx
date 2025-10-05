import { Layout } from "lucide-react";
import { Navbar } from "./_components/navbar";
import { Sidebar, SideBarSkeleton } from "./_components/sidebar";
import { Container } from "./_components/sidebar/container";
import { Suspense } from "react";

const BrowseLayout = ({ 
    children , 
}: { 
    children: React.ReactNode ;
}) => {
  return (
    <>
        <Navbar />
        <div className="h-full pt-20">
            <Suspense fallback={<SideBarSkeleton />}>
              <Sidebar />
            </Suspense>
            <Container>
              {children}
            </Container>
        </div>
    </>
  );
}

export default BrowseLayout;