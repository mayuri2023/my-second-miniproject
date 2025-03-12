// import logo from './logo.svg';
import './App.css';
import { TaskProvider } from './Context/TaskContext';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import Dashboard from './Components/Dashboard';
import AddEditTask from './Components/AddEditTask';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add" element={<AddEditTask />} />
            <Route path="/edit/:id" element={<AddEditTask />} />
          </Routes>
        </Router>
      </TaskProvider>

    </div>
  );
}

export default App;
