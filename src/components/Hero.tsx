import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { CategoryTag } from "@/components/CategoryTag";
import { StripeButton } from "@/components/StripeButton";
import { formatDate, getCategory, type Post } from "@/lib/content";

const weekDays = ["SEG", "TER", "QUA", "QUI", "SEX", "SÁB", "DOM"];

/** Destaque da home montado como uma colagem: polaroid, fita, bilhetes e recortes. */
export function Hero({ post }: { post: Post }) {
  const category = getCategory(post.category);
  const isAgenda = post.category === "agenda";

  return (
    <section className="papel-quadriculado relative overflow-hidden border-b-[3px] border-tinta">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pt-8 pb-14 sm:px-6 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-12 md:pt-14 md:pb-20">
        {/* Texto */}
        <div className="relative z-10 order-2 md:order-1">
          <p className="flex items-center gap-2 font-hand text-2xl text-bordo">
            <Sparkles size={20} aria-hidden="true" /> destaque da semana
          </p>

          {isAgenda && (
            <p className="mt-2 inline-block -rotate-2 bg-tinta px-3 py-1 font-display text-2xl uppercase tracking-wide text-papel">
              Juma Agenda
            </p>
          )}

          <h1 className="mt-4 font-display text-[3.4rem] uppercase leading-[0.92] tracking-tight text-balance sm:text-7xl lg:text-8xl">
            {post.title.replace(/^Juma Agenda:\s*/i, "")}
          </h1>

          <p className="mt-5 max-w-md text-lg leading-relaxed text-tinta/80">{post.excerpt}</p>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm font-bold uppercase tracking-widest text-tinta/60">
            {category && <CategoryTag category={category} />}
            <span>
              Por {post.author} · <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
          </div>

          <StripeButton href={`/post/${post.slug}`} className="mt-8 w-full sm:w-auto">
            Ver os rolês <ArrowRight size={20} strokeWidth={2.5} />
          </StripeButton>
        </div>

        {/* Colagem */}
        <div className="relative order-1 mx-auto w-[86%] max-w-md pt-4 md:order-2 md:w-full">
          {/* Recorte listrado de fundo */}
          <div
            aria-hidden="true"
            className="listras absolute top-0 -right-5 h-[78%] w-[62%] rotate-6 border-[3px] border-tinta sm:-right-8"
          />

          {/* Polaroid principal */}
          <div className="relative -rotate-3 border-[3px] border-tinta bg-papel p-3 pb-14 shadow-duro-lg">
            <span
              aria-hidden="true"
              className="fita absolute -top-4 left-1/2 z-10 h-8 w-32 -translate-x-1/2 -rotate-3"
            />
            <div className="relative aspect-[4/5] overflow-hidden border-2 border-tinta">
              <Image
                src={post.cover.src}
                alt={post.cover.alt}
                fill
                priority
                sizes="(min-width: 768px) 420px, 90vw"
                className="object-cover"
              />
            </div>
            {/* Legenda da polaroid, coberta pelo bilhete quando ele existe */}
            {!post.note && (
              <p className="absolute right-4 bottom-3 text-right font-hand text-2xl">
                {isAgenda ? "Rolês da semana" : category?.name} ✨
              </p>
            )}
          </div>

          {/* Bilhete colado */}
          {post.note && (
            <p className="absolute -bottom-4 -left-2 max-w-[11rem] rotate-[-8deg] border-2 border-tinta bg-mostarda px-4 py-3 font-hand text-2xl leading-tight shadow-duro sm:-left-8">
              {post.note}
            </p>
          )}

          {/* Selo giratório */}
          <div
            aria-hidden="true"
            className="absolute -top-2 -left-3 grid size-20 rotate-12 place-items-center rounded-full border-[3px] border-tinta bg-bordo text-center font-display text-lg uppercase leading-none text-papel shadow-duro sm:size-24 sm:text-xl"
          >
            Novo
            <br />
            post
          </div>

          {/* Tirinha de dias da semana recortada */}
          {isAgenda && (
            <ul
              aria-hidden="true"
              className="absolute -right-2 -bottom-8 flex rotate-[4deg] border-2 border-tinta bg-papel shadow-duro"
            >
              {weekDays.map((day, i) => (
                <li
                  key={day}
                  className={`px-1.5 py-1 text-[0.65rem] font-black tracking-wider sm:px-2 sm:text-xs ${i === 6 ? "bg-bordo text-papel" : ""} ${i > 0 ? "border-l-2 border-tinta" : ""}`}
                >
                  {day}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
