import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function EditTask({ task, tasks, setTasks }) {
  const [editedTask, setEditedTask] = useState({ ...task });
  const navigate = useNavigate();

  const handleSave = () => {
    const updatedTasks = tasks.map((t) =>
      t.date === task.date ? editedTask : t
    );
    setTasks(updatedTasks);
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Edit Task</h1>
      <div className="edit-form">
        <input
          type="text"
          value={editedTask.text}
          onChange={(e) => setEditedTask({ ...editedTask, text: e.target.value })}
          className="input"
        />
        <textarea
          value={editedTask.description}
          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          className="textarea"
        ></textarea>
        <p><strong>Created:</strong> {editedTask.date}</p>
        <div className="modal-buttons">
          <button className="save-button" onClick={handleSave}>Save</button>
          <button className="cancel-button" onClick={() => navigate("/")}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default EditTask;
