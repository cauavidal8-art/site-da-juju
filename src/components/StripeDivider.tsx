/** Faixa listrada bordô e branco usada como separador de seções. */
export function StripeDivider({ className = "" }: { className?: string }) {
  return (
    <div
      role="presentation"
      className={`listras h-4 w-full border-y-[3px] border-tinta ${className}`}
    />
  );
}
