"use client";

import { Button } from "@/components/ui/button";
import { 
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogDescription
 } from "@/components/ui/dialog";

import { 
    Alert,
    AlertDescription,
    AlertTitle
 } from "@/components/ui/alert";

import {
    Select,
    SelectContent,
    SelectValue,
    SelectItem,
    SelectTrigger,
} from "@/components/ui/select";

import { IngressInput } from "livekit-server-sdk";
import { AlertTriangle } from "lucide-react";
import { useState, useTransition, useRef, ElementRef } from "react";
import { createIngress } from "@/actions/ingress";
import { toast } from "sonner";

const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP;

export const ConnectModal = () => {
    const closeRef = useRef<ElementRef<"button">>(null);
    const [isPending, startTransition] = useTransition();
    const [ingressType, setIngressType] = useState<IngressType>(RTMP);

    const onSubmit = () => {
        startTransition(() => {
            createIngress(parseInt(ingressType))
                .then(() => {
                    toast.success("Ingress created");
                    closeRef?.current?.click();
                })
                .catch(() => toast.error("Something went wrong"));
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="primary">
                    Generate Connection
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate Connection</DialogTitle>
                    <DialogDescription>
                        Select an ingress type to generate a new stream connection. This will reset your current connection.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <Select
                        disabled={isPending}
                        value={ingressType}
                        onValueChange={(value) => setIngressType(value as IngressType)}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Ingress Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={RTMP}>RTMP</SelectItem>
                            <SelectItem value={WHIP}>WHIP</SelectItem>
                        </SelectContent>
                    </Select>
                    <Alert>
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Warning!</AlertTitle>
                        <AlertDescription>
                            This action will reset all active streams using the current connection
                        </AlertDescription>
                    </Alert>
                </div>
                <div className="flex justify-between mt-4">
                    <DialogClose ref={closeRef} asChild>
                        <Button variant="ghost">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button
                        disabled={isPending}
                        onClick={onSubmit}
                        variant="primary"
                    >
                        Generate
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};