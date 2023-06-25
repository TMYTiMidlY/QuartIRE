import { useRef } from 'react';
import { Box } from '@mui/material';

// import {
//   parse,
//   HtmlGenerator,
// } from '../../node_modules/latex.js/dist/latex.js';
import { parse, HtmlGenerator } from 'latex.js';
import '../../node_modules/latex.js/dist/css/katex.css';
import '../../node_modules/latex.js/dist/css/article.css';

export default function PreviewBox({code}) {
  const previewRef = useRef(null);
  const htmlGenerator = new HtmlGenerator({ hyphenate: false });
  const doc = parse(code, { generator: htmlGenerator }).htmlDocument();
  const html = doc.documentElement.outerHTML;

  return (
    <Box
      ref={previewRef}
      // width={0.5}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
