import { useRef, useEffect, useState } from 'react';
import * as monaco from 'monaco-editor';
import MarkdownIt from 'markdown-it';
import { Box, Paper, Stack, styled, Divider } from '@mui/material';
import DragHandlerIcon from '@mui/icons-material/DragHandle';
import { MouseEventHandler } from 'react';
import { blue } from '@mui/material/colors';

// 节流和防抖, 避免 ResizeObserver loop limit exceeded
// class CalmResizeObserver extends ResizeObserver {
//   constructor(callback: ResizeObserverCallback) {
//     super((entries, observer) => {
//       requestAnimationFrame(() => {
//         callback(entries, observer);
//       });
//     });
//   }
// }
// window.ResizeObserver = CalmResizeObserver;

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function SideBar() {
  const [items, setItems] = useState([
    {
      id: 'item-1',
      content: 'Item 1',
      children: [
        {
          id: 'item-2',
          content: 'Item 2',
        },
        {
          id: 'item-3',
          content: 'Item 3',
          children: [
            {
              id: 'item-4',
              content: 'Item 4',
            },
          ],
        },
      ],
    },
  ]);

  const onDragEnd = (result) => {
    // TODO: handle drag and drop
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <NestedItem key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
}

function NestedItem({ item, index }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {item.content}
          {item.children && (
            <button onClick={toggleExpand}>
              {isExpanded ? '-' : '+'}
            </button>
          )}
          {item.children && isExpanded && (
            <Droppable droppableId={item.id}>
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {item.children.map((child, index) => (
                    <NestedItem key={child.id} item={child} index={index} />
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          )}
        </li>
      )}
    </Draggable>
  );
}


function EditorContainer({
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
        value: '# 1',
        language: 'markdown',
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

function PreviewContainer({ html }: { html: TrustedHTML }) {
  const previewRef = useRef(null);

  return <Box ref={previewRef} dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function ResizableGrid() {
  const [width, setWidth] = useState(0.5);
  const [code, setCode] = useState<string>('# 1');
  const mdParser = new MarkdownIt();

  const handleMouseDown: MouseEventHandler<HTMLHRElement> = (event) => {
    const initialX = event.clientX;
    const handleMouseMove = (event: MouseEvent) => {
      const diffX = event.clientX - initialX;
      setWidth(Math.min(Math.max(width + diffX / window.innerWidth, 0), 1));
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <Stack direction="row" height="100%">
      <SideBar />
      <EditorContainer setCode={setCode} width={width} />
      <Divider
        onMouseDown={handleMouseDown}
        sx={{
          cursor: 'ew-resize',
          borderWidth: '2px',
          ':hover': { borderColor: 'primary.main', borderWidth: '3px' },
        }}
      />
      <PreviewContainer html={mdParser.render(code)} />
    </Stack>
  );
}
