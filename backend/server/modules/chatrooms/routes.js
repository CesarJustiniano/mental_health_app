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

                const newChatroom = new ChatRoom({
                    name: `Therapy: ${user.username} & ${doctor.username}`,
                    users: [{user}],
                    doctor: {doctor}
                });

                //user.joinedChatRooms.push(newChatroom);

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

        const category = req.params.category;
        const newGroupChatroom = new ChatRoom({
            name: `${category}: ${doctor.username}`,
            category: category,
            doctor: {doctor}
        });

        return res.status(200).json(await newGroupChatroom.save());
    } else {
        return res.status(404).json({ error: true, message: 'Error with Group Chatroom'});
    }
});

routes.post('/groupChatroom/:id/addUser', async (req, res) => {
    if(req.user){
        const chatRoom = await ChatRoom.findById(req.params.id);

        const user = await User.findOne({username: req.user.username}, function (err, userInfo){
            if (err) throw err;
            else
                return userInfo;
        });

        const doctor = await Doctor.findOne({username: req.user.username}, function (err, doctorInfo){
            if (err) throw err;
            else
                return doctorInfo;
        });

        if(doctor){
            return res.status(500).json({ error: true, message: 'Doctor cannot join other group chats'});
        }

        return res.status(200).json(await chatRoom.save()
            .then(user => {
                return ChatRoom.findById(req.params.id);
            })
            .then(chatRoom => {
                chatRoom.users.push({user});
                return chatRoom.save();
            })
            .catch(err => {
                console.log(err);
            }));
    } else {
        return res.status(404).json({ error: true, message: 'Error with Chatroom'});
    }
});

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

routes.delete('/chatRoom/remove/:id', async (req, res) => {
   if(req.user){
       return res.status(200).json(await ChatRoom.findByIdAndDelete(req.params.id));
   } else {
       return res.status(404).json({ error: true, message: 'Error with group chat'});
   }
});

routes.delete('/groupChatroom/remove/:id', async (req, res) => {
    if(req.user){
        const user = await User.findOne({username: req.user.username}, function (err, userInfo){
            if (err) throw err;
            else
                return userInfo;
        });
        const chatRoom = await ChatRoom.findById(req.params.id);

        if(user){
            if(chatRoom.users[0].user){
                if(chatRoom.users[0].user._id.equals(user._id)){
                    return res.status(200).json(await ChatRoom.findByIdAndDelete(req.params.id));
                }
            }

            return res.status(500).json({ error: true, message: 'User cannot delete group chats'});
        }


        const doctor = await Doctor.findOne({username: req.user.username}, function (err, doctorInfo){
            if (err) throw err;
            else
                return doctorInfo;
        });

        if(chatRoom.doctor.doctor._id.equals(doctor._id)){
            return res.status(200).json(await ChatRoom.findByIdAndDelete(req.params.id));
        }

        return res.status(500).json({ error: true, message: 'Cannot delete group chats from other Doctors'})
    } else {
        return res.status(404).json({ error: true, message: 'Error with group chat'});
    }
});

export default routes;