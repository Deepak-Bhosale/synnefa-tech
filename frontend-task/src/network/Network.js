import axios from 'axios';
import { APIConstants, BaseURL } from '../config/ApiConstants';

const axiosInstance = axios.create({
  baseURL: BaseURL,
  timeout: 5000,
});

const fetchAllTasksData = async (url) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const createTask = async (title, description, isCompleted) => {
  try {
    const response = await axiosInstance.post(APIConstants.createTasks, {
      title,
      description,
      isCompleted
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const updateTask = async (originalId, updatedData) => {
  try {
    const response = await axiosInstance.put(`task/${originalId}`, updatedData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (originalId) => {
  try {
    const response = await axiosInstance.delete(`task/${originalId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { fetchAllTasksData, createTask, updateTask, deleteTask };
