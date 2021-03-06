import { Router } from 'express';
import ChatRoom from './chatRoomModel.js';

const routes = new Router();

routes.post('/createChatroom', async (req, res) => {
    if(req.user){
        ChatRoom.findOne({ name }, async (err, doc) => {
            if (err) throw err;
            if (doc) res.send('ChatRoom Already Exists');
            if (!doc) {

                const { name } = req.body;
                const newChatroom = new ChatRoom({
                    name,
                });

                //await newChatroom.save();
                //res.redirect('/chatRooms');
                return res.status(200).json({ chatroom: await newChatroom.save()});
            }
        });
    } else {
        return res.status(404).json({ error: true, message: 'Error with Chatroom'});
    }
});

routes.get('/chatRooms', async (req, res) => {
    try {
        return res.status(200).json({chatroom: await ChatRoom.find({} )});
    } catch {
        return res.status(404).json({ error: true, message: 'Error with Chatroom'});
    }
});

export default routes;