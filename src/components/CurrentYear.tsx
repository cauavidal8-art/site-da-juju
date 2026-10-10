"use client";

/** Ano atual do copyright. Fica dentro de <Suspense> para não congelar no build. */
export function CurrentYear() {
  return <span suppressHydrationWarning>{new Date().getFullYear()}</span>;
}
