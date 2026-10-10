"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { InstagramIcon } from "@/components/InstagramIcon";
import type { Category } from "@/lib/content";

type HeaderProps = {
  categories: Category[];
  instagram: string;
  linktree: string;
};

export function Header({ categories, instagram, linktree }: HeaderProps) {
  const [open, setOpen] = useState(false);

  // Trava a rolagem da página enquanto o menu está aberto e fecha com Esc.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="listras h-2 border-b-2 border-tinta" aria-hidden="true" />
      <div className="border-b-[3px] border-tinta bg-creme/95 backdrop-blur">
        <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Logo />

          <nav aria-label="Categorias" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/categoria/${category.slug}`}
                    className="inline-flex min-h-11 items-center rounded-full border-2 border-transparent px-4 text-sm font-bold uppercase tracking-widest transition-colors hover:border-tinta hover:bg-papel"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram do Juma Clube"
              className="hidden size-12 place-items-center rounded-full border-[3px] border-tinta bg-papel transition-transform hover:-rotate-6 sm:grid"
            >
              <InstagramIcon size={22} />
            </a>
            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              className="grid size-12 place-items-center rounded-full border-[3px] border-tinta bg-tinta text-papel transition-transform active:scale-95 lg:hidden"
            >
              {open ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} strokeWidth={2.5} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile em tela cheia */}
      <div
        id="menu-mobile"
        hidden={!open}
        className="fixed inset-x-0 top-[calc(4.5rem+0.5rem+5px)] bottom-0 overflow-y-auto bg-bordo text-papel lg:hidden"
      >
        <nav aria-label="Menu principal" className="px-4 pt-6 pb-10">
          <ul className="flex flex-col">
            {categories.map((category, index) => (
              <li key={category.slug} className="border-b-2 border-papel/25">
                <Link
                  href={`/categoria/${category.slug}`}
                  onClick={close}
                  className="group flex items-baseline gap-4 py-4"
                >
                  <span className="font-hand text-2xl text-rosa">0{index + 1}</span>
                  <span className="font-display text-5xl uppercase leading-none transition-transform group-active:translate-x-2">
                    {category.name}
                  </span>
                </Link>
              </li>
            ))}
            <li className="border-b-2 border-papel/25">
              <Link href="/#quem-somos" onClick={close} className="flex items-baseline gap-4 py-4">
                <span className="font-hand text-2xl text-rosa">✦</span>
                <span className="font-display text-5xl uppercase leading-none">Quem somos</span>
              </Link>
            </li>
          </ul>

          <div className="mt-8 grid grid-cols-2 gap-3">
            <a
              href={instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 items-center justify-center gap-2 rounded-full border-[3px] border-papel font-bold uppercase tracking-wider"
            >
              <InstagramIcon size={20} /> Instagram
            </a>
            <a
              href={linktree}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-14 items-center justify-center gap-2 rounded-full border-[3px] border-papel bg-papel font-bold uppercase tracking-wider text-bordo"
            >
              Linktree <ArrowUpRight size={20} />
            </a>
          </div>
          <p className="mt-8 font-hand text-3xl text-rosa">
            o seu clube cultural favorito pra descobrir a cidade ✨
          </p>
        </nav>
      </div>
    </header>
  );
}
