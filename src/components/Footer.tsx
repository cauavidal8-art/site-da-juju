import Link from "next/link";
import { Suspense } from "react";
import { ArrowUpRight, AtSign } from "lucide-react";
import { CurrentYear } from "@/components/CurrentYear";
import { InstagramIcon } from "@/components/InstagramIcon";
import { Logo } from "@/components/Logo";
import { categories, site } from "@/lib/content";

export function Footer() {
  return (
    <footer className="mt-auto bg-tinta text-papel">
      <div className="listras h-4 border-y-[3px] border-tinta" aria-hidden="true" />

      <div className="mx-auto max-w-6xl px-4 pt-12 pb-8 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo inverted />
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-papel/80">
              {site.description}
            </p>
          </div>

          <nav aria-label="Categorias no rodapé">
            <h2 className="font-hand text-2xl text-rosa">explore</h2>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 md:grid-cols-1">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/categoria/${category.slug}`}
                    className="inline-flex min-h-11 items-center font-bold uppercase tracking-widest hover:text-rosa"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/#quem-somos"
                  className="inline-flex min-h-11 items-center font-bold uppercase tracking-widest hover:text-rosa"
                >
                  Quem somos
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="font-hand text-2xl text-rosa">segue a gente</h2>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-14 items-center gap-3 rounded-full border-[3px] border-papel px-5 font-bold transition-colors hover:bg-papel hover:text-tinta"
                >
                  <InstagramIcon size={22} />
                  <span>Instagram {site.handle}</span>
                </a>
              </li>
              <li>
                <a
                  href={site.threads}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-14 items-center gap-3 rounded-full border-[3px] border-papel px-5 font-bold transition-colors hover:bg-papel hover:text-tinta"
                >
                  <AtSign size={22} />
                  <span>Threads</span>
                </a>
              </li>
              <li>
                <a
                  href={site.linktree}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-14 items-center justify-between gap-3 rounded-full border-[3px] border-papel bg-bordo px-5 font-bold transition-colors hover:bg-papel hover:text-bordo"
                >
                  <span>Todos os links no Linktree</span>
                  <ArrowUpRight size={22} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="mt-14 select-none whitespace-nowrap font-display text-[19vw] uppercase leading-[0.8] tracking-tight text-papel/10 md:text-[11rem]"
        >
          Juma Clube
        </p>

        <div className="mt-6 flex flex-col gap-2 border-t-2 border-papel/20 pt-6 text-sm text-papel/60 sm:flex-row sm:justify-between">
          <p>
            ©{" "}
            <Suspense>
              <CurrentYear />
            </Suspense>{" "}
            {site.name} · {site.city}, Amazonas. Todos os direitos reservados.
          </p>
          <p className="font-hand text-xl text-rosa">feito com amor e tucumã 🐆</p>
        </div>
      </div>
    </footer>
  );
}
