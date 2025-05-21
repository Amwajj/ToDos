import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Image } from 'antd';

import Sidebar from './components/Sidebar';
import TaskTable from './components/TaskTable';
import CalendarPage from './components/CalendarPage';


import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Unauthorized from './pages/Unauthorized';

import PrivateRoute from './components/Login/PrivateRoute';
import AdminRoute from './components/Login/AdminRoute';
import UserTasks from './components/UserTasks';
import { logout } from './auth';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleEditClick = (task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <BrowserRouter>
      {/* Header */}
      <header className="px-5 py-3 w-full shadow-sm font-work-sans z-0">
        <nav className="flex justify-between items-center">
          <Image src="/3.png" alt="logo" width={80} height={30} />
          <div className="flex items-center space-x-10 gap-8 text-blue-950">
            <button
              onClick={handleLogout}
              className="bg-violet-500 hover:bg-violet-600 text-white font-semibold py-2 px-4 border border-purple-500 rounded"
            >
              Logout
            </button>
          </div>
        </nav>
      </header>

  
      <div className="flex">
        <Sidebar isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} selectedTask={selectedTask} />

        <Routes>
        
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          
          <Route
            path="/UserTasks"
            element={
              <PrivateRoute>
                <UserTasks />
              </PrivateRoute>
            }
          />
         
          <Route
            path="/tasks"
            element={
              <AdminRoute>
              <PrivateRoute>
                <TaskTable onEditClick={handleEditClick} />
              </PrivateRoute>
              </AdminRoute>
            }
          />
       
          <Route
            path="/calendar"
            element={
              <PrivateRoute>
                <CalendarPage />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;