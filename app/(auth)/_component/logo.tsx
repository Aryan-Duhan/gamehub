import Image from "next/image";
import { Poppins } from "next/font/google";

import {cn} from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["100" ,"200","300","400","500","600","700","800"],
});

export const Logo = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center mb-3">
            <div className="bg-white rounded-full p-4 ">
                <Image 
                    src="/spooky.svg"
                    alt="GameHub"
                    height={80}
                    width={80}
                />
            </div>
            <div className="flex flex-col items-center">
                <p className={cn(
                    "text-xl font-semibold", 
                    font.className
                    )}>
                    GameHub
                </p>
                <p className={cn(
                    "text-sm text-muted-foreground ",
                    font.className
                    )}
                    >
                    Let&apos;s Play
                </p>
            </div>
        </div>
    );
};