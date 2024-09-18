import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmpleadoForm from "../../components/EmpleadoForm/EmpleadoForm";

const EmpleadoDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [empleado, setEmpleado] = useState(null);
  const [editableEmpleado, setEditableEmpleado] = useState({
    name: "",
    email: "",
    phone: "",
    especialidad: "",
    disponibilidad: false,
  });

  useEffect(() => {
    fetch(`http://localhost:3000/empleados/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEmpleado(data);
        setEditableEmpleado(data);
      })
      .catch((error) =>
        console.error("Error al obtener detalles del empleado:", error)
      );
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableEmpleado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/empleados/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editableEmpleado),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Empleado actualizado correctamente");
        navigate("/empleados");
      })
      .catch((error) => console.error("Error al actualizar empleado:", error));
  };

  const handleDelete = () => {
    fetch(`http://localhost:3000/empleados/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("Empleado eliminado correctamente");
        navigate("/empleados");
      })
      .catch((error) => console.error("Error al eliminar empleado:", error));
  };

  const toggleDisponibilidad = () => {
    setEditableEmpleado((prev) => ({
      ...prev,
      disponibilidad: !prev.disponibilidad,
    }));
  };

  if (!empleado) {
    return <div>Cargando detalles del empleado...</div>;
  }

  return (
    <EmpleadoForm
      editableEmpleado={editableEmpleado}
      handleChange={handleChange}
      handleSubmit={handleUpdate}
      handleDelete={handleDelete}
      toggleDisponibilidad={toggleDisponibilidad}
      isEdit={true}
      cancelAction={() => navigate("/empleados")}
    />
  );
};

export default EmpleadoDetailsPage;
