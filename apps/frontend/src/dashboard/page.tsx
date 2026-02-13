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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {session?.user && (
        <div className="space-y-4">
          <p>
            Signed in as <strong>{session.user.email}</strong>
          </p>
          {session.session?.activeOrganizationId && (
            <p>
              Active Organization: <code>{session.session.activeOrganizationId}</code>
            </p>
          )}
          <button
            type="button"
            onClick={signOut}
            className="text-primary underline underline-offset-4 hover:text-primary/80"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
