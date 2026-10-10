import { StripeButton } from "@/components/StripeButton";

export default function NotFound() {
  return (
    <section className="papel-quadriculado border-b-[3px] border-tinta">
      <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-20 text-center">
        <p className="font-hand text-3xl text-bordo">ih, se perdeu no rolê?</p>
        <h1 className="mt-2 font-display text-[9rem] leading-none tracking-tight">404</h1>
        <p className="mt-4 text-lg">
          Essa página não existe (ou já acabou a festa). Bora voltar pro começo?
        </p>
        <StripeButton href="/" className="mt-8 w-full sm:w-auto">
          Voltar pra home
        </StripeButton>
      </div>
    </section>
  );
}
