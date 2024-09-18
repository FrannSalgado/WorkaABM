"use client";
import React from "react";
import styles from "./Navbar.module.css";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import logo from "../../assets/logo/logo.png";

const Navbar = () => {
  const { isLogged, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} alt="Logo" className={styles.logoIcon}></img>
        <Link to="/">Work and Working</Link>
      </div>
      <ul className={styles.navLinks}>
        {isLogged ? (
          <>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/empleados">Empleados</Link>
            </li>
            <li>
              <button onClick={logout} className={styles.logoutButton}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/">Login</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
