import { authClient } from "@/lib/auth-client";
import { PATHS } from "@/routes/paths";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { data: session } = authClient.useSession();

  async function signOut() {
    await authClient.signOut();
    navigate(PATHS.login, { replace: true });
  }

  return (
    <div className="px-8 py-4">
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
