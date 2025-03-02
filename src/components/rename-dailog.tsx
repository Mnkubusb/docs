"use client"

import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { Id } from "../../convex/_generated/dataModel";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface RenameDailogProps {
    documentId: Id<"documents">
    children: React.ReactNode
    initialTitle: string
}

export const RenameDialog = ({ documentId, children, initialTitle }: RenameDailogProps) => {

    const update = useMutation(api.documents.updateById);
    const [isUpdating, setIsUpdating] = useState(false);

    const [title, setTitle] = useState(initialTitle);
    const [open, setOpen] = useState(false);

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsUpdating(true);

        update({ id: documentId, title: title.trim() || "Untitled Document" })
            .catch(() => toast.error("Somethin Went Wrong"))
            .then(() => toast.success("Document Renamed"))
            .finally(() => {
                setIsUpdating(false);
                setOpen(false);
            });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent onClick={(e) => e.stopPropagation()}>
                <form onSubmit={onSubmit}>
                    <DialogHeader>
                        <DialogTitle>Rename Document</DialogTitle>
                        <DialogDescription>Enter a new name for this document </DialogDescription>
                    </DialogHeader>
                    <div className="my-4">
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Document Name"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                    <DialogFooter>
                        <Button
                            variant={"ghost"}
                            type="button"
                            disabled={isUpdating}
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isUpdating}
                            onClick={(e) => e.stopPropagation()}
                        >
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}