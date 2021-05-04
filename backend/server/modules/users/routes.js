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
routes.put('/doctor/:id/assignDoctor', UserController.assignDoctor);
routes.get('/user/:id/getFirstName',UserController.getFirstName);
routes.get('/user/:id/getLastName', UserController.getLastName);
routes.get('/user/:id/getPhoneNumber',UserController.getPhoneNumber);
routes.get('/user/:id/getAddress',UserController.getAddress);
routes.get('/user/:id/getAppointment',UserController.getAppointment);
export default routes;