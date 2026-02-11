import { PATHS } from "@/routes/paths";
import { Link } from "react-router-dom";
import { SignupForm } from "./signup-form.tsx";

export default function Register() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6 md:max-w-4xl">
        <Link
          to={PATHS.home}
          className="flex items-center gap-2 self-center font-medium text-foreground"
        >
          <span className="bg-primary text-primary-foreground flex size-8 items-center justify-center rounded-md font-bold">
            S
          </span>
          SmartFaktura
        </Link>
        <SignupForm />
      </div>
    </div>
  );
}
