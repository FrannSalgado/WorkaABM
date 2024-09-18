"use client";
import React, { useEffect, useState } from "react";
import "./LoginPage.css";
import { useForm } from "../../hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const submitForm = (e) => {
    e.preventDefault();
    login();
    navigate("/home");
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
