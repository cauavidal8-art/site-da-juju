import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categoryStyles } from "@/lib/styles";
import type { Category } from "@/lib/content";

/** Blocos coloridos e grandes para escolher a editoria com o dedão. */
export function CategoryPanels({ categories }: { categories: Category[] }) {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
      {categories.map((category, index) => (
        <li key={category.slug} className={index === 0 ? "col-span-2 lg:col-span-1" : ""}>
          <Link
            href={`/categoria/${category.slug}`}
            className={`group flex h-full min-h-32 flex-col justify-between border-[3px] border-tinta p-4 shadow-duro transition-transform duration-200 hover:-translate-y-1 active:translate-y-0.5 ${categoryStyles[category.color].panel}`}
          >
            <span className="flex items-start justify-between gap-2">
              <span className="font-hand text-xl opacity-80">0{index + 1}</span>
              <ArrowUpRight
                size={26}
                strokeWidth={2.5}
                aria-hidden="true"
                className="transition-transform group-hover:rotate-45"
              />
            </span>
            <span className="font-display text-4xl uppercase leading-none">{category.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
