"use client";

import { useState , useTransition , useRef , ElementRef } from "react";
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; 
import { Input } from "@/components/ui/input";
import { updateStream } from "@/actions/stream";
import { toast } from "sonner";

interface InfoModalProps {
    initialName: string;
};

export const InfoModal = ({
    initialName,
} : InfoModalProps) => {

    const router = useRouter();
    const closeRef = useRef<ElementRef<"button">>(null);
    const [isPending, startTransition] = useTransition();
    const [name, setName] = useState(initialName);

    const onSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        startTransition(() => {
            updateStream({
                name: name
            })
                .then(() => {
                    toast.success("Stream info updated");
                    closeRef?.current?.click();
                })
                .catch(() => toast.error("Something went wrong"))
        });
    };

    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };


    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" size="sm" className="ml-auto">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>
                        Edit stream info
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label>
                            Name
                        </Label>
                        <Input
                            disabled={isPending}
                            placeholder="Stream name"
                            onChange={onChange}
                            value={name}
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <DialogClose ref={closeRef} asChild>
                            <Button type="button" variant="outline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={isPending} variant="default" type="submit">
                            {isPending ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};