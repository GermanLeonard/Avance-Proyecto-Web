import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Register from "./pages/Register";
import Login from "./pages/Login";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Home from "./pages/Home";
import MisReservas from "./pages/MisReservas";
import Reserva from "./pages/Reserva";
import Navbar from "./components/Navbar";
import Cancha from "./pages/Cancha";
import Opciones from "./pages/Opciones";
import VerReservas from "./pages/VerReservas";
import AgregarEmpleado from "./pages/AgregarEmpleado";
import EliminarReservas from "./pages/EliminarReservas";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const location = useLocation();

  // Verificamos si estamos en la ruta de Opciones
  const isOpcionesPage = location.pathname.startsWith("/opciones");

  return (
    <div>
      <ToastContainer />
      {!isOpcionesPage && <Navbar />} {/* Ocultamos Navbar en /opciones */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mis-reservas" element={<MisReservas />} />
        <Route path="/reserva" element={<Reserva />} />
        <Route path="/reserva/:sucursal" element={<Reserva />} />
        <Route path="/cancha/:canchaId" element={<Cancha />} />
        <Route path="/opciones" element={<Opciones />}>
          <Route index element={<Navigate to="ver-reservas" replace />} />
          <Route path="ver-reservas" element={<VerReservas />} />
          <Route path="agregar-empleado" element={<AgregarEmpleado />} />
          <Route path="eliminar-reservas" element={<EliminarReservas />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;










