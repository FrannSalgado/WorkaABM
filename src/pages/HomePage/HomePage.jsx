"use client";
import React from "react";
import styles from "./HomePage.module.css";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.content}>
        <h1>Bienvenidos a Work and Working</h1>
        <p>
          Work and Working es una plataforma dedicada a la gestión de empleados
          activos e inactivos. Nuestro objetivo es registrar empleados por una
          mensualidad y ofrecerles nuevas oportunidades laborales.
        </p>

        <div className={styles.ctaSection}>
          <h2>¡Okey, comencemos!</h2>
          <div className={styles.buttons}>
            <Link to="/nuevo-empleado" className={styles.button}>
              Cargar Empleados
            </Link>
            <Link to="/empleados" className={styles.button}>
              Ver Empleados
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
