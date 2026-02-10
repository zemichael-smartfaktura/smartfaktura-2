import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { authClient } from "../lib/auth-client";

export default function ProtectedLayout() {
  const navigate = useNavigate();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (isPending) return;
    if (!session?.user) {
      navigate("/login", { replace: true });
    }
  }, [session, isPending, navigate]);

  if (isPending) return <div style={{ padding: "2rem" }}>Loading…</div>;
  if (!session?.user) return null;

  return <Outlet />;
}
