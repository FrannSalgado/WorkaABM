"use client";
import React, { useState } from "react";
import "./LoginPage.css";
import { useForm } from "../../hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3000/admins?user=${values.email}`
      );
      const admins = await response.json();

      if (admins.length === 0) {
        setError("Usuario no encontrado");
        return;
      }

      const admin = admins[0];

      if (admin.password !== values.password) {
        setError("Contraseña incorrecta");
        return;
      }

      login();
      localStorage.setItem("token", "admin-auth-token");
      navigate("/home");
    } catch (error) {
      console.error("Error durante la autenticación", error);
      setError("Error al iniciar sesión");
    }
  };

  const { values, handleChange, handleSubmit } = useForm(
    {
      email: "",
      password: "",
    },
    () => {},
    submitForm
  );

  return (
    <div className="loginpage">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={values.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
