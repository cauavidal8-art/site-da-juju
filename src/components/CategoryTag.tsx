import Link from "next/link";
import type { Category } from "@/lib/content";

type CategoryTagProps = {
  category: Category;
  /** Renderiza como texto (útil dentro de outro link). */
  asLink?: boolean;
  className?: string;
};

/** Etiqueta da categoria: fundo listrado com um "recorte" de papel por cima. */
export function CategoryTag({ category, asLink = true, className = "" }: CategoryTagProps) {
  const content = (
    <span className="rounded-full bg-papel px-2.5 py-0.5">{category.name}</span>
  );
  const classes = `listras-finas inline-flex items-center rounded-full border-2 border-tinta p-1 text-xs font-bold uppercase tracking-widest text-tinta ${className}`;

  if (!asLink) return <span className={classes}>{content}</span>;

  return (
    <Link
      href={`/categoria/${category.slug}`}
      className={`${classes} transition-transform hover:-rotate-3`}
    >
      {content}
    </Link>
  );
}
