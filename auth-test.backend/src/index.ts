import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';

import UserController from './controllers/user-controller';
import httpLogger from './core/loggers/http-logger';
import connectDB from './database/db-init';
import { BannedUserModel } from './database/models/banned-user';
import { UserModel } from './database/models/user';
import { UserVerificationTokenModel } from './database/models/user-verification-token';
import { apiErrorHandler, isOperationalError, logError } from './error/error-handler';
import AdminRoutes from './routes/admin';
import UserRoutes from './routes/user';

dotenv.config();

const app = express();
const port = 5050;

connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(httpLogger);

app.use('/api/user', UserRoutes, apiErrorHandler);
app.use('/api/admin', AdminRoutes, apiErrorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// (async () => {
//     await UserModel.deleteMany({});
//     await UserVerificationTokenModel.deleteMany({});
//     await BannedUserModel.deleteMany({});
// })();
//
// (async () => {
//     await UserController.createAdmin();
//     await UserController.createUserMock(100);
// })();

process.on('uncaughtException', (error) => {
    logError(error);

    if (!isOperationalError(error)) {
        process.exit(1);
    }
});

process.on('unhandledRejection', (error) => {
    throw error;
});
