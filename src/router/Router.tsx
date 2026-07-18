import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute";

import AboutPage from "../pages/AboutPage";
import ContactPage from "../pages/ContactPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PageNotFound from "../pages/PageNotFound";
import RegisterPage from "../pages/RegisterPage";
import TaskPage from "../pages/TaskPage";

import ROUTES from "./routes";

function Router() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.ABOUT} element={<AboutPage />} />
      <Route path={ROUTES.CONTACT} element={<ContactPage />} />
      <Route
        path={`${ROUTES.TASK_PAGE}:id`}
        element={
          <ProtectedRoute>
            <TaskPage />
          </ProtectedRoute>
        }
      />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default Router;