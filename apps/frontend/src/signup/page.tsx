import { AppLogo } from "@/components/app-logo";
import { PATHS } from "@/routes/paths";
import { Link } from "react-router-dom";
import { SignupForm } from "./signup-form.tsx";

export default function Signup() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6 md:max-w-4xl">
        <Link
          to={PATHS.home}
          className="flex items-center gap-2 self-center font-medium text-foreground"
        >
          <AppLogo className="size-8 shrink-0" />
          SmartFaktura
        </Link>
        <SignupForm />
      </div>
    </div>
  );
}
