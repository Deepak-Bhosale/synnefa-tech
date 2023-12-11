export interface ITaskModel {
  createdAt: Date;
  deletedAt: Date;
  originalId: string;
  title: string;
  description: string;
  isCompleted: boolean;
  // status: string;
}
