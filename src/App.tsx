import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm/LoginForm.tsx";
import RegisterForm from "./components/RegisterForm/RegisterForm.tsx";
import Users from "./components/Users/Users.tsx";
import type { UsersApiType } from "./types/zodTypes";
import { AppContextProvider } from "./api/context/context.ts";
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { usersAPI } from "./api/axios/users-api";

function App() {
  const [users, setUsers] = useState<UsersApiType[]>([]);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [userId, setUserId] = useState<number[]>([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await usersAPI.getUsers();
        if (response.data && Array.isArray(response.data.data)) {
          setUsers(response.data.data);
        }
      } catch (error) {
        console.error("Failed to load users:", error);
      }
    };

    loadUsers();
  }, []);

  return (
    <BrowserRouter>
      <AppContextProvider
        value={{
          users,
          setUsers,
          authenticated,
          setAuthenticated,
          userId,
          setUserId,
        }}
      >
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <Users />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AppContextProvider>
    </BrowserRouter>
  );
}

export default App;
