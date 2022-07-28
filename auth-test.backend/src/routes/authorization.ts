import express from 'express';

import * as UserController from '../controllers/user-controller';

const router = express.Router();

router.route('/login').post(UserController.login);
router.route('/register').post(UserController.register);

export default router;
