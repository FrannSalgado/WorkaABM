import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmpleadoForm from "../../components/EmpleadoForm/EmpleadoForm";

const CargarEmpleadosPage = () => {
  const navigate = useNavigate();
  const [nuevoEmpleado, setNuevoEmpleado] = useState({
    name: "",
    email: "",
    phone: "",
    especialidad: "",
    disponibilidad: true, // Valor inicial por defecto
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoEmpleado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/empleados", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoEmpleado), // Envía los datos del nuevo empleado
    })
      .then((response) => response.json())
      .then(() => {
        alert("Empleado creado correctamente");
        navigate("/empleados");
      })
      .catch((error) => console.error("Error al crear empleado:", error));
  };

  const toggleDisponibilidad = () => {
    setNuevoEmpleado((prev) => ({
      ...prev,
      disponibilidad: !prev.disponibilidad, // Cambia la disponibilidad cuando se haga clic
    }));
  };

  return (
    <div>
      <h1>Nuevo Empleado</h1>
      <EmpleadoForm
        editableEmpleado={nuevoEmpleado}
        handleSubmit={handleCreate}
        handleChange={handleChange}
        toggleDisponibilidad={toggleDisponibilidad}
        isEdit={false} // Indica que es creación, no edición
        cancelAction={() => navigate("/empleados")} // Navega de vuelta a empleados si se cancela
      />
    </div>
  );
};
export default CargarEmpleadosPage;
