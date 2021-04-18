import { Router } from 'express';
//import Post from './model.js';
import VideoCall from './model.js'

import User from '../users/model.js';

const routes = new Router();

routes.post('/createVideoCall', async (req, res) => {
    if(req.user) {

        const user = await User.findOne({username: req.user.username}, function (err, userInfo){
            if (err) throw err;
            else
                return userInfo;
        });

        const { body } = req.body;
        const newPost = new Post({
            body,
            postedBy: user,
        });

        return res.status(200).json(await newPost.save());

    } else {
        return res.status(404).json({ error: true, message: 'Error with Post'})
    }
});

routes.get('/VideoCall', async (req, res) => {
    try {
        return res.status(200).json(await Post.find({} ));
    } catch {
        return res.status(404).json({ error: true, message: 'Error with Post'});
    }
});

export default routes;