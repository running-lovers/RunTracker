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
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use('/api', indexRouter); //use indexRouter

//Socket.IO
io.on("connection", (socket) => {
    console.log("A user connected");
  
    //JoinRoom
    socket.on("joinRoom", (chatRoomId) => {
      console.log(`User joined room: ${chatRoomId}`);
      socket.join(chatRoomId);
    });

    //send message
    socket.on("sendMessage", (data) => {
      console.log("Message received: ", data);
      console.log(`Broadcasting message to room: ${data.chatRoomId}`);
      io.to(data.chatRoomId).emit("newMessage", data);
    });

    //create new group
    socket.on("newGroup", (newGroup) => {
        io.emit("newGroup", newGroup);
    });
  
    // Delete Group
    socket.on("deleteGroup", (groupId) => {
      io.emit("groupDeleted", groupId);
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

