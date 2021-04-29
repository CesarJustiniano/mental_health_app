import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import passportSocketIO from 'passport.socketio';
import sessionStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import dbConfig from './config/db.js';
import middlewareConfig from './config/middlewares.js';
import {PostRoutes, UserRoutes, CommentRoutes, ChatRoomRoutes, DoctorRoutes, SchedulerRoutes} from './modules';

import User from '../server/modules/users/model.js';
import Doctor from '../server/modules/doctors/model.js';
import Message from '../server/modules/chatrooms/messageModel.js';
import UserSchema from "../server/modules/users/model.js";
import DoctorSchema from "../server/modules/doctors/model.js";



const app = express();
const server = http.Server(app);
const io = socketIO(server);

//Database
dbConfig();

//Middlewares
middlewareConfig(app);

app.use('/api', [PostRoutes, UserRoutes, CommentRoutes, DoctorRoutes, ChatRoomRoutes, SchedulerRoutes]);

app.get("/newEndpoint",async (req,res)=> {

    return res.status(200).json(await Doctor.find({} ));
    //return res.status(200).json(await User.findOne(user.phoneNumber))
    }

)


const PORT = process.env.PORT || 3000;

app.listen(PORT, err => {
    if(err){
        console.log(err)
    } {
        console.log(`App listen to port: ${PORT}`);
    }
});


//-----------------------------Socket Connection----------------------------------------

io.use(passportSocketIO.authorize({
    cookieParser: cookieParser,
    key: 'express.sid',
    secret: "secretCode",
    store: sessionStore,
}));

io.on('connection', (socket) => {
    console.log("Connected: " + socket.request.user);

    socket.on('disconnect', () => {
        console.log("Disconnected: " + socket.request.user);
    });

    socket.on('joinRoom', ({ chatRoomId }) => {
        socket.join(chatRoomId);
        console.log("A user joined chatroom: " + chatRoomId);
    });

    socket.on('leaveRoom', ({ chatRoomId }) => {
        socket.leave(chatRoomId);
        console.log("A user left chatroom: " + chatRoomId);
    });

    socket.on('chatRoomMessage', async ({ chatRoomId, message }) => {
        if(message.trim().length > 0) {
            const user = await User.findOne({ _id: socket.request.user._id});

            const newMessage = new Message({
                chatroom: chatRoomId,
                user: socket.request.user,
                content: message,
            });

            // io.to(chatRoomId).emit('newMessage', {
            //     message: message,
            //     name: user,
            //     user: socket.request.user,
            // });

            io.to(chatRoomId).emit('newMessage', {
               messages: newMessage
            });

            chatRoomId.messages.push(await newMessage.save());
            await chatRoomId.save();
        }
    });
})