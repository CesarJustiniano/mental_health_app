import mongoose from 'mongoose';
require('dotenv/config');

export default () => {

    // Connection to the MongoDB database

    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost/MHA', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true});
    // mongoose.connect(process.env.DB_CONNECTION,
    //     {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true},
    //     () => console.log('Connected to DB'));
    mongoose.connection
        .once('open', () => console.log('MongoDB running'))
        .on('error', err => console.log(err))
};