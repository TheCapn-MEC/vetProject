const express = require('express');
const navigation = express.Router();
const path = require('path');
const ensureAuthenticated = require('../middleware/auth')

// Front end
navigation.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
})
navigation.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/aboutUs.html'));
})
navigation.get('/adopt', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/pets.html'));
})
navigation.get('/pet', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/individualPet.html'));
})
navigation.get('/adoptionform', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/adoptForm.html'));
})

// Admin Pages
navigation.get('/adminLogin', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/adminLogin.html'));
})
navigation.get('/adminHome',(req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/adminApp.html'));
})
navigation.get('/adminnavigationlication', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/adminIndnavigation.html'));
})
navigation.get('/adminPets', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/adminPets.html'));
})
navigation.get('/adminPet', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/adminIndPet.html'));
})
navigation.get('/adminRecords', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/adminRecords.html'))
})

navigation.post('/adminLogin', (req, res) => {
    console.log(req.body)
    res.redirect('adminHome');
})

module.exports = navigation;