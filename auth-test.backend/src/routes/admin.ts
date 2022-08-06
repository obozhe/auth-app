import express from 'express';

import AdminController from '../controllers/admin-controller';
import { isAdmin } from '../middlewares/user-role-check';

const AdminRouter = express.Router();

AdminRouter.route('/users').post(isAdmin, AdminController.getUsers);

AdminRouter.route('/users/delete').patch(isAdmin, AdminController.deleteUsers);
AdminRouter.route('/users/ban').patch(isAdmin, AdminController.banUsers);
AdminRouter.route('/users/unban').patch(isAdmin, AdminController.unBanUsers);

export default AdminRouter;
