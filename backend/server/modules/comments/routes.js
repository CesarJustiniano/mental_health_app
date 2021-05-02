import { Router } from 'express';
import Comment from "./model.js";
import Post from '../posts/model.js';
import User from '../users/model.js';
import Doctor from '../doctors/model.js';

const routes = new Router();

// This function creates a comment in a specific post, given the post id.
// This function works only if a current user or doctor is logged in.
// Both users and doctors can make a comment in the different posts.
routes.post('/post/:id/createComment', async (req, res) => {
    if(req.user){

        const postId = await Post.findById(req.params.id);

        if(req.user.role === 'user') {
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

        } else if(req.user.role === 'doctor') {
            const doctor = await Doctor.findOne({username: req.user.username}, function (err, doctorInfo){
                if (err) throw err;
                else
                    return doctorInfo;
            });

            const newComment = new Comment({
                text: req.body.text,
                postIn: postId,
                postedBy: doctor,
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
        }
    } else {
        return res.status(404).json({ error: true, message: 'Error with Comment'})
    }
});

// This functions gets all the comments of a specific post.
routes.get('/post/:id/comments', async (req, res) => {

    const postId = await Post.findById(req.params.id);

    try {
        return res.status(200).json(await Comment.find({ postIn: postId }));
    } catch {
        return res.status(404).json({ error: true, message: 'Error with Comment'})
    }
});

export default routes;