import {Router} from 'express';
import * as DoctorController from './controller.js';


const routes = new Router();

routes.post('/signup', DoctorController.createDoctor);
routes.post('/login', DoctorController.loginDoctor);
routes.get('/logout', DoctorController.logoutDoctor);
routes.get('/doctor', DoctorController.getDoctor);
routes.get('/allDoctors', DoctorController.getAllDoctors);
routes.patch('/doctor/:_id', DoctorController.updateDoctor);

export default routes;