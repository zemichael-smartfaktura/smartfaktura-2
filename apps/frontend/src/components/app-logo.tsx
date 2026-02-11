import { Invoice03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function AppLogo({ className }: { className?: string }) {
  return (
    <span className={className} style={{ color: "var(--primary)" }} aria-hidden>
      <HugeiconsIcon icon={Invoice03Icon} size={32} />
    </span>
  );
}
