"use client"
import Image from "next/image";
import Link from "next/link";
import {
    Menubar,
    MenubarSubContent,
    MenubarContent,
    MenubarMenu,
    MenubarTrigger,
    MenubarSub,
    MenubarSubTrigger,
    MenubarSeparator,
    MenubarItem,
    MenubarShortcut,
} from "@/components/ui/menubar";
import { DocumentInput } from "./document-input";
import {
    BoldIcon,
    File,
    FileJsonIcon,
    FilePenIcon,
    FilePlusIcon,
    FileTextIcon,
    GlobeIcon,
    ItalicIcon,
    PrinterIcon,
    Redo2Icon,
    RemoveFormattingIcon,
    StrikethroughIcon,
    TextIcon,
    TrashIcon,
    UnderlineIcon,
    Undo2Icon
} from "lucide-react";
import { BsFilePdf } from "react-icons/bs";
import { useEditorStore } from "@/store/use-editor-store";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Avatars } from "./Avatars";
import { Inbox } from "./inbox";
import { Doc } from "../../../../convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { RenameDialog } from "@/components/rename-dailog";
import { RemoveDialog } from "@/components/remove-dailog";

interface NavBarProps {
    data: Doc<"documents">;
}

export const NavBar = ({ data }: NavBarProps) => {

    const { editor } = useEditorStore()
    const router = useRouter();
    const mutation = useMutation(api.documents.create)

    if(!data){
        router.replace("/")
    }

    const onNewDocument = () => {
        mutation({
            title: "Untitled Document",
            initialContent: "<p>Start typing here...</p>"
        })
            .catch(() => toast.error("Something went wrong"))
            .then((id) => {
                router.push(`/documents/${id}`);
                toast.success("Document Created");
            })
    }

    const insertTable = ({ rows, cols }: { rows: number; cols: number }) => {
        editor
            ?.chain()
            .focus()
            .insertTable({ rows, cols, withHeaderRow: false })
            .run();
    };

    const onDownload = (blob: Blob, filename: string) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
    };
    const onSaveJSON = () => {
        if (!editor) return;

        const content = editor.getJSON();
        const blob = new Blob([JSON.stringify(content)], { type: "application/json" });
        onDownload(blob, `${data.title}.json`);
    }
    const onSaveHTML = () => {
        if (!editor) return;

        const content = editor.getHTML();
        const blob = new Blob([content], { type: "text/html" });
        onDownload(blob, `${data.title}.html`);
    }
    const onSaveTEXT = () => {
        if (!editor) return;

        const content = editor.getText();
        const blob = new Blob([content], { type: "text/plain" });
        onDownload(blob, `${data.title}.txt`);
    }

    return (
        <nav className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Link href={`/`}>
                    <Image src="/logo.svg" alt="logo" width={36} height={36} />
                </Link>
                <div className="flex flex-col">
                    <DocumentInput title={data.title} id={data._id} />
                    <div className="flex ">
                        <Menubar className="border-none bg-transparent shadow-none h-auto p-0">
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    File
                                </MenubarTrigger>
                                <MenubarContent className="print:hidden ">
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            <File size={16} className="mr-2 size-4" />
                                            Save
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem onClick={onSaveJSON}>
                                                <FileJsonIcon size={16} className="mr-2 size-4" />
                                                JSON
                                            </MenubarItem>
                                            <MenubarItem onClick={() => window.print()}>
                                                <BsFilePdf size={16} className="mr-2 size-4" />
                                                PDF
                                            </MenubarItem>
                                            <MenubarItem onClick={onSaveHTML}>
                                                <GlobeIcon size={16} className="mr-2 size-4" />
                                                HTML
                                            </MenubarItem>
                                            <MenubarItem onClick={onSaveTEXT}>
                                                <FileTextIcon size={16} className="mr-2 size-4" />
                                                TEXT
                                            </MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                    <MenubarItem onClick={onNewDocument}>
                                        <FilePlusIcon size={16} className="mr-2 size-4" />
                                        New Document
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <RenameDialog documentId={data._id} initialTitle={data.title}>
                                        <MenubarItem 
                                            onClick={(e) => e.stopPropagation()}
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <FilePenIcon size={16} className="mr-2 size-4" />
                                            Rename
                                        </MenubarItem>
                                    </RenameDialog>
                                    <RemoveDialog documentId={data._id}>
                                        <MenubarItem
                                            onClick={(e) => e.stopPropagation()}
                                            onSelect={(e) => e.preventDefault()}
                                        >
                                            <TrashIcon size={16} className="mr-2 size-4" />
                                            Remove
                                        </MenubarItem>
                                    </RemoveDialog>
                                    <MenubarSeparator />
                                    <MenubarItem onClick={() => window.print()}>
                                        <PrinterIcon size={16} className="mr-2 size-4" />
                                        Print<MenubarShortcut>Ctrl+P</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    Edit
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem onClick={() => editor?.chain().focus().undo().run()}>
                                        <Undo2Icon size={16} className="mr-2 size-4" />
                                        Undo<MenubarShortcut>Ctrl+Z</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem onClick={() => editor?.chain().focus().redo().run()}>
                                        <Redo2Icon size={16} className="mr-2 size-4" />
                                        Redo<MenubarShortcut>Ctrl+Y</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    Insert
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            Table
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem onClick={() => insertTable({ rows: 1, cols: 1 })}>
                                                1x1
                                            </MenubarItem>
                                            <MenubarItem onClick={() => insertTable({ rows: 2, cols: 2 })}>
                                                2x2
                                            </MenubarItem>
                                            <MenubarItem onClick={() => insertTable({ rows: 3, cols: 3 })}>
                                                3x3
                                            </MenubarItem>
                                            <MenubarItem onClick={() => insertTable({ rows: 4, cols: 4 })}>
                                                4x4
                                            </MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                                    Format
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            <TextIcon size={16} className="mr-2 size-4" />
                                            Text
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleBold().run()}>
                                                <BoldIcon size={16} className="mr-2 size-4" />
                                                Bold<MenubarShortcut>Ctrl+B</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleItalic().run()}>
                                                <ItalicIcon size={16} className="mr-2 size-4" />
                                                Italic<MenubarShortcut>Ctrl+I</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleUnderline().run()}>
                                                <UnderlineIcon size={16} className="mr-2 size-4" />
                                                Underline<MenubarShortcut>Ctrl+U</MenubarShortcut>
                                            </MenubarItem>
                                            <MenubarItem onClick={() => editor?.chain().focus().toggleStrike().run()}>
                                                <StrikethroughIcon size={16} className="mr-2 size-4" />
                                                Strikethrough&nbsp;&nbsp;<MenubarShortcut>Ctrl+K</MenubarShortcut>
                                            </MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                    <MenubarItem onClick={() => editor?.chain().focus().unsetAllMarks().run()}>
                                        <RemoveFormattingIcon size={16} className="mr-2 size-4" />
                                        Remove Formatting
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </div>
                </div>
            </div>
            <div className="flex gap-3 items-center pl-6">
                <Avatars />
                <Inbox />
                <OrganizationSwitcher
                    afterCreateOrganizationUrl="/"
                    afterLeaveOrganizationUrl="/"
                    afterSelectOrganizationUrl="/"
                    afterSelectPersonalUrl="/"
                />
                <UserButton />
            </div>
        </nav>
    )
}