import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { TaskContext } from "../Context/TaskContext";

const Dashboard = () => {
  const navigate = useNavigate();
  const { tasks, logoutUser, deleteTask } = useContext(TaskContext);

  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterDeadline, setFilterDeadline] = useState("");

  // Logout function
  const handleLogout = () => {
    logoutUser(); // Clear user session
    navigate("/"); // Redirect to login page
  };

  // Filtering tasks based on user input
  const filteredTasks = tasks.filter((task) =>
    (searchQuery === "" || task.title.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (filterCategory === "" || task.category === filterCategory) &&
    (filterPriority === "" || task.priority === filterPriority) &&
    (filterDeadline === "" || task.deadline === filterDeadline)
  );

  return (
    <div
      className="w-100 min-vh-100 p-4 d-flex flex-column align-items-center"
      style={{
        background: "linear-gradient(135deg, #ff758c, #ff7eb3, #ff9a9e, #fad0c4)",
      }}
    >
      {/* Card for Filters and Controls */}
      <div className="card p-4 shadow-lg rounded w-75 mb-4">
        <h3 className="text-dark fw-bold text-center mb-3">Dashboard</h3>

        <div className="d-flex flex-wrap gap-3 justify-content-center">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            style={{ width: "18%" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="form-select"
            style={{ width: "18%" }}
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="">Category</option>
            <option value="work">Work</option>
            <option value="personal">Personal</option>
            <option value="meeting">Meeting</option>
          </select>
          <select
            className="form-select"
            style={{ width: "18%" }}
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="">Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <input
            type="date"
            className="form-control"
            style={{ width: "18%" }}
            value={filterDeadline}
            onChange={(e) => setFilterDeadline(e.target.value)}
          />
          <button className="btn btn-success px-4" onClick={() => navigate("/add")}>
            Add Task
          </button>
          <button className="btn btn-danger px-4" onClick={handleLogout}>
            LogOut
          </button>
        </div>
      </div>

      {/* Task List */}
      <div className="w-75">
        {filteredTasks.length === 0 ? (
          <div className="text-center p-4 bg-light rounded shadow-sm">
            <h5 className="text-muted">No tasks available.</h5>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="card mb-3 shadow-sm p-3">
              <div className="d-flex justify-content-between align-items-center">
                {/* Task Content */}
                <div className="text-start" style={{ flex: 1, minWidth: "70%" }}>
                  <h5 className="fw-bold text-dark">{task.title}</h5>
                  <p className="mb-1 text-break">{task.description}</p>
                  <small className="text-muted">
                    Category: {task.category} | Priority: {task.priority} | Deadline: {task.deadline}
                  </small>
                </div>

                {/* Action Buttons */}
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-primary" onClick={() => navigate(`/edit/${task.id}`)}>
                    Edit
                  </button>
                  <button className="btn btn-outline-danger" onClick={() => deleteTask(task.id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
