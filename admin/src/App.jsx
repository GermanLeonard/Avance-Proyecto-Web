import React, { useContext } from "react";
import Login from "./pages/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AdminGeneralContext } from "./context/AdminGeneralContext";
import Sidebar from "./components/Sidebar";
import { Routes, Route, Navigate} from "react-router-dom";
import EstadisticasGeneral from "./pages/adminGeneral/EstadisticasGeneral";
import AgregarEmpleado from "./pages/adminGeneral/AgregarEmpleado";
import AgregarCancha from "./pages/adminGeneral/AgregarCancha";
import ListaTodasCanchas from "./pages/adminGeneral/ListaTodasCanchas";
import "./styles/Sidebar.css";
import VerReservas from "./pages/adminGeneral/VerReservas";
import { AdminSedeContext } from "./context/AdminSedeContext";

const App = () => {
  const { adminGeneralToken } = useContext(AdminGeneralContext);
  const { adminSedeToken } = useContext(AdminSedeContext);
  return (
    <div>
      <ToastContainer />
      <div className="admin-page">
        {adminGeneralToken || adminSedeToken ? (
          <>
            <Sidebar />
            <Routes>
              {/* Rutas para AdminGeneral */}
              {adminGeneralToken && (
                <>
                  <Route path="/admin-reservas" element={<VerReservas />} />
                  <Route
                    path="/admin-estadisticas"
                    element={<EstadisticasGeneral />}
                  />
                  <Route
                    path="/admin-agregar-empleado"
                    element={<AgregarEmpleado />}
                  />
                  <Route
                    path="/admin-agregar-cancha"
                    element={<AgregarCancha />}
                  />
                  <Route
                    path="/admin-lista-canchas"
                    element={<ListaTodasCanchas />}
                  />
                </>
              )}

              {/* Rutas para AdminSede */}
              {adminSedeToken && (
                <>
                  <Route
                    path="/admin-sede-reservas"
                    element={<VerReservas />}
                  />
                  <Route
                    path="/admin-sede-estadisticas"
                    element={<EstadisticasGeneral />}
                  />
                  <Route
                    path="/admin-sede-lista-canchas"
                    element={<ListaTodasCanchas />}
                  />
                </>
              )}

              {/* Redirección predeterminada en caso de token válido */}
              <Route
                path="*"
                element={
                  <Navigate
                    to={
                      adminGeneralToken
                        ? "/admin-reservas"
                        : "/admin-sede-reservas"
                    }
                  />
                }
              />
            </Routes>
          </>
        ) : (
          <Routes>
            {/* Redirigir al login si no hay token */}
            <Route path="*" element={<Login />} />
          </Routes>
        )}
      </div>
    </div>
  );
};

export default App;
