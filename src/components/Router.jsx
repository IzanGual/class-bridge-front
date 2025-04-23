import React from "react";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import LandingPage from "../pages/LandingPage/LandingPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import PlanSelectionPage from "../pages/PlanSelectionPage/PlanSelectionPage";
import PrivacyPage from "../pages/PrivacyPage/PrivacyPage";
import AulasModel from "../models/AulasModel";
import ProtectedRoute from "../utils/ProtectedRoute";
import OrderCompleted from "../pages/OrderCompleted/OrderCompleted";
import ContactPage from "../pages/ContactPage/ContactPage";
import TutorialPage from "../pages/TutorialPage/TutorialPage";
import ClassLoginPage from "../classPages/ClassLoginPage/ClassLoginPage";
import HomePage from "../classPages/HomePage/HomePage";
import CoursePage from "../classPages/CoursePage/CoursePage";
import UserPage from "../classPages/UserPage/UserPage";
import DeliverPage from "../classPages/DeliverPage/DeliverPage";
import ConfigPage from "../classPages/ConfigPage/ConfigPage";
import ClassNavigator from "../classComponents/ClassNavigator/ClassNavigator";

export default function Router() {
  const [aulas, setAulas] = useState([]);

  useEffect(() => {
    const fetchAulas = async () => {
      try {
        const data = await AulasModel.getAllAulas();
        setAulas(data);
        console.log("AULAS:", data);
      } catch (error) {
        console.error("Error al obtener los aulas:", error);
      }
    };

    fetchAulas();
  }, []);

  return (
    <Routes>
      {ROUTE_LIST.map(({ title, path, element, isProtected }) => (
        <Route
          key={title}
          path={`/${path}`}
          element={isProtected ? <ProtectedRoute>{element}</ProtectedRoute> : element}
        />
      ))}

      {/* Rutas dinámicas para aulas */}
      {aulas.map((aula) => (
        <Route
          key={aula.id}
          path={`/bridgeto/${aula.nombre}/*`}
          element={
            <Routes>
              {/* Ruta para el inicio de sesión */}
              <Route path="" element={<ClassLoginPage aulaID={aula.id} />} />

              {/* Subrutas con barra de navegación */}
              <Route
                path="*"
                element={
                  <>
                    <ClassNavigator aula={aula} />
                    <Routes>
                      <Route path="dashboard/home" element={<HomePage aula={aula} />} />
                      <Route path="dashboard/courses" element={<CoursePage aula={aula} />} />
                      <Route path="dashboard/users" element={<UserPage aula={aula} />} />
                      <Route path="dashboard/tasks" element={<DeliverPage aula={aula} />} />
                      <Route path="dashboard/config" element={<ConfigPage aula={aula} />} />
                    </Routes>
                  </>
                }
              />
            </Routes>
          }
        />
      ))}


      {/* Página 404 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

class RoutePage {
  constructor(title, path, element, isProtected = false) {
    this.title = title;
    this.path = path;
    this.element = element;
    this.isProtected = isProtected;
  }
}

const ROUTE_LIST = [
  new RoutePage("home", "", <LandingPage />),
  new RoutePage("register", "register", <RegisterPage />),
  new RoutePage("login", "login", <LoginPage />),
  new RoutePage("myprofile", "myprofile", <ProfilePage />, true),
  new RoutePage("planSelection", "planSelection", <PlanSelectionPage />, true),
  new RoutePage("orderCompleted", "orderCompleted", <OrderCompleted />, true),
  new RoutePage("privacy", "privacy", <PrivacyPage />),
  new RoutePage("contact", "contact", <ContactPage />),
  new RoutePage("tutorial", "tutorial", <TutorialPage />),
];
