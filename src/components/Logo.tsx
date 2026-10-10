import Link from "next/link";

type LogoProps = {
  className?: string;
  /** Versão clara para fundos escuros. */
  inverted?: boolean;
};

export function Logo({ className = "", inverted = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Juma Clube — página inicial"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span
        aria-hidden="true"
        className="listras-finas grid size-11 shrink-0 place-items-center rounded-full border-[3px] border-tinta transition-transform duration-300 group-hover:rotate-12"
      >
        <span className="grid size-6 place-items-center rounded-full bg-tinta font-display text-sm leading-none text-papel">
          J
        </span>
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={`font-display text-[1.65rem] uppercase tracking-tight ${inverted ? "text-papel" : "text-tinta"}`}
        >
          Juma Clube
        </span>
        <span
          className={`font-hand text-base leading-none ${inverted ? "text-rosa" : "text-bordo"}`}
        >
          Manaus, AM
        </span>
      </span>
    </Link>
  );
}
