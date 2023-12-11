import React, { useState } from 'react';
import './FilterTask.css';

function FilterTask({ handleChange, status }) {
  return (
    <div className="select-small-container">
      <select
        id="status"
        value={status}
        onChange={handleChange}
        className="select-small"
      >
        <option value="all">All </option>
        <option value="completed">Completed </option>
        <option value="incompleted">Incomplete </option>
      </select>
    </div>
  );
}

export default FilterTask;
