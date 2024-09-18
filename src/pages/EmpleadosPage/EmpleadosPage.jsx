"use client";
import styles from "./EmpleadosPage.module.css";
import React, { useState, useEffect } from "react";
import EmpleadoCard from "../../components/EmpleadoCard/EmpleadoCard";
import { FiltroEmpleados } from "../../components/FiltroEmpleados";

const EmpleadosPage = () => {
  const [empleados, setEmpleados] = useState([]);
  const [filtro, setFiltro] = useState("todos");

  useEffect(() => {
    fetch("http://localhost:3000/empleados")
      .then((response) => response.json())
      .then((data) => setEmpleados(data))
      .catch((error) => console.error("Error al obtener empleados:", error));
  }, []);

  const handleFiltroChange = (e) => {
    setFiltro(e.target.value);
  };

  const empleadosFiltrados = empleados.filter((empleado) => {
    if (filtro === "disponibles") {
      return JSON.parse(empleado.disponibilidad) === true;
    }
    if (filtro === "ocupados") {
      return JSON.parse(empleado.disponibilidad) === false;
    }
    return true;
  });
  return (
    <div className={styles.empleadosContainer}>
      <h1>Lista de Empleados</h1>

      <FiltroEmpleados filtroActual={filtro} onFiltroChange={setFiltro} />

      <div className={styles.empleadosList}>
        {empleadosFiltrados.map((empleado) => (
          <EmpleadoCard key={empleado.id} empleado={empleado} />
        ))}
      </div>
    </div>
  );
};

export default EmpleadosPage;
