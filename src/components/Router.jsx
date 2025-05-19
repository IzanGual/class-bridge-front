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
import CoursePageEdit from "../classPages/CoursePageEdit/CoursePageEdit";
import UserPage from "../classPages/UserPage/UserPage";
import DeliverPage from "../classPages/DeliverPage/DeliverPage";
import ConfigPage from "../classPages/ConfigPage/ConfigPage";
import GualiPage from "../classPages/GualiPage/GualiPage";
import ClassNavigator from "../classComponents/ClassNavigator/ClassNavigator";
import CoursePageCreate from "../classPages/CoursePageCreate/CoursePageCreate";
import UserPageCreate from "../classPages/UserPageCreate/UserPageCreate";
import UserPageEdit from "../classPages/UserPageEdit/UserPageEdit";
import DeliverPageCorrect from "../classPages/DeliverPageCorrect/DeliverPageCorrect";
import AulaColorProvider from "../utils/AulaColorProvider";

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
              <Route path="" element={<ClassLoginPage aulaInfo ={aula} aulaID={aula.id} />} />

              {/* Subrutas con barra de navegación */}
              <Route
                path="*"
                element={
                  <>
                    <AulaColorProvider color={aula.color} /> {/* ← Aplica el color */}
                    <ClassNavigator aula={aula} />
                    <Routes>
                      <Route path="dashboard/home" element={<HomePage aula={aula} />} />
                      <Route path="dashboard/courses" element={<CoursePage aula={aula} />} />
                      <Route path="dashboard/courses/edit" element={<CoursePageEdit aula={aula} />} />
                      <Route path="dashboard/courses/create" element={<CoursePageCreate aula={aula}/>} />
                      <Route path="dashboard/users" element={<UserPage aula={aula} />} />
                      <Route path="dashboard/users/create" element={<UserPageCreate aula={aula}/>} />
                      <Route path="dashboard/users/edit" element={<UserPageEdit aula={aula}/>} />
                      <Route path="dashboard/tasks" element={<DeliverPage aula={aula} />} />
                      <Route path="dashboard/tasks/correct" element={<DeliverPageCorrect aula={aula}/>} />
                      <Route path="dashboard/config" element={<ConfigPage aula={aula} />} />
                      <Route path="guali" element={<GualiPage aula={aula}/>} />
                      <Route path="*" element={<NotFoundPage />} />
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
