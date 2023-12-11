import React, { useState } from 'react';
import './Container.css';
import { deleteTask, updateTask } from '../../network/Network';
import { useDispatch } from 'react-redux';
import { fetchTasksData } from '../../redux/slice/AllTaskListSlice';

const TaskContainer = ({
  id,
  title: initialTitle,
  description: initialDescription,
  isCompleted: isCompleted,
  createdAt: initialCreatedAt,
}) => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(isCompleted);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editedTaskId, setEditedTaskId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState(initialTitle);
  const [updatedDescription, setUpdatedDescription] =
    useState(initialDescription);

  const handleCheckboxChange = async () => {
    setIsChecked(true);
    try {
      await updateTask(id, {
        isCompleted: isChecked === true ? false : true,
      });
      dispatch(fetchTasksData());
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteDialog(false);
  };

  const handleEditClick = (taskId, title, description) => {
    setShowEditDialog(true);
    setEditedTaskId(taskId);
    setUpdatedTitle(title);
    setUpdatedDescription(description);
  };

  const handleCancelEdit = () => {
    setEditedTaskId(null);
    setUpdatedTitle(initialTitle);
    setUpdatedDescription(initialDescription);
    setShowEditDialog(false);
  };

  const handleUpdateTask = async () => {
    try {
      await updateTask(editedTaskId, {
        title: updatedTitle,
        description: updatedDescription,
        isCompleted: isChecked,
      });
      dispatch(fetchTasksData());
      handleCancelEdit();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask(id);
      dispatch(fetchTasksData());
      setShowDeleteDialog(false);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className={`container ${isChecked ? 'checked' : ''}`}>
      {showDeleteDialog && (
        <div className="dialog">
          <div className="dialogContent">
            <p>Are you sure you want to delete?</p>
            <button onClick={handleDeleteTask}>Delete</button>
            <button onClick={handleCancelDelete}>Cancel</button>
          </div>
        </div>
      )}

      {showEditDialog && (
        <div className="dialog">
          <div className="dialogContent">
            Title
            <input
              type="text"
              title="Title"
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            Description
            <input
              type="text"
              title="Description"
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
            />
            <button onClick={handleUpdateTask}>Edit</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        </div>
      )}

      <div className="row">
        <input
          type="checkbox"
          className="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <div className={`content ${isChecked ? 'checkedContent' : ''}`}>
          <div className={`title ${isChecked ? 'checkedTitle' : ''}`}>
            {initialTitle}
          </div>
          <div className="createdAt">{initialCreatedAt}</div>
        </div>
        <button
          className="actionButton"
          onClick={() => handleEditClick(id, initialTitle, initialDescription)}
        >
          Edit
        </button>
        <button className="actionButton" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

const App = ({ data }) => {
  return (
    <div>
      {data?.map((item) => (
        <TaskContainer
          key={item.id}
          id={item.originalId}
          title={item.title}
          description={item.description}
          isCompleted={item?.isCompleted}
          createdAt={item.createdAt}
        />
      ))}
    </div>
  );
};

export default App;
