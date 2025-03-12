import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {useNavigate, Link} from 'react-router-dom';
import {TaskContext} from '../Context/TaskContext'

const SignUp = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [name, setName] = useState('');

 const {signUpUser,users} = useContext(TaskContext);
 const navigate = useNavigate()

    const handlesubmit =(e) =>{
    e.preventDefault();

    const existingUser = users.find((u) => u.email === email);

    if (existingUser) {
      alert("User already registered. Please log in.");
      navigate("/"); // Redirect to login page
      return;
    }

    const useData = {email, password, name};
    signUpUser(useData);
    navigate('/dashboard')
    }


  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #ff9a9e, #fad0c4, #ffdde1)",
      }}
    >
      <div className="card p-4 shadow-lg rounded" style={{ width: "400px", backgroundColor: "#fff" }}>
        <h3 className="text-center text-dark fw-bold">Sign Up</h3>
        <p className="text-center text-muted">Create your account</p>

        <form onSubmit={handlesubmit}>
          <div className="mb-3" >
            <input value={name} onChange= {(e) => setName(e.target.value)} type="text" className="form-control" placeholder="Full Name" required/>
          </div>
          <div className="mb-3">
            <input value={email} onChange= {(e) => setEmail(e.target.value) } type="email" className="form-control" placeholder="Email" required/>
          </div>
          <div className="mb-3">
            <input value={password} onChange= {(e) => setPassword(e.target.value) } type="password" className="form-control" placeholder="Password" required/>
          </div>
          <button className="btn btn-primary w-100">Sign Up</button>
        </form>
        <div className="text-center mt-3">
          <p>
            Already have an account? <Link to="/">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
