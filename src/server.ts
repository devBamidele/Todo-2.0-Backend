import express from "express";
import helmet from "helmet";

import 'express-async-errors';

import TaskRouter from './routes/TaskRoute';
import { ErrorHandler } from "./middleware/ErrorHandler";
import AuthRouter from "./routes/AuthRoute";
import { Paths } from "./constants";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 // Use only in production
if (process.env.NODE_ENV === 'production') {
    app.use(helmet());
}

app.use(Paths.Auth.Base, AuthRouter)
app.use(Paths.Task.Base, TaskRouter);

// Add error handler
app.use(ErrorHandler)


// **** Export default **** //

export default app;


