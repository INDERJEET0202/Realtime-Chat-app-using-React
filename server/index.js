const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes")
const messageRoutes = require("./routes/messageRoutes")
const app = express()
require("dotenv").config()

// const DB = 'mongodb+srv://Indrajit_pal:akgpp5156g@cluster0.dj5b7m8.mongodb.net/chat?retryWrites=true&w=majority';

const DB = process.env.DB;

const socket = require("socket.io");

app.use(cors())
app.use(express.json())

app.use("/api/auth", userRoutes);
app.use("/api/messages", messageRoutes);

mongoose.set('strictQuery', true);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB (cloud)")
}).catch((err) => {
    console.log("Error!!!")
    console.log(err)
})

// mongoose.connect(process.env.MONGO_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// }).then(() => {
//     console.log("Connected to MongoDB")
// }).catch((err) => {
//     console.log("Error!!!")
//     console.log(err)
// })

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT ${process.env.PORT}`)
});

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve", data.msg);
        }
    });
});