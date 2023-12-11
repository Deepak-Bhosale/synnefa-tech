import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasksData } from '../redux/slice/AllTaskListSlice';
import { createTask } from '../network/Network';
import AddTask from './addTaskbtn/AddTask';
import Container from './container/Container';
import FilterTask from './filterTask/FilterTask';

const TaskManagerPage = () => {
  const dispatch = useDispatch();
  const { tasksData, loading, error } = useSelector((state) => state?.tasks);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newIsCompleted, setNewIsCompleted] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const [status, setStatus] = useState('all');

  const handleChange = (event) => {
    setStatus(event.target.value);
    if (event.target.value === 'all') {
      setFilteredData(tasksData?.data);
    } else if (event.target.value === 'completed') {
      const filtered = filteredData?.filter((ele) => ele.isCompleted === true);
      setFilteredData(filtered);
    } else if (event.target.value === 'incompleted') {
      const filtered = filteredData?.filter((ele) => ele.isCompleted === true);
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    dispatch(fetchTasksData());
  }, [dispatch]);

  const handleCreateTask = async () => {
    try {
      await createTask(newTaskTitle, newTaskDescription, newIsCompleted);
      dispatch(fetchTasksData());
      setNewTaskTitle('');
      setNewTaskDescription('');
      setNewIsCompleted(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <h1 style={{ display: 'flex', justifyContent: 'center' }}>
        Tasks Manager
      </h1>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <AddTask
          newTaskTitle={newTaskTitle}
          newTaskDescription={newTaskDescription}
          setNewTaskTitle={setNewTaskTitle}
          setNewTaskDescription={setNewTaskDescription}
          handleCreateTask={handleCreateTask}
        />
        <FilterTask handleChange={handleChange} status={status} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {!tasksData || tasksData?.data?.length === 0 ? (
          <h1>Please Add Data</h1>
        ) : (
          <Container data={tasksData?.data} />
        )}
      </div>
    </div>
  );
};

export default TaskManagerPage;
