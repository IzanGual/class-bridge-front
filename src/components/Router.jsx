import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import LandingPage from "../pages/LandingPage/LandingPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import ProtectedRoute from "../utils/ProtectedRoute";

export default function Router() {
    const pageRoutes = ROUTE_LIST.map(({ title, path, element, isProtected }) => {
        return (
            <Route 
                key={title} 
                path={`/${path}`} 
                element={isProtected ? <ProtectedRoute>{element}</ProtectedRoute> : element} 
            />
        );
    });

    return <Routes>{pageRoutes}</Routes>;
}

/**
 * Clase para estructurar las rutas
 */
class RoutePage {
    title;
    path;
    element;
    isProtected; // ✅ Nuevo parámetro para saber si la ruta está protegida

    constructor(title, path, element, isProtected = false) {
        this.title = title;
        this.path = path;
        this.element = element;
        this.isProtected = isProtected;
    };
}

/**
 * Lista de rutas
 */
const ROUTE_LIST = [
    new RoutePage("404", "*", <NotFoundPage/> ),
    new RoutePage("home", "", <LandingPage/>),
    new RoutePage("register", "register", <RegisterPage/>),
    new RoutePage("login", "login", <LoginPage/>),
    new RoutePage("myprofile", "myprofile", <ProfilePage/>, true) // ✅ Ahora es protegida
];