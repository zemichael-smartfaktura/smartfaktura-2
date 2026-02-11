import { ProtectedLayout, fallbackTo, protectedRoutes, publicRoutes } from "@/routes";
import { Navigate, Route, Routes } from "react-router-dom";

export default function App() {
  return (
    <Routes>
      {publicRoutes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
      <Route element={<ProtectedLayout />}>
        {protectedRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
      <Route path="*" element={<Navigate to={fallbackTo} replace />} />
    </Routes>
  );
}
