import { useRouter } from "next/router";

import { useCallback, useMemo, useRef, useState } from "react";

import { useTeam } from "@/context/team-context";
import { usePlausible } from "next-plausible";
import { toast } from "sonner";
import { mutate } from "swr";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { APP_SETTINGS } from "@/lib/constants";
import { set } from "zod";

export function RequestAccessModal({ children }: { children: React.ReactNode }) {
    const plausible = usePlausible();
    const [email, setEmail] = useState<string>("");
    const [buttonText, setButtonText] = useState<string>("Request Access");
    const [loading, setLoading] = useState<boolean>(false);

    const handleRequestAccess = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        event.stopPropagation();

        if (!email) return;

        // TODO: add email validation

        setLoading(true);

        const response = await fetch("/api/request-access", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });

        if (response.status !== 200 && response.status !== 204) {
            const error = await response.json();
            const errorMessage = error?.message || error || "Error requesting access - try again?";
            toast.error(errorMessage);
            setLoading(false);
            return;
        }

        setLoading(false);
        setButtonText("Received! We'll let you know when you have access.");
        toast.success("Early access requested!");
    };

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent
                className="bg-background text-foreground"
                onClick={(e) => e.stopPropagation()}
            >
                <DialogHeader>
                    <DialogTitle>Request Access to Private Beta</DialogTitle>
                    <DialogDescription className="mb-1 py-2 text-sm text-muted-foreground">
                        Enter your email to request early access. We&apos;ll notify you when you can start.
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={handleRequestAccess}
                    className="mt-4 flex flex-col gap-8"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex flex-col gap-3">
                        <div>
                            <Label htmlFor="email">
                                Enter your email to request early access
                            </Label>
                        </div>
                        <div>
                            <Input
                                id="email"
                                placeholder="email@something.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex justify-center">
                        <Button
                            type="submit"
                            // variant={"destructive"}
                            disabled={loading}
                            className="w-full"
                            loading={loading}
                        // disabled={uploading || !currentFile}
                        >
                            {loading ? "Requesting..." : buttonText}
                            {/* {uploading ? "Uploading..." : "Upload Document"} */}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}