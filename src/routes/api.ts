import Paths from "@src/constants/Paths";
import logger from "@src/utils/logger";
import { Router, Request, Response } from "express";

// **** Variables **** //

const apiRouter = Router();


// ** Add UserRouter ** //

const userRouter = Router();

userRouter.get(Paths.Users.Get, (req: Request, res: Response) => {
    res.status(200).send('Hello Bamidele, we have successfully deployed to Google App Engine');

    logger.info('Serviced a request')
});

userRouter.post(Paths.Users.Add);

userRouter.put(Paths.Users.Update);

userRouter.delete(Paths.Users.Delete);

// Add UserRouter
apiRouter.use(Paths.Users.Base, userRouter);

// **** Export default **** //

export default apiRouter;
