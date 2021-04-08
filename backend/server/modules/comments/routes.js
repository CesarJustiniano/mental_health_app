import { Router } from 'express';
import Comment from "./model.js";
import Post from '../posts/model.js';
import User from '../users/model.js';

const routes = new Router();

routes.post('/post/:id/createComment', async (req, res) => {
    if(req.user){

        const postId = await Post.findById(req.params.id);

        const user = await User.findOne({username: req.user.username}, function (err, userInfo){
            if (err) throw err;
            else
                return userInfo;
        });

        const newComment = new Comment({
            text: req.body.text,
            postIn: postId,
            postedBy: user,
        });

        return res.status(200).json(await newComment.save()
            .then(comment => {
                return Post.findById(req.params.id);
            })
            .then(post => {
                post.comments.push(newComment);
                return post.save();
            })
            .catch(err => {
                console.log(err);
            })
        );

    } else {
        return res.status(404).json({ error: true, message: 'Error with Comment'})
    }
});

routes.get('/post/:id/comments', async (req, res) => {

    const postId = await Post.findById(req.params.id);

    try {
        return res.status(200).json(await Comment.find({ postIn: postId }));
    } catch {
        return res.status(404).json({ error: true, message: 'Error with Comment'})
    }
});

export default routes;