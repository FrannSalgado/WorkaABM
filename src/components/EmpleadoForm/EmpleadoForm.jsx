import React, { useState, useEffect } from "react";
import styles from "./EmpleadoForm.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { validateEmpleado } from "../../hooks/validaciones";

const EmpleadoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id; // Si hay id, es edición; si no hay, es creación
  const [empleado, setEmpleado] = useState(null);
  const [editableEmpleado, setEditableEmpleado] = useState({
    name: "",
    email: "",
    phone: "",
    especialidad: "",
    disponibilidad: false,
  });
  const [errors, setErrors] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (isEdit) {
      // Solo buscamos los datos si es edición
      fetch(`http://localhost:3000/empleados/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setEmpleado(data);
          setEditableEmpleado(data);
        })
        .catch((error) =>
          console.error("Error al obtener detalles del empleado:", error)
        );
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditableEmpleado((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleDisponibilidad = () => {
    setEditableEmpleado((prev) => ({
      ...prev,
      disponibilidad: !prev.disponibilidad,
    }));
  };

  const validateForm = () => {
    const validationErrors = validateEmpleado(editableEmpleado);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleUpdate = () => {
    if (validateForm()) {
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
        .catch((error) =>
          console.error("Error al actualizar empleado:", error)
        );
    }
  };

  const handleCreate = () => {
    if (validateForm()) {
      fetch(`http://localhost:3000/empleados`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editableEmpleado),
      })
        .then((response) => response.json())
        .then(() => {
          alert("Empleado creado correctamente");
          navigate("/empleados");
        })
        .catch((error) => console.error("Error al crear empleado:", error));
    }
  };

  const handleDeleteConfirm = () => {
    setConfirmDelete(true);
  };

  const cancelDelete = () => {
    setConfirmDelete(false);
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

  const handleCancel = () => {
    navigate("/empleados");
  };

  if (isEdit && !empleado) {
    return <div>Cargando detalles del empleado...</div>;
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h2>{isEdit ? "Detalles del Empleado" : "Nuevo Empleado"}</h2>
        <form>
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={editableEmpleado.name}
            onChange={handleChange}
            className={errors.name ? styles.inputError : ""}
          />
          {errors.name && <p className={styles.errorText}>{errors.name}</p>}

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={editableEmpleado.email}
            onChange={handleChange}
            className={errors.email ? styles.inputError : ""}
          />
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}

          <label>Teléfono</label>
          <input
            type="text"
            name="phone"
            value={editableEmpleado.phone}
            onChange={handleChange}
            className={errors.phone ? styles.inputError : ""}
          />
          {errors.phone && <p className={styles.errorText}>{errors.phone}</p>}

          <label>Especialidad</label>
          <input
            type="text"
            name="especialidad"
            value={editableEmpleado.especialidad}
            onChange={handleChange}
            className={errors.especialidad ? styles.inputError : ""}
          />
          {errors.especialidad && (
            <p className={styles.errorText}>{errors.especialidad}</p>
          )}

          <label>Disponibilidad</label>
          <div className={styles.sliderContainer}>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={editableEmpleado.disponibilidad}
                onChange={toggleDisponibilidad}
              />
              <span className={styles.slider}></span>
            </label>
            <span>
              {editableEmpleado.disponibilidad ? "Disponible" : "No disponible"}
            </span>
          </div>
        </form>

        <div className={styles.modalButtonsContent}>
          {isEdit ? (
            <>
              <button className={styles.save} onClick={handleUpdate}>
                Guardar Cambios
              </button>
              <button className={styles.danger} onClick={handleDeleteConfirm}>
                Eliminar Empleado
              </button>
            </>
          ) : (
            <button className={styles.save} onClick={handleCreate}>
              Crear Empleado
            </button>
          )}
          <button className={styles.cancel} onClick={handleCancel}>
            Cancelar
          </button>
        </div>
      </div>

      {confirmDelete && (
        <div className={styles.confirmOverlay}>
          <div className={styles.confirmDialog}>
            <p>¿Estás seguro de que deseas eliminar a este empleado?</p>
            <button onClick={handleDelete}>Sí, eliminar</button>
            <button onClick={cancelDelete}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpleadoForm;
