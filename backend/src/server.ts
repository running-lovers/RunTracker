import express from 'express';
import cors from 'cors';
import { router as indexRouter } from './routes/indexRouter';
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const PORT = 8080;

// HTTP Server
const httpServer = createServer(app);

//Socket.IO
const io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    },
  });

app.use(express.json());
app.use(cors());

app.use('/api', indexRouter);

//Socket.IO
io.on("connection", (socket) => {
    console.log("A user connected");
  
    
    socket.on("sendMessage", (data) => {
      console.log("Message received: ", data);
      io.emit("newMessage", data);
    });
  
    socket.on("disconnect", () => {
      console.log("A user disconnected");
    });
  });

// app.listen(PORT, () => {
//     console.log(`Server is listening to http://localhost:${PORT}`);
// })

// use httpServer instead of app.listen
httpServer.listen(PORT, () => {
    console.log(`Server is listening to http://localhost:${PORT}`);
  });

