import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import LandingPage from "../pages/LandingPage/LandingPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import LoginPage from "../pages/LoginPage/LoginPage";

/**
 * This Comopnent generates the Routes from a predetermined list defined in the same file (see below)
 * @returns 
 */
export default function Router() {

    const pageRoutes = ROUTE_LIST.map(({ title, path, element }) => {
        return <Route key={title} path={`/${path}`} element={element} />;
    });

    return (
        <>
            <Routes>{pageRoutes}</Routes>
        </>
    );
}

/**
 * Structure of a route
 */
class RoutePage {
    title;
    path;
    component;
    constructor(title, path, element) {
        this.title = title;
        this.path = path;
        this.element = element;
    };
}


/**
 * Routes used
 */
const ROUTE_LIST = [
    new RoutePage("404", "*", <NotFoundPage/> ),
    new RoutePage("home","", <LandingPage/>),
    new RoutePage("register","register", <RegisterPage/>),
    new RoutePage("login","login", <LoginPage/>),

];