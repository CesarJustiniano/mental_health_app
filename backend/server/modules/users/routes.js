import { Router } from 'express';
import * as UserController from './controller.js';

const routes = new Router();

routes.post('/signup', UserController.createUser);
routes.post('/login', UserController.loginUser);
routes.get('/logout', UserController.logoutUser);
routes.get('/user', UserController.getUser);
routes.get('/allUsers', UserController.getAllUsers);
routes.put('/updateUser', UserController.updateUser);
routes.get('/allEmails',UserController.getAllEmails)
routes.get('/myEmail',UserController.getMyEmail);


export default routes;