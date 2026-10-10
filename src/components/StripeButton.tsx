import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type StripeButtonProps = Omit<ComponentProps<typeof Link>, "className"> & {
  children: ReactNode;
  variant?: "dark" | "light";
  className?: string;
};

/**
 * Botão grande e fácil de tocar. A "sombra" é um bloco listrado que aparece
 * por trás do botão; ele sobe no hover e afunda no toque.
 */
export function StripeButton({
  children,
  variant = "dark",
  className = "",
  ...props
}: StripeButtonProps) {
  const face =
    variant === "dark" ? "bg-tinta text-papel" : "bg-papel text-tinta";

  return (
    <span className={`relative inline-flex ${className}`}>
      <span
        aria-hidden="true"
        className="listras absolute inset-0 rounded-full border-[3px] border-tinta"
      />
      <Link
        {...props}
        className={`relative inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-full border-[3px] border-tinta px-7 text-base font-bold uppercase tracking-wider -translate-x-1 -translate-y-1 transition-transform duration-200 hover:-translate-x-2 hover:-translate-y-2 active:translate-x-0 active:translate-y-0 ${face}`}
      >
        {children}
      </Link>
    </span>
  );
}
