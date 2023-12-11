import { Request, Response, NextFunction } from "express"
import { errorMessages, status } from "../../libs/constant";
import { taskRepository } from "../../repositories/task/TaskRepository";

class TaskController {
    getAllTasksData = async (request: Request, response: Response, next: NextFunction) => {
      try {  
        const allTaskData = await taskRepository.getAllTasks({}, {}, {});
        const allTaskCount = await taskRepository.countTasks();
        response.status(200).send({
          message: `Successfully fetched all ${allTaskCount} tasks`,
          data: allTaskData,
          status: status.SUCCESS,
        });
      } catch (error) {
        console.log("CATCH BLOCK : Task controller getAllTasksData =>", error);
        throw next({
          error: errorMessages.BAD_REQUEST,
          message: "invalid required",
          status: status.BAD_REQUEST,
        });
      }
    };
  
    createTask = async (request: Request, response: Response, next: NextFunction) => {
      try {
            const output = await taskRepository.createTask({
              ...request.body,
            }, {});
            response.status(200).send({
              message: "successfully created task",
              data: output,
              status: status.SUCCESS,
            });
          }
      catch (error) {
        console.log("CATCH BLOCK : task controller create =>", error);
        throw next({
          error: errorMessages.BAD_REQUEST,
          message: "details are required",
          status: status.BAD_REQUEST,
        });
      }
    };
  
    updateTask = async (request: Request, response: Response, next: NextFunction) => {
      try {
        const { originalId } = request.params;
        console.log("🚀 ~ file: taskController.ts:49 ~ TaskController ~ updateTask= ~ originalId:", originalId)
        const taskExists = await taskRepository.findOneTask({
          originalId,
        });
        if (taskExists) {
          const updatedData = Object.assign(JSON.parse(JSON.stringify(taskExists)), request.body);
          const result = await taskRepository.updateTask({ originalId }, updatedData, {});
          response.status(200).send({
            message: "successfully updated task",
            data: result,
            status: status.SUCCESS,
          });
        } else {
          throw next({
            error: errorMessages.BAD_REQUEST,
            message: "task is not exists",
            status: status.BAD_REQUEST,
          });
        }
      } catch (error) {
        console.log("CATCH BLOCK : task controller update =>", error);
        throw next({
          error: errorMessages.BAD_REQUEST,
          message: "you cannot update task exception",
          status: status.BAD_REQUEST,
        });
      }
    };
  
    deleteTask = async (request: Request, response: Response, next: NextFunction) => {
      try {
        const { originalId } = request.params;
        const taskExists = await taskRepository.findOneTask({ originalId });
        if (taskExists) {
          await taskRepository.deleteTask({ originalId });
          response.status(200).send({
            message: "successfully deleted task",
            data: { originalId },
            status: status.SUCCESS,
          });
        } else {
          throw next({
            error: errorMessages.BAD_REQUEST,
            message: "task is not exists",
            status: status.BAD_REQUEST,
          });
        }
      } catch (error) {
        console.log("CATCH BLOCK : task controller delete =>", error);
        throw next({
          error: errorMessages.BAD_REQUEST,
          message: "originalId is required",
          status: status.BAD_REQUEST,
        });
      }
    };
  
    // login = async (request: Request, response: Response, next: NextFunction) => {
    //   try {
    //     const {
    //       body: { email, password },
    //     } = request;
    //     console.log("valid token request for user", request.body);
    //     const userExists = await taskRepository.findOneUser({ email });
  
    //     if (userExists) {
    //       const match = await bcrypt.compare(password, userExists.password);
    //       if (match) {
    //         const token = jwt.sign({ data: userExists }, configuration.jwt_secret, {
    //           expiresIn: 60 * 60,
    //         });
    //         response.send({
    //           message: "Logged in successfully",
    //           data: { token, user: userExists },
    //           status: status.SUCCESS,
    //         });
    //       } else {
    //         response.send({
    //           message: "email or password is invalid",
    //           data: userExists,
    //           status: status.BAD_REQUEST,
    //         });
    //       }
    //     } else {
    //       response.send({
    //         message: "email or password is invalid",
    //         data: userExists,
    //         status: status.BAD_REQUEST,
    //       });
    //     }
    //   } catch (error) {
    //     console.log("CATCH BLOCK : user controller login =>", error);
    //     return next({
    //       error: error,
    //       message: "Internal Server Error",
    //       status: status.INTERNAL_SERVER_ERROR,
    //     });
    //   }
    // };
  }


  export default new TaskController();