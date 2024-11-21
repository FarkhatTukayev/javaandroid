import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function TaskList({ tasks, setTasks, setSelectedTask }) {
  const [currentTask, setCurrentTask] = useState({ text: "", description: "", date: "" });
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    if (!currentTask.text.trim()) return;

    const newTask = {
      ...currentTask,
      date: new Date().toLocaleString(),
    };

    setTasks([...tasks, newTask]);
    setCurrentTask({ text: "", description: "", date: "" });
    setModalVisible(false);
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleSortAlphabetically = () => {
    const sortedTasks = [...tasks].sort((a, b) => a.text.localeCompare(b.text));
    setTasks(sortedTasks);
  };

  const handleSortByDate = () => {
    const sortedTasks = [...tasks].sort((a, b) => new Date(b.date) - new Date(a.date));
    setTasks(sortedTasks);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    navigate("/edit");
  };

  return (
    <div className="container">
      <h1>Task Manager</h1>
      <div className="task-buttons">
        <button onClick={handleSortAlphabetically}>Sort Alphabetically</button>
        <button onClick={handleSortByDate}>Sort by Date</button>
      </div>
      <div className="task-list">
        {tasks.map((task, index) => (
          <div key={index} className="task-item">
            <div>
              <p className="task-text"><strong>Task:</strong> {task.text}</p>
              <p className="task-description"><strong>Description:</strong> {task.description}</p>
              <p className="task-date"><strong>Created:</strong> {task.date}</p>
            </div>
            <div className="task-buttons">
              <button className="edit-button" onClick={() => handleEdit(task)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDelete(index)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="add-button" onClick={() => setModalVisible(true)}>
        Add Task
      </button>

      {modalVisible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <input
              type="text"
              placeholder="Task Title"
              value={currentTask.text}
              onChange={(e) => setCurrentTask({ ...currentTask, text: e.target.value })}
              className="input"
            />
            <textarea
              placeholder="Task Description"
              value={currentTask.description}
              onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value })}
              className="textarea"
            ></textarea>
            <div className="modal-buttons">
              <button className="save-button" onClick={handleSave}>Save</button>
              <button
                className="cancel-button"
                onClick={() => {
                  setModalVisible(false);
                  setCurrentTask({ text: "", description: "", date: "" });
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;
