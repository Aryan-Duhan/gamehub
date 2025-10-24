"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogClose,
    DialogTrigger,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; 
import { Input } from "@/components/ui/input";

interface InfoModalProps {
    initialName: string;
    initialThumbnailUrl: string | null;
};

export const InfoModal = ({
    initialName,
    initialThumbnailUrl,
} : InfoModalProps) => {

    const [name, setName] = useState(initialName);

    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" size="sm" className="ml-auto">
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit stream info
                    </DialogTitle>
                </DialogHeader>
                <form className="space-y-14">
                    <div className="space-y-2">
                        <Label>
                            Name
                        </Label>
                        <Input
                            placeholder="Stream name"
                            onChange={() => {}}
                            value={name}
                            disabled={false}
                        />
                    </div>
                    <div className="flex justify-between">
                        <DialogClose asChild>
                            <Button type="button" variant="ghost">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button disabled={false} variant="primary" type="submit">
                            Save
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};