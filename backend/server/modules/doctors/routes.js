import {Router} from 'express';
import * as DoctorController from './controller.js';


const routes = new Router();

routes.post('/doctor_signup', DoctorController.createDoctor);
routes.post('/doctor_login', DoctorController.loginDoctor);
routes.get('/doctor_logout', DoctorController.logoutDoctor);
routes.get('/doctor', DoctorController.getDoctor);
routes.get('/allDoctors', DoctorController.getAllDoctors);
routes.put('/updateDoctor', DoctorController.updateDoctor);
routes.get('/doctor_myPatients',DoctorController.getMyPatients);
routes.get('/doctor/:id/getFirstName',DoctorController.getFirstName)
routes.get('/doctor/:id/getLastName',DoctorController.getLastName)
routes.get('/doctor/:id/getPhoneNumber',DoctorController.getPhoneNumber)

export default routes;