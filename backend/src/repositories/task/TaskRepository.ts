import * as mongoose from "mongoose";
import { taskModel } from "./TaskModel";
import { ITaskModel } from "./ITaskModel";

class TaskRepository {
  private TASK: any;
  constructor(model: any) {
    this.TASK = model;
  }

  public async countTasks(query = {}) {
    try {
      return await taskModel.countDocuments({
        deletedAt: null,
        ...query,
      });
    } catch (error) {
      console.log("CATCH BLOCK : Task Repository countTasks =>", error);
    }
  }

  public async getAllTasks(
    query?: mongoose.FilterQuery<ITaskModel>,
    projection?: any,
    options?: mongoose.QueryOptions
  ) {
    try {
      return await taskModel.find(
        {
          deletedAt: null,
          ...query,
        },
        {
          _id: 0,
          deletedAt: 0,
          ...projection,
        },
        options
      );
      // ).sort({  }).skip(0).limit(10);
    } catch (error) {
      console.log("CATCH BLOCK : Task Repository getAllTasks =>", error);
    }
  }

  public async findOneTask(
    query: mongoose.FilterQuery<ITaskModel>,
    projection?: any
  ) {
    try {
      return await taskModel.findOne(query, projection);
    } catch (error) {
      console.log("CATCH BLOCK : Task Repository findOneTask =>", error);
    }
  }

  public async createTask(data: any, projection: any) {
    try {
      console.log("Repository: created", data);
      const id = new mongoose.Types.ObjectId();
      return new taskModel(
        {
          originalId: data.originalId || id,
          ...data,
          _id: id,
        },
        {
          _id: 0,
          ...projection,
        }
      ).save();
    } catch (error) {
      console.log("CATCH BLOCK : Task Repository createTask =>", error);
    }
  }

  public async updateTask(
    query: mongoose.FilterQuery<any>,
    data: mongoose.FilterQuery<ITaskModel[]>,
    projection: any
  ) {
    try {
      console.log(": Updated Data :", data);
      await taskModel.updateOne({ deletedAt: null, ...query }, { deletedAt: new Date() });
      return await this.createTask({...data, deletedAt: null}, projection);
    } catch (error) {
      console.log("CATCH BLOCK : Task Repository update =>", error);
    }
  }

  public async deleteTask(query: mongoose.FilterQuery<ITaskModel>) {
    try {
      return await taskModel
        .updateOne({ deletedAt: null, ...query }, { deletedAt: new Date() })
        .lean();
    } catch (error) {
      console.log("CATCH BLOCK : Task Repository delete =>", error);
    }
  }
}

export const taskRepository = new TaskRepository(taskModel);
