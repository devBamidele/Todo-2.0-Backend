import './pre-start';

import express from "express";
import helmet from "helmet";

import 'express-async-errors';

import Paths from "./constants/Paths";
import BaseRouter from '@src/routes/api';
import { ErrorHandler } from "./middleware/ErrorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 // Use only in production
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

// Add APIs, must be after middleware
app.use(Paths.Base, BaseRouter);

// Add error handler
app.use(ErrorHandler)


// **** Export default **** //

export default app;


