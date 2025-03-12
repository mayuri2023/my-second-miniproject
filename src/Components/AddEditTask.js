import React, { useContext, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useParams } from "react-router-dom";
import { TaskContext } from "../Context/TaskContext";

const AddEditTask = () => {
  // Accessing context for task management functions
  const { addTask, editTask, tasks } = useContext(TaskContext);

  // State for task properties
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Low");
  const [deadline, setDeadline] = useState("");
  const [reminder, setReminder] = useState("");

  const { id } = useParams(); // URL parameter for task ID
  const navigate = useNavigate(); // Hook for navigation

  // Effect hook to load task details if editing
  useEffect(() => {
    if (id) {
      const taskToEdit = tasks.find((task) => task.id === id);
      if (taskToEdit) {
        setTitle(taskToEdit.title);
        setDescription(taskToEdit.description);
        setCategory(taskToEdit.category);
        setPriority(taskToEdit.priority);
        setDeadline(taskToEdit.deadline);
        setReminder(taskToEdit.reminder);
      }
    }
  }, [id, tasks]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { id: id || Date.now().toString(), title, description, category, priority, deadline, reminder };
    if (id) {
      editTask(id, newTask);
    } else {
      addTask(newTask);
    }
    navigate("/dashboard");
  };

  return (
    <div
      className="w-100 min-vh-100 p-4 d-flex justify-content-center align-items-start"
      style={{
        background: "linear-gradient(135deg, #B0BEC5, #ECEFF1)",
      }}
    >
      <div
        className="card p-4 shadow rounded"
        style={{ width: "40%", backgroundColor: "#CFD8DC", border: "2px solid #607D8B" }}
      >
        <h4 className="text-center fw-bold mb-3 text-dark">{id ? "Edit Task" : "Add New Task"}</h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3 d-flex align-items-center">
            <label className="form-label w-25 fw-semibold text-dark">Title:</label>
            <input type="text" className="form-control border-dark bg-light" placeholder="Enter task title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>

          <div className="mb-3 d-flex align-items-center">
            <label className="form-label w-25 fw-semibold text-dark">Description:</label>
            <textarea className="form-control border-dark bg-light" rows="2" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
          </div>

          <div className="mb-3 d-flex align-items-center">
            <label className="form-label w-25 fw-semibold text-dark">Category:</label>
            <select className="form-select border-dark bg-light" value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Select</option>
              <option value="work">Work</option>
              <option value="personal">Personal</option>
              <option value="meeting">Meeting</option>
            </select>
          </div>

          <div className="mb-3 d-flex align-items-center">
            <label className="form-label w-25 fw-semibold text-dark">Priority:</label>
            <select className="form-select border-dark bg-light" value={priority} onChange={(e) => setPriority(e.target.value)} required>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="mb-3 d-flex align-items-center">
            <label className="form-label w-25 fw-semibold text-dark">Deadline:</label>
            <input type="date" className="form-control border-dark bg-light" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
          </div>

          <div className="mb-3 d-flex align-items-center">
            <label className="form-label w-25 fw-semibold text-dark">Reminder:</label>
            <input type="datetime-local" className="form-control border-dark bg-light" value={reminder} onChange={(e) => setReminder(e.target.value)} />
          </div>

          <div className="d-flex justify-content-between mt-3">
            <button type="submit" className="btn btn-primary w-45">{id ? "Update Task" : "Add Task"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEditTask;
