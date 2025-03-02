import { format } from "date-fns";
import { TableCell , TableRow } from "@/components/ui/table";
import { Doc } from "../../../convex/_generated/dataModel";
import { SiGoogledocs } from "react-icons/si";
import { Building2, CircleUserIcon, icons, MoreVertical } from "lucide-react";
import { DocumentMenu } from "./document-menu";
import { useRouter } from "next/navigation";


interface DocumentRowProps {
    document: Doc<"documents">;
}

export const DocumentRow = ( { document }: DocumentRowProps ) => {

    const router = useRouter();
    const onNewTabClick = ( id: string ) => {
        window.open(`/document/${id}`, "_blank");
    }


    return (
        <TableRow
            onClick={() => router.push(`/documents/${document._id}`)}
            className="cursor-pointer"
        >
            <TableCell className="w-[50px]">
                <SiGoogledocs className="size-6 fill-blue-500" />
            </TableCell>
            <TableCell className="font-medium md:w-[45%]">
                {document.title}
            </TableCell>
            <TableCell className="text-muted-foreground hidden md:flex items-center gap-2">
                {document.organisationId ? <Building2 className="size-4" /> : <CircleUserIcon className="size-4" />}
                {document.organisationId ? "Organisation" : "Personal"}
            </TableCell>
            <TableCell className="text-muted-foreground hidden md:table-cell">
                {format(new Date(document._creationTime), "MMM dd, yyyy")}
            </TableCell>
            <TableCell className="flex justify-end">
                <DocumentMenu 
                    documentId={document._id}
                    title={document.title}
                    onNewTab={onNewTabClick}    
                />
            </TableCell>
        </TableRow>
    )
}