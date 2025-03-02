"use client"
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import Document from '@tiptap/extension-document'
import Gapcursor from '@tiptap/extension-gapcursor'
import Text from '@tiptap/extension-text'
import Paragraph from '@tiptap/extension-paragraph'
import Dropcursor from '@tiptap/extension-dropcursor'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image'
import { useEditorStore } from '@/store/use-editor-store'
import Underline from '@tiptap/extension-underline'
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import HighLight from '@tiptap/extension-highlight'
import Link from "@tiptap/extension-link"
import TextAlign from '@tiptap/extension-text-align'
import { fontSizeExtension } from '@/extentions/font-size'
import { lineHeight } from '@/extentions/line-height'
import { Ruler } from './Ruler'
import { FloatingToolbar, useLiveblocksExtension } from "@liveblocks/react-tiptap";
import { useStorage } from '@liveblocks/react'
import { Threads } from './threads'

interface EditorProps {
   initailContent?: string | undefined
}


export const Editor = ( { initailContent }: EditorProps  ) => {

    const leftMargin = useStorage(( root ) => root.leftMargin);
    const rightMargin = useStorage(( root ) => root.rightMargin); 
    const liveblocks = useLiveblocksExtension({
        initialContent : initailContent,
        offlineSupport_experimental : true
    });
    const { setEditor } = useEditorStore();

    const editor = useEditor({
        immediatelyRender: false,
        onCreate: ({ editor }) => {
            setEditor(editor);
        },
        onDestroy() {
            setEditor(null);
        },
        onUpdate({ editor }) {
            setEditor(editor)
        },
        onSelectionUpdate({ editor }) {
            setEditor(editor)
        },
        onTransaction({ editor }) {
            setEditor(editor)
        },
        onFocus({ editor }) {
            setEditor(editor)
        },
        onBlur({ editor }) {
            setEditor(editor)
        },
        onContentError({ editor }) {
            setEditor(editor);
        },
        editorProps: {
            attributes: {
                style: `padding-left: ${leftMargin ?? 56}px; padding-right: ${rightMargin ?? 56}px;`,
                class: 'focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text',
            }
        },

        extensions: [
            liveblocks,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            fontSizeExtension,
            HighLight.configure({
                multicolor: true,
            }),
            lineHeight.configure({ types: ["paragraph", "heading"], defaultLineHeight: "normal" }),
            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: "https"
            }),
            Color,
            TextStyle,
            FontFamily,
            Underline,
            ImageResize,
            Image,
            Dropcursor,
            Document,
            Paragraph,
            Text,
            Gapcursor,
            StarterKit.configure({
                history: false,
            }),
            TaskList,
            Table.configure({
                resizable: true,
            }),
            TableRow,
            TableHeader,
            TableCell,
            TaskItem.configure({
                nested: true,
            }),],
    })
    return (
        <div className='size-full px-4 print:p-0 print:bg-white print:overflow-visible overflow-x-auto bg-[#F9FBFD]'>
            <Ruler />
            <div className='min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
                <EditorContent editor={editor}  />
                <Threads editor={editor}  />
                <FloatingToolbar editor={editor} />
            </div>
        </div>
    );
};