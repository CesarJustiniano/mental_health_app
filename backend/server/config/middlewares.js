import bodyParser from 'body-parser';
const morgan = require('morgan');
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import passportConfig from './passportConfig.js';

export default app => {

   // Middlewares used for the application

   app.use(morgan('dev'));

   app.use(cors({
      credentials: true,
      origin: 'http://localhost:19006',
      methods: 'GET, POST, PUT',
   }));

   app.use(cookieParser('secretCode'));
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({extended: false}));

   app.use(session({
      secret: "secretCode",
      resave: false,
      saveUninitialized: true,
   }));

   app.use(passport.initialize());
   app.use(passport.session());
   passportConfig(passport);

   app.use(function (req, res, next){
      console.log(req.session);
      console.log(req.user);
      next();
   })
};