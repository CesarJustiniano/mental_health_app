import { Router } from 'express';
import Post from './model.js';
import User from '../users/model.js';
import Doctor from '../doctors/model.js';

const routes = new Router();

// This function creates a post in a category of choice.
// This function works only if a current user or doctor is logged in.
// Both users and doctors can make a post in the different categories.
routes.post('/createPost/:category', async (req, res) => {
    if(req.user) {

        if(req.user.role === 'user') {

            const user = await User.findOne({username: req.user.username}, function (err, userInfo){
                if (err) throw err;
                else
                    return userInfo;
            });

            const {body} = req.body;
            const newPost = new Post({
                body,
                postedBy: user,
                category: req.params.category
            });

            return res.status(200).json(await newPost.save());


        } else if (req.user.role === 'doctor') {

            const doctor = await Doctor.findOne({username: req.user.username}, function (err, doctorInfo){
                if (err) throw err;
                else
                    return doctorInfo;
            });

            const {body} = req.body;
            const newPost = new Post({
                body,
                postedBy: doctor,
                category: req.params.category
            });

            return res.status(200).json(await newPost.save());

        }
    } else {
        return res.status(404).json({ error: true, message: 'Error with Post'});
    }
});

// This function gets all the posts in a specific category.
routes.get('/posts/:category', async (req, res) => {
    try {
        return res.status(200).json(await Post.find({category: req.params.category} ));
    } catch {
        return res.status(404).json({ error: true, message: 'Error with Post'});
    }
});

export default routes;