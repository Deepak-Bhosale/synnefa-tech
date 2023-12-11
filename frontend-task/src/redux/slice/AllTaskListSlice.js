import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { APIConstants } from '../../config/ApiConstants';
import { fetchAllTasksData } from '../../network/Network';

export const fetchTasksData = createAsyncThunk('',
  async () => {
    try {
      const data = await fetchAllTasksData(APIConstants.getAllTasks);
      return data;
    } catch (error) {
      return error.message;
    }
  }
);


const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasksData: [],
    loading: false,
    error: null,
  },
  reducers: {
    // Other reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasksData.fulfilled, (state, action) => {
        state.loading = false;
        state.tasksData = action.payload;
      })
      .addCase(fetchTasksData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { /* other actions */ } = tasksSlice.actions;
export default tasksSlice.reducer;
