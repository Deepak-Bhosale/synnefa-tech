import * as express from "express";
import { taskRouter } from "./controllers/task";

const router: express.Router = express.Router();

router.use("/task", taskRouter);

export default router;
