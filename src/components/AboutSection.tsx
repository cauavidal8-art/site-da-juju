import Image from "next/image";
import { InstagramIcon } from "@/components/InstagramIcon";
import { StripeButton } from "@/components/StripeButton";
import { site } from "@/lib/content";

const pillars = ["Cultura", "Rolês", "Moda", "Entretenimento", "Experiências"];

export function AboutSection() {
  return (
    <section
      id="quem-somos"
      aria-labelledby="quem-somos-titulo"
      className="scroll-mt-24 border-y-[3px] border-tinta bg-bordo text-papel"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[auto_1fr] md:items-center md:gap-14 md:py-20">
        <div className="relative mx-auto w-56 sm:w-64">
          <div className="listras rounded-full border-[3px] border-tinta p-2 shadow-duro-lg">
            <div className="relative aspect-square overflow-hidden rounded-full border-[3px] border-tinta">
              <Image
                src="/images/posts/juma-og.svg"
                alt=""
                fill
                sizes="256px"
                className="object-cover"
              />
            </div>
          </div>
          <p className="absolute -right-6 -bottom-2 rotate-[-10deg] border-2 border-tinta bg-mostarda px-3 py-1 font-hand text-2xl text-tinta shadow-duro">
            prazer, Juma! 🐆
          </p>
        </div>

        <div>
          <p className="font-hand text-3xl text-rosa">quem somos</p>
          <h2
            id="quem-somos-titulo"
            className="mt-1 font-display text-5xl uppercase leading-[0.95] tracking-tight text-balance sm:text-6xl"
          >
            O seu clube cultural favorito pra descobrir a cidade
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-papel/85">
            O Juma Clube nasceu em Manaus pra reunir quem ama sair de casa, descobrir lugares novos
            e celebrar o que a nossa cidade tem de melhor. A gente garimpa a agenda, testa os cafés,
            vai nos desfiles e conta tudo aqui — com o olhar de quem vive o Norte de verdade.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {pillars.map((pillar) => (
              <li
                key={pillar}
                className="rounded-full border-2 border-papel px-4 py-1.5 text-sm font-bold uppercase tracking-widest"
              >
                {pillar}
              </li>
            ))}
          </ul>
          <StripeButton
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            variant="light"
            className="mt-8 w-full sm:w-auto"
          >
            <InstagramIcon size={20} /> Seguir {site.handle}
          </StripeButton>
        </div>
      </div>
    </section>
  );
}
