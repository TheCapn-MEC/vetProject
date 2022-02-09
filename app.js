//important things
// const express = require('express');
// const app = express();
// const path = require('path');
// const routes = require('./routes/pets');
// const routesApp = require('./routes/applicationRoute');
// const loginRoute = require('./routes/login');
// const connectDB = require('./db/connect');
// const bodyParser = require('body-parser');
// const populateProducts = require('./populate');

import express from 'express'
const app = express()
import path from 'path'
import routes from './routes/pets.js'
import routesApp from './routes/applicationRoute.js'
import loginRoute from './routes/login.js'
import connectDB from './db/connect.js'
import bodyParser from 'body-parser';

const port = process.env.PORT || 5000;

//important packages
require('dotenv').config()

//middleware functions
app.use(express.json())
app.use('/api/v1/pets', routes);
app.use('/api/v1/applications', routesApp);
// app.use('/login', loginRoute)
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("./public"));

// Front end
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/index.html'));
})
app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/aboutUs.html'));
})
app.get('/adopt', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/pets.html'));
})
app.get('/pet', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/individualPet.html'));
})
app.get('/adoptionform', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/adoptForm.html'));
})

// Admin Panel
app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public/adminLogin.html'));
})

// uncomment this when adding DB functionality
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        // await populateProducts()
        app.listen(port, console.log(`server is listening on port ${port}`));
    } catch (error) { console.log(error) }
}
start();
