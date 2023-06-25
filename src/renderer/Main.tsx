import { Stack, Divider } from '@mui/material';
import { useState, MouseEventHandler } from 'react';

import EditorBox from './Editor';
import PreviewBox from './Preview';

// Avoid ResizeObserver loop limit exceeded
class CalmResizeObserver extends ResizeObserver {
  constructor(callback: ResizeObserverCallback) {
    super((entries, observer) => {
      requestAnimationFrame(() => {
        callback(entries, observer);
      });
    });
  }
}
window.ResizeObserver = CalmResizeObserver;

export default function MainStack() {
  const [width, setWidth] = useState(0.5);
  const [code, setCode] = useState<string>('\\documentclass{article}\n\\begin{document}\n\tHello, world!\\[\\int_{0}^{\\pi}\\sin x\\]\n\\end{document}');

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
      <EditorBox setCode={setCode} width={width} />
      <Divider
        onMouseDown={handleMouseDown}
        sx={{
          cursor: 'ew-resize',
          borderWidth: '2px',
          ':hover': { borderColor: 'primary.main', borderWidth: '3px' },
        }}
      />
      <PreviewBox code={code} />
    </Stack>
  );
}
