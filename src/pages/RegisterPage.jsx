import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../auth";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ROLE_USER");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const success = await register(username, password, role);
    if (success) {
      navigate("/login");
    } else {
      setError("Registration failed");
    }
  };

  return (
 


        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
           <h2 className="font-bold text-center text-4xl">Register</h2>
          <form action="#" method="POST" className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="username"
                  onChange={(e) => setUsername(e.target.value)}  
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 border-2 border-gray-400 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-2 border-gray-400 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
              </div>
            </div>
            <div>
                <div className="flex items-center justify-between">
                 <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="ROLE_USER">User</option>
        <option value="ROLE_ADMIN">Admin</option>
      </select>
      </div>
            </div>

            <div>
              <button
                type="submit" 
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
                  {error && <p style={{ color: "red" }}>{error}</p>}
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            You have an account?
            <button onClick={()=> navigate('/login')} className="font-semibold text-indigo-600 hover:text-indigo-500">
              Login
            </button>
          </p>
        </div>
  );
};

export default RegisterPage;