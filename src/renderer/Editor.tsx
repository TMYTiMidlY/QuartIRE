import { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import * as monaco from 'monaco-editor';

export default function EditorBox({
  setCode,
  width,
}: {
  setCode: (code: string) => void;
  width: number;
}) {
  const editorRef = useRef(null);
  useEffect(() => {
    if (editorRef.current) {
      const editor = monaco.editor.create(editorRef.current, {
        value: '\\documentclass{article}\n\\begin{document}\n\tHello, world!\\[\\int_{0}^{\\pi}\\sin x\\]\n\\end{document}',
        // language: 'markdown',
        automaticLayout: true,
        theme: 'vs-dark',
        // fontSize: 16,
        // lineHeight: 24,
        // minimap: {
        //   enabled: false,
        // },
        // scrollbar: {
        //   vertical: 'visible',
        // },
        // scrollBeyondLastLine: false,
      });

      editor.onDidChangeModelContent(() => {
        setCode(editor.getValue());
      });

      return () => {
        editor.dispose();
      };
    }
  }, []);

  return <Box ref={editorRef} width={width} />;
}
