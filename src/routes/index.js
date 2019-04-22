const express = require('express');

const router = express.Router();

const userController = require('../controllers/users');
const errorController = require('../controllers/errors');

router.get('/users', userController.getUsers);

router.post('/add-user', userController.addUser);

router.get('/add-user', userController.getAddUserPage);

router.use('/', errorController.get404);

module.exports = router;


// const path = require('path');
// res.sendFile(path.join(__dirname, '..', 'views', 'home.html'));