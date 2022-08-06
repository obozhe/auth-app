import express from 'express';

import UserController from '../controllers/user-controller';
import { isUser } from '../middlewares/user-role-check';

const UserRouter = express.Router();

UserRouter.route('/').get(isUser, UserController.getCurrentUser);

UserRouter.route('/login').post(UserController.login);
UserRouter.route('/logout').post(isUser, UserController.logout);
UserRouter.route('/create').post(UserController.create);
UserRouter.route('/verify').post(UserController.verify);

export default UserRouter;
