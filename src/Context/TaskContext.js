import React, { createContext, useState, useEffect } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({children}) =>{

    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
    const [user , setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
    const [users , setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);

    useEffect(() =>{
        localStorage.setItem('tasks', JSON.stringify(tasks))
    },[tasks]);

    useEffect(() =>{
        localStorage.setItem('user', JSON.stringify(user))
    },[user]);
    

    useEffect(() =>{
        localStorage.setItem('users', JSON.stringify(users))
    },[users]);


    const addTask =(task) =>{
        setTasks([...tasks, task])
    }


    const editTask = (id, updatedTask) => {
        setTasks(tasks.map(task => task.id === id ? updatedTask : task))
    }


    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id))
    }


    const signUpUser = (userData) =>{
        setUsers([...users, userData]);
        setUser(userData)
    }


    const loginUser =(email, password) =>{
        const foundUser = users.find(user => user.email === email && user.password === password)
        if(foundUser){
           setUser(foundUser);
           return true
        }else{
            return false
        }
    }

    const logoutUser =() =>{
        setUser(null);
    }
    

    return (
        <TaskContext.Provider value={{tasks, addTask, editTask, deleteTask, user,users, loginUser, signUpUser, logoutUser}}>
            {children}
        </TaskContext.Provider>
    );
}
