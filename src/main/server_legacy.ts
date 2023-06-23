import express from 'express';
import WebSocket, { WebSocketServer } from 'ws';
import portfinder from 'portfinder';

portfinder.basePort = 9463;

// export const startExpressServer = async () => {
//   try {
//     const app = express();
//     const port = await portfinder.getPortPromise();
//     app.get('/api/hello', (req, res) => {
//       res.json({ message: 'Hello from Express.js API!' });
//     });

//     const server = app.listen(port, () => {
//       console.log(`Server listening on port ${port}`);
//     });
//     return { server, port };
//   } catch (err) {
//     console.error(`Error starting server: ${err}`);
//   }
// };

// // const stopServer = async (server, port) => {
// //   try {
// //     if (server) {
// //       return new Promise((resolve) => {
// //         server.server.close(() => {
// //           console.log(`Server stopped on port ${server.port}`);
// //           resolve();
// //         });
// //       });
// //     }
// //   } catch (err) {
// //     console.error(`Error stopping server: ${err}`);
// //   }
// // };

export const startWebSocketServer = async () => {
  try {
    const port = await portfinder.getPortPromise();
    const wss = new WebSocketServer({ port });
    console.log(`Server started on port ${port}`);

    wss.on('connection', function connection(ws) {
      ws.on('error', console.error);

      ws.on('message', function message(data) {
        console.log('received: %s', data);
      });

      ws.send('something');
    });
    return { wss, port };
  } catch (err) {
    console.error(`Error starting server: ${err}`);
  }
};

// main.ts
// // Start the express server.
// const { server, port } = await startServer();
// app.on('will-quit', () => {
//   stopServer(server, port);
// });

// Start the WebSocket server.
// startWebSocketServer();
