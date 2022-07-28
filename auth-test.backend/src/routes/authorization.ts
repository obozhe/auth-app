import express from 'express';

import * as UserController from '../controllers/user-controller';

const router = express.Router();

router.route('/sign-in').post(UserController.signIn);
router.route('/sign-up').post(UserController.signUp);
router.route('/sign-out').post(UserController.signOut);
router.route('/user').get(UserController.getCurrentUser);

export default router;
