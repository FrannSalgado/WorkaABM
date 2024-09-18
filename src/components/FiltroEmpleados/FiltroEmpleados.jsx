import React from "react";
import styles from "./FiltroEmpleados.module.css";

const FiltroEmpleados = ({ filtroActual, onFiltroChange }) => {
  return (
    <div className={styles.filtroContainer}>
      <label>
        <input
          type="radio"
          value="todos"
          checked={filtroActual === "todos"}
          onChange={(e) => onFiltroChange(e.target.value)}
        />
        Todos
      </label>
      <label>
        <input
          type="radio"
          value="disponibles"
          checked={filtroActual === "disponibles"}
          onChange={(e) => onFiltroChange(e.target.value)}
        />
        Disponibles
      </label>
      <label>
        <input
          type="radio"
          value="ocupados"
          checked={filtroActual === "ocupados"}
          onChange={(e) => onFiltroChange(e.target.value)}
        />
        Ocupados
      </label>
    </div>
  );
};

export default FiltroEmpleados;
