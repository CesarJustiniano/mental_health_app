import { Router } from 'express';
import multer from 'multer';
import Post from './model.js';
import User from '../users/model.js';

const routes = new Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g,'-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});

routes.post('/createPost', upload.single('image'), async (req, res) => {
    if(req.user) {

        const user = await User.findOne({username: req.user.username}, function (err, userInfo){
            if (err) throw err;
            else
                return userInfo;
        });

        if(req.file !== undefined) {

            const { body } = req.body;
            const newPost = new Post({
                body,
                postedBy: user,
                image: req.file.path.replace(/\\/g, '/'),
            });

            return res.status(200).json(await newPost.save());

        } else {

            const {body} = req.body;
            const newPost = new Post({
                body,
                postedBy: user,
            });

            return res.status(200).json(await newPost.save());
        }

    } else {
        return res.status(404).json({ error: true, message: 'Error with Post'});
    }
});

routes.get('/posts', async (req, res) => {
    try {
        return res.status(200).json(await Post.find({} ));
    } catch {
        return res.status(404).json({ error: true, message: 'Error with Post'});
    }
});

export default routes;