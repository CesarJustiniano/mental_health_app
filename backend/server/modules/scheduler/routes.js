import { Router } from 'express';
import User from '../users/model.js';

const routes = new Router();

routes.get('user/:id/scheduler',async(req,res)=>{

    try{

        if(req.user){



        }
        const posts = await Post.find();
        res.json(posts);
    }catch(err){
        res.json({message:err});
    }

});

export default routes;
