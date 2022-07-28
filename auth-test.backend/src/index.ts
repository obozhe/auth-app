import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';

import connectDB from './core/db';
import { apiErrorHandler, isOperationalError, logError } from './core/error-handler/error-handler';
import httpLogger from './core/loggers/http-logger';
import AuthorizationRoutes from './routes/authorization';

dotenv.config();

const app = express();
const port = 5000;

connectDB();

app.use(cookieParser());
app.use(express.json());
app.use(httpLogger);

app.use('/api/authorization', AuthorizationRoutes, apiErrorHandler);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

process.on('uncaughtException', (error) => {
    logError(error);

    if (!isOperationalError(error)) {
        process.exit(1);
    }
});

process.on('unhandledRejection', (error) => {
    throw error;
});
