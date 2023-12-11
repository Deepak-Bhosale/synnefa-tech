import * as mongoose from 'mongoose';
import { TaskSchema } from './TaskSchema';
import { ITaskModel } from './ITaskModel';

export const taskSchema = new TaskSchema({
  collections: 'tasks',
  versionKey: false,
});

export const taskModel: mongoose.Model<ITaskModel> = mongoose.model<ITaskModel>(
  'tasks',
  taskSchema
);

taskModel.collection.createIndex({ title: 1 });