"use client";
import React, { Children } from "react";
import styles from "./PrivateLayout.module.css";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const PrivateLayout = () => {
  return (
    <>
      <Navbar />
      <main className={styles.privatelayout}>
        <Outlet />
      </main>
    </>
  );
};

PrivateLayout.propTypes = {};

export default PrivateLayout;
