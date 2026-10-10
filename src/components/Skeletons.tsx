/** Esqueletos exibidos enquanto uma página ainda não gerada é renderizada. */
export function PageSkeleton() {
  return (
    <div aria-busy="true" className="mx-auto max-w-6xl animate-pulse px-4 py-12 sm:px-6">
      <span className="sr-only">Carregando…</span>
      <div className="h-6 w-32 rounded-full bg-creme-escuro" />
      <div className="mt-6 h-16 w-4/5 bg-creme-escuro" />
      <div className="mt-3 h-16 w-3/5 bg-creme-escuro" />
      <div className="mt-10 aspect-[4/5] w-full border-[3px] border-creme-escuro bg-creme-escuro sm:aspect-video" />
    </div>
  );
}
