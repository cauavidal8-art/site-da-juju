import Link from "next/link";
import type { Category } from "@/lib/content";

/** Os "destaques" do Instagram: bolinhas listradas que levam a cada editoria. */
export function Highlights({ categories }: { categories: Category[] }) {
  const items = [
    ...categories.map((category) => ({
      href: `/categoria/${category.slug}`,
      label: category.name,
      initial: category.name[0],
    })),
    { href: "/#quem-somos", label: "Quem somos", initial: "✦" },
  ];

  return (
    <nav aria-label="Destaques" className="border-b-[3px] border-tinta bg-creme">
      <ul className="mx-auto flex max-w-6xl snap-x gap-4 overflow-x-auto px-4 py-6 [scrollbar-width:none] sm:justify-center sm:gap-7 sm:px-6">
        {items.map((item) => (
          <li key={item.href} className="snap-start">
            <Link href={item.href} className="group flex w-20 flex-col items-center gap-2">
              <span className="grid size-20 place-items-center rounded-full border-[3px] border-tinta bg-papel p-1 transition-transform duration-300 group-hover:-rotate-12 group-active:scale-95">
                <span className="listras grid size-full place-items-center rounded-full">
                  <span className="grid size-9 place-items-center rounded-full border-2 border-tinta bg-papel font-display text-lg uppercase">
                    {item.initial}
                  </span>
                </span>
              </span>
              <span className="text-center text-xs font-bold lowercase tracking-wide">
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
