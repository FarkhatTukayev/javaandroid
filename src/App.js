import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import TaskList from "./TaskList";
import EditTask from "./EditTask";

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<TaskList tasks={tasks} setTasks={setTasks} setSelectedTask={setSelectedTask} />}
        />
        <Route
          path="/edit"
          element={
            <EditTask
              task={selectedTask}
              setTasks={setTasks}
              tasks={tasks}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
