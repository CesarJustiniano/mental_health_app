import { Router } from 'express';
import * as UserController from './controller.js';

const routes = new Router();

routes.post('/signup', UserController.createUser);
routes.post('/login', UserController.loginUser);
routes.get('/logout', UserController.logoutUser);
routes.get('/user', UserController.getUser);
routes.get('/allUsers', UserController.getAllUsers);
routes.patch('/user/:_id', UserController.updateUser);


export default routes;