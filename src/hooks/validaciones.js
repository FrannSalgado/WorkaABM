export const validateEmpleado = (values) => {
  let errors = {};

  // Validar nombre
  if (!values.name) {
    errors.name = "El nombre es requerido";
  } else if (!/^[A-Za-z\s]+$/.test(values.name)) {
    errors.name = "El nombre solo debe contener letras";
  }

  // Validar email
  if (!values.email) {
    errors.email = "El email es requerido";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "El email no es válido";
  }

  // Validar teléfono
  if (!values.phone) {
    errors.phone = "El teléfono es requerido";
  } else if (!/^\d+$/.test(values.phone)) {
    errors.phone = "El teléfono solo debe contener números";
  }

  return errors;
};
