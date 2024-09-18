import React from "react";
import { Link } from "react-router-dom";
import styles from "./EmpleadoCard.module.css";

const EmpleadoCard = ({ empleado }) => {
  return (
    <div className={styles.card}>
      <div className={styles.status}>
        <span
          className={`${styles.statusCircle} ${
            JSON.parse(empleado.disponibilidad) ? styles.green : styles.red
          }`}
        ></span>
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.name}>{empleado.name}</h3>
        <p className={styles.email}>{empleado.email}</p>
      </div>
      <div className={styles.cardActions}>
        <Link to={`/empleados/${empleado.id}`} className={styles.detailsButton}>
          Detalles
        </Link>
      </div>
    </div>
  );
};

export default EmpleadoCard;
