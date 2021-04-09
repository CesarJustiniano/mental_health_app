import bodyParser from 'body-parser';
const morgan = require('morgan');
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import passportConfig from './passportConfig.js';
import express from "express";

export default app => {
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({extended: false}));

   app.use(morgan('dev'));
   app.use('/uploads', express.static(process.cwd() + 'uploads'));

   app.use(cors());

   app.use(session({
      secret: "secretCode",
      resave: true,
      saveUninitialized: true,
   }));

   app.use(cookieParser("secretCode"));
   app.use(passport.initialize());
   app.use(passport.session());
   passportConfig(passport);
};