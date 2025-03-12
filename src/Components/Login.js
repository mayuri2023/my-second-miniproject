import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {TaskContext} from '../Context/TaskContext'
import {useNavigate, Link} from 'react-router-dom';



const Login = () => {
  const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('');
   

   const {loginUser} = useContext(TaskContext);
    const navigate = useNavigate()

    const handlesubmit = () =>{
      if(loginUser(email, password)){
        navigate('/dashboard')
      }else{
        setError('Invalid email or password' )
      }
    }
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #ff9a9e, #fad0c4, #fad0c4, #ffdde1)",
      }}
    >
      <div className="card p-4 shadow-lg rounded" style={{ width: "350px" }}>
        <h3 className="text-center text-dark">Welcome Back</h3>
        <p className="text-center text-muted">Please login to continue</p>
        
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value) } className="form-control" placeholder="Enter your email" required/>
          </div>

          <div className="mb-3">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value) } className="form-control" placeholder="Enter your password" required/>
          </div>

          <button className="btn btn-primary w-100">Login</button>
        </form>
        {error && <p>{error}</p>}
        <div className="text-center mt-3">
          <small>Don't have an account? <Link to="/signup">Sign In</Link></small>
        </div>
      </div>
    </div>
  );
};

export default Login;
