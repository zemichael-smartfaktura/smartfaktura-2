import { useNavigate } from "react-router-dom";
import { authClient } from "../lib/auth-client";

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();

  async function signOut() {
    await authClient.signOut();
    navigate("/login", { replace: true });
  }

  return (
    <div style={{ padding: "1rem 2rem" }}>
      <h1>Dashboard</h1>
      {session?.user && (
        <p>
          Signed in as <strong>{session.user.email}</strong>
          {session.session?.activeOrganizationId && (
            <>
              {" "}
              · Org: <code>{session.session.activeOrganizationId}</code>
            </>
          )}
          {" · "}
          <button type="button" onClick={signOut}>
            Sign out
          </button>
        </p>
      )}
    </div>
  );
}
