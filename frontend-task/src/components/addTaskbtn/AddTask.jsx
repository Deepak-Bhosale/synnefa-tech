import React, { useState } from 'react';
import './AddTask.css';

function AddTask({
  newTaskTitle,
  newTaskDescription,
  setNewTaskTitle,
  setNewTaskDescription,
  handleCreateTask,
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewTaskTitle('');
    setNewTaskDescription('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
  };

  return (
    <div className="dialog-container">
      <button className="open-button" onClick={handleClickOpen}>
        Add Task
      </button>
      {open && (
        <div className="dialog">
          <div className="dialogContent">
          <form onSubmit={handleSubmit}>
              <h2 className="dialog-title">Create Your Task Here</h2>
              <div className="form-fields">
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                />
              </div>
              <div className="dialog-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={handleClose}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={newTaskTitle === '' && newTaskDescription === ''}
                  className="save-button"
                  style={{ backgroundColor: 'lightgreen' }}
                  onClick={handleCreateTask}
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTask;
