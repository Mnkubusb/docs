"use client"

import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { Id } from "../../convex/_generated/dataModel";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "./ui/alert-dialog";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface RemoveDailogProps {
    documentId: Id<"documents">
    children: React.ReactNode
}

export const RemoveDialog = ({ documentId, children }: RemoveDailogProps) => {

    const router = useRouter();
    const remove = useMutation(api.documents.removeById);
    const[ isRemoving , setIsRemoving ] = useState(false);

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you sure ?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction 
                        disabled={isRemoving}
                        onClick={(e) => {
                           e.stopPropagation()
                           setIsRemoving(true)
                           remove({ id: documentId })
                               .catch(() => toast.error("Somethin Went Wrong"))
                               .then(() => {
                                    toast.success("Document Removed")
                                    router.push("/")
                                })
                               .finally(() => setIsRemoving(false));
                        }}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}