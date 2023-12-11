import * as mongoose from "mongoose";

export class TaskSchema extends mongoose.Schema {
  constructor(collections: any) {
    const taskSchema = Object.assign({
      createdAt: {
        type: Date,
        default: Date.now(),
      },
      deletedAt: {
        type: Date,
        default: null,
      },
      originalId: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      isCompleted: {
        type: Boolean,
        required: false,
      },
      // status: {
      //   type: String,
      //   required: false,
      // },
    });
    super(taskSchema, collections);
  }
}
