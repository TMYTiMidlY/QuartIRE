// import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

// function Hello() {
//   return (
//     <div>
//       <div className="Hello">
//         <img width="200" alt="icon" src={icon} />
//       </div>
//       <h1>electron-react-boilerplate</h1>
//       <div className="Hello">
//         <a
//           href="https://electron-react-boilerplate.js.org/"
//           target="_blank"
//           rel="noreferrer"
//         >
//           <button type="button">
//             <span role="img" aria-label="books">
//               📚
//             </span>
//             Read our docs
//           </button>
//         </a>
//         <a
//           href="https://github.com/sponsors/electron-react-boilerplate"
//           target="_blank"
//           rel="noreferrer"
//         >
//           <button type="button">
//             <span role="img" aria-label="folded hands">
//               🙏
//             </span>
//             Donate
//           </button>
//         </a>
//       </div>
//     </div>
//   );
// }

// const App = () => (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Hello />} />
//       </Routes>
//     </Router>
// );

// export default App;

// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Hello />} />
//       </Routes>
//     </Router>
//   );
// }

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material';
import { useState, useEffect, useRef } from 'react';

export default function FormDialog() {
  const [open, setOpen] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} keepMounted>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            inputRef={inputRef}
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
      {/* <Table /> */}
      {/* <Sample /> */}
    </div>
  );
}


// import { HyperFormula } from 'hyperformula';
// import { HotTable } from '@handsontable/react';
// import { registerAllModules } from 'handsontable/registry';
// import 'handsontable/dist/handsontable.full.min.css';

// // register Handsontable's modules
// registerAllModules();

// export const Table = () => {
//   const data1 = [
//     ['10.26', null, 'Sum', '=SUM(A:A)'],
//     ['20.12', null, 'Average', '=AVERAGE(A:A)'],
//     ['30.01', null, 'Median', '=MEDIAN(A:A)'],
//     ['40.29', null, 'MAX', '=MAX(A:A)'],
//     ['50.18', null, 'MIN', '=MIN(A1:A5)'],
//   ];
//   const data2 = [
//     ['Is A1 in Sheet1 > 10?', '=IF(Sheet1!A1>10,"TRUE","FALSE")'],
//     ['Is A:A in Sheet > 150?', '=IF(SUM(Sheet1!A:A)>150,"TRUE","FALSE")'],
//     ['How many blank cells are in the Sheet1?', '=COUNTBLANK(Sheet1!A1:D5)'],
//     ['Generate a random number', '=RAND()'],
//     ['Number of sheets in this workbook', '=SHEETS()'],
//   ];
//   //  create an external HyperFormula instance
//   const hyperformulaInstance = HyperFormula.buildEmpty({
//     // to use an external HyperFormula instance,
//     // initialize it with the `'internal-use-in-handsontable'` license key
//     licenseKey: 'internal-use-in-handsontable',
//   });

//   return (
//     <>
//       <h3 className="demo-preview">Sheet 1</h3>
//       <HotTable
//         data={data1}
//         colHeaders={true}
//         rowHeaders={true}
//         height="auto"
//         formulas={{
//           engine: hyperformulaInstance,
//           sheetName: 'Sheet1'
//         }}
//         licenseKey="non-commercial-and-evaluation"
//       />
//       <h3 className="demo-preview">Sheet 2</h3>
//       <HotTable
//         data={data2}
//         colHeaders={true}
//         rowHeaders={true}
//         height="auto"
//         formulas={{
//           engine: hyperformulaInstance,
//           sheetName: 'Sheet2'
//         }}
//         licenseKey="non-commercial-and-evaluation"
//       />
//     </>
//   );
// };










// import * as pdfjsLib from 'pdfjs-dist/webpack';
// import * as pdfjsViewer from 'pdfjs-dist/web/pdf_viewer';
// import 'pdfjs-dist/web/pdf_viewer.css';
// import { basicSetup } from 'codemirror';


// // The workerSrc property shall be specified.
// // However, the 'pdfjs-dist/webpack' handle this.
// //
// // pdfjsLib.GlobalWorkerOptions.workerSrc =
// //   "../../node_modules/pdfjs-dist/build/pdf.worker.js";

// // Some PDFs need external cmaps.
// //
// const CMAP_URL = cmap_url;
// const CMAP_PACKED = true;

// const DEFAULT_URL = pdf_url;
// // To test the AcroForm and/or scripting functionality, try e.g. this file:
// // "../../test/pdfs/160F-2019.pdf"

// const ENABLE_XFA = true;
// const SEARCH_FOR = ""; // try "Mozilla";

// const SANDBOX_BUNDLE_SRC = sandbox_src_url;

// const eventBus = new pdfjsViewer.EventBus();

// // (Optionally) enable hyperlinks within PDF files.
// const pdfLinkService = new pdfjsViewer.PDFLinkService({
//   eventBus,
// });

// // (Optionally) enable find controller.
// const pdfFindController = new pdfjsViewer.PDFFindController({
//   eventBus,
//   linkService: pdfLinkService,
// });

// // (Optionally) enable scripting support.
// const pdfScriptingManager = new pdfjsViewer.PDFScriptingManager({
//   eventBus,
//   sandboxBundleSrc: SANDBOX_BUNDLE_SRC,
// });

// const pdfViewer = new pdfjsViewer.PDFViewer({
//   container: pdfContainer,
//   eventBus,
//   linkService: pdfLinkService,
//   findController: pdfFindController,
//   scriptingManager: pdfScriptingManager,
//   removePageBorders: true,
// });
// pdfLinkService.setViewer(pdfViewer);
// pdfScriptingManager.setViewer(pdfViewer);

// eventBus.on("pagesinit", function () {
//   // We can use pdfViewer now, e.g. let's change default scale.
//   // pdfViewer.currentScaleValue = "page-width";
//   pdfViewer.currentScaleValue = 0.8;

//   // We can try searching for things.
//   if (SEARCH_FOR) {
//     eventBus.dispatch("find", { type: "", query: SEARCH_FOR });
//   }
// });

// // Loading document.
// const loadingTask = pdfjsLib.getDocument({
//   url: DEFAULT_URL,
//   cMapUrl: CMAP_URL,
//   cMapPacked: CMAP_PACKED,
//   enableXfa: ENABLE_XFA,
// });
// loadingTask.promise.then((pdfDocument) => {
//   pdfViewer.setDocument(pdfDocument);

//   pdfLinkService.setDocument(pdfDocument, null);

//   pdfDocument.getPage(1).then((page) => {
//     // var viewport = page.getViewport({ scale: 1.0, });
//     // console.log(viewport.width, viewport.height)
//     // console.log(page.view[2] - page.view[0]);

//   });
// });

