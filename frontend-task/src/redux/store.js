import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slice/AllTaskListSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

export default store;