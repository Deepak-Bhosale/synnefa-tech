import { Router } from "express";
import task from "./taskController";

const taskRouter: Router = Router();

taskRouter.get("/allTasksData", task.getAllTasksData);
taskRouter.post("/createTask", task.createTask);
taskRouter.put("/:originalId", task.updateTask);
taskRouter.delete("/:originalId", task.deleteTask);

export default taskRouter;
