import { Router } from 'express';
import ChatRoom from './chatRoomModel.js';
import User from "../users/model";
import Message from "./messageModel";
import Post from "../posts/model";
import Doctor from "../doctors/model";

const routes = new Router();

routes.post('/createChatroom', async (req, res) => {
    if(req.user){
        ChatRoom.findOne({ name: req.body.name }, async (err, doc) => {
            if (err) throw err;
            if (doc) res.send('ChatRoom Already Exists');
            if (!doc) {

                const user = await User.findOne({username: req.user.username}, function (err, userInfo){
                    if (err) throw err;
                    else
                        return userInfo;
                });

                const doctor = await Doctor.findById(user.myDoctor.id);

                const { name } = req.body;
                const newChatroom = new ChatRoom({
                    name: name,
                    users: [{user}],
                    doctor: doctor
                });

                //await newChatroom.save();
                //res.redirect('/chatRooms');
                return res.status(200).json(await newChatroom.save());
            }
        });
    } else {
        return res.status(404).json({ error: true, message: 'Error with Chatroom'});
    }
});

routes.post('/chatRoom/:id/createMessage', async (req, res) => {
    if(req.user){
        const user = await User.findOne({username: req.user.username}, function (err, userInfo){
            if (err) throw err;
            else
                return userInfo;
        });
        const chatRoom = await ChatRoom.findById(req.params.id);

        const newMessage = new Message({
            chatRoom: chatRoom,
            user: {user},
            content: req.body.content
        });

        return res.status(200).json(await newMessage.save()
            .then(message => {
                return ChatRoom.findById(req.params.id);
            })
            .then(chatRoom => {
                chatRoom.messages.push(newMessage);
                chatRoom.lastMessage = {message: newMessage};
                return chatRoom.save();
            })
            .catch(err => {
                console.log(err);
            }));
    } else {
        return res.status(404).json({ error: true, message: 'Error with Message'});
    }
});

// routes.post('/chatRoom/:id/addUser', async (req, res) => {
//     if(req.user){
//         const chatRoom = await ChatRoom.findById(req.params.id);
//
//         const user = await User.findOne({username: req.user.username}, function (err, userInfo){
//             if (err) throw err;
//             else
//                 return userInfo;
//         });
//
//         if(chatRoom.users.contains(user)){
//             return res.status(500).json({ error: true, message: 'User already in this chat room'});
//         }
//
//         await chatRoom.users.push(user)
//         return res.status(200).json(await chatRoom.save());
//     } else {
//         return res.status(404).json({ error: true, message: 'Error with Chatroom'});
//     }
// });

routes.get('/chatRooms', async (req, res) => {
    if(req.user) {
        const user = await User.findOne({username: req.user.username}, function (err, userInfo){
            if (err) throw err;
            else
                return userInfo;
        });

        return res.status(200).json(await ChatRoom.find({users: [{user}]}));
    } else {
        return res.status(404).json({ error: true, message: 'Error with Chatroom'});
    }
});

routes.get('/chatRoom/:id/messages', async (req, res) => {
    if(req.user){
        const chatRoom = await ChatRoom.findById(req.params.id);

        return res.status(200).json(await chatRoom.messages);
    } else {
        return res.status(404).json({ error: true, message: 'Error with messages'});
    }
});

export default routes;