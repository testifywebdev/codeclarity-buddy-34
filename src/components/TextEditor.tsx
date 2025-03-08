
import React, { useEffect, useRef, useState } from 'react';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Checklist from '@editorjs/checklist';
import InlineCode from '@editorjs/inline-code';
import Marker from '@editorjs/marker';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import SimpleImage from '@editorjs/simple-image';
import Embed from '@editorjs/embed';
import Underline from '@editorjs/underline';
import { Loader2 } from 'lucide-react';

// Providing proper typing for third-party tools
interface EditorJSTools {
  [key: string]: any;
}

interface TextEditorProps {
  onChange?: (data: any) => void;
  initialData?: any;
  readOnly?: boolean;
}

const TextEditor: React.FC<TextEditorProps> = ({ 
  onChange, 
  initialData = {},
  readOnly = false 
}) => {
  const editorRef = useRef<EditorJS | null>(null);
  const holderRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize Editor.js when the component mounts
    if (holderRef.current && !editorRef.current) {
      // Define tools with proper typing
      const tools: EditorJSTools = {
        header: {
          class: Header,
          inlineToolbar: true,
          config: {
            placeholder: 'Enter a header',
            levels: [1, 2, 3, 4, 5, 6],
            defaultLevel: 2
          }
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        checklist: {
          class: Checklist,
          inlineToolbar: true,
        },
        inlineCode: {
          class: InlineCode,
        },
        marker: {
          class: Marker,
        },
        paragraph: {
          class: Paragraph,
          inlineToolbar: true,
        },
        quote: {
          class: Quote,
          inlineToolbar: true,
        },
        image: {
          class: SimpleImage,
        },
        embed: {
          class: Embed,
        },
        underline: {
          class: Underline,
        },
      };
      
      // Create the editor with the tools
      const editor = new EditorJS({
        holder: holderRef.current,
        tools,
        data: initialData,
        readOnly,
        onChange: async () => {
          if (onChange) {
            const savedData = await editorRef.current?.save();
            onChange(savedData);
          }
        },
        onReady: () => {
          setIsLoading(false);
        },
      });

      editorRef.current = editor;

      return () => {
        if (editorRef.current) {
          editorRef.current.destroy();
          editorRef.current = null;
        }
      };
    }
  }, [initialData, onChange, readOnly]);

  return (
    <div className="w-full h-full bg-background rounded-md overflow-auto">
      {isLoading && (
        <div className="flex items-center justify-center h-full w-full">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      )}
      <div 
        ref={holderRef} 
        className="prose prose-sm max-w-none p-4"
      />
    </div>
  );
};

export default TextEditor;
