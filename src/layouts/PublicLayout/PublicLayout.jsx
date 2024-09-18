"use client";
import React, { Children } from "react";
import styles from "./PublicLayout.module.css";

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/Navbar/Navbar";

const PublicLayout = () => {
  const { isLogged } = useAuth();

  if (isLogged) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

PublicLayout.propTypes = {};

export default PublicLayout;
