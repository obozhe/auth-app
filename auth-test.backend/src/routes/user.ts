import express from 'express';

import * as UserController from '../controllers/user-controller';
import { isAdmin, isUser } from '../controllers/user-controller';

const router = express.Router();

router.route('/').get(isUser, UserController.getCurrentUser);
router.route('/list').get(isAdmin, UserController.getUserList);

router.route('/login').post(UserController.login);
router.route('/logout').post(isUser, UserController.logout);
router.route('/create').post(UserController.create);

router.route('/list/remove').put(isAdmin, UserController.remove);

export default router;
