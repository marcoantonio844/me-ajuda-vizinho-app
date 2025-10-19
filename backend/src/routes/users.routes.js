const { Router } = require('express');
const UserController = require('../controllers/UserController');

const usersRouter = Router();
const userController = new UserController();

usersRouter.post('/register', userController.create);

usersRouter.post('/login', userController.login);

module.exports = usersRouter;