import Dashboard from "@/dashboard/page";
import Login from "@/login/page";
import Register from "@/register/page";
import ProtectedLayout from "./ProtectedLayout";
import { PATHS } from "./paths";

export { ProtectedLayout };

export const publicRoutes = [
  { path: PATHS.login, element: <Login /> },
  { path: PATHS.register, element: <Register /> },
] as const;

export const protectedRoutes = [
  { path: PATHS.home, element: <Dashboard /> },
  { path: PATHS.dashboard, element: <Dashboard /> },
] as const;

export const fallbackTo = PATHS.home;
