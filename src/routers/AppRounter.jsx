import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  EmpleadosPage,
  HomePage,
  LoginPage,
  CargarEmpleadosPage,
  EmpleadoDetailsPage,
} from "../pages";
import PublicLayout from "../layouts/PublicLayout/PublicLayout";
import PrivateLayout from "../layouts/PrivateLayout/PrivateLayout";
import PrivateRoute from "./PrivateRoute";
import Footer from "../components/Footer/Footer";

const AppRounter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route path="/" element={<LoginPage />} />
        </Route>

        <Route
          path="/"
          element={
            <PrivateRoute>
              <PrivateLayout />
            </PrivateRoute>
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/empleados" element={<EmpleadosPage />} />
          <Route path="/empleados/:id" element={<EmpleadoDetailsPage />} />
          <Route path="/nuevo-empleado" element={<CargarEmpleadosPage />} />
        </Route>
        <Route
          path="*"
          element={
            <>
              <h1>404 Not Found</h1>
            </>
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
};

export default AppRounter;
