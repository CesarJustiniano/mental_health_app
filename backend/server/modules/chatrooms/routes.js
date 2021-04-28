import { Router } from 'express';
import ChatRoom from './chatRoomModel.js';
import User from "../users/model";
import Message from "./messageModel";
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

                const doctor = await Doctor.findById(user.myDoctor);

                const { name } = req.body;
                const newChatroom = new ChatRoom({
                    name: name,
                    users: [{user}],
                    doctor: {doctor}
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
        let newMessage;

        if(user){
            newMessage = new Message({
                chatRoom: chatRoom,
                user: {user},
                content: req.body.content
            });
        } else {
            const doctor = await Doctor.findOne({username: req.user.username}, function (err, doctorInfo){
                if (err) throw err;
                else
                    return doctorInfo;
            });

            newMessage = new Message({
                chatRoom: chatRoom,
                doctor: {doctor},
                content: req.body.content
            });
        }

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

routes.post('/createGroupChatroom/:category', async (req, res) => {
    if(req.user){
        const user = await User.findOne({username: req.user.username}, function (err, userInfo){
            if (err) throw err;
            else
                return userInfo;
        });

        if(user){
            return res.status(500).json({ error: true, message: 'Patients cannot create group chats'});
        }

        const doctor = await Doctor.findOne({username: req.user.username}, function (err, doctorInfo){
            if (err) throw err;
            else
                return doctorInfo;
        });

        const { name } = req.body;
        const newGroupChatroom = new ChatRoom({
            name: name,
            category: req.params.category,
            doctor: {doctor}
        });

        return res.status(200).json(await newGroupChatroom.save());
    } else {
        return res.status(404).json({ error: true, message: 'Error with Group Chatroom'});
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

        if(user){
            return res.status(200).json(await ChatRoom.find({users: [{user}]}));
        }

        const doctor = await Doctor.findOne({username: req.user.username}, function (err, doctorInfo){
            if (err) throw err;
            else
                return doctorInfo;
        });

        return res.status(200).json(await ChatRoom.find({doctor: {doctor}}));
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

routes.get('/groupChatroom/:category', async (req, res) => {
    if(req.user){
        return res.status(200).json(await ChatRoom.find({category: req.params.category}));
    } else {
        return res.status(404).json({ error: true, message: 'Error with group chat'});
    }
});

export default routes;