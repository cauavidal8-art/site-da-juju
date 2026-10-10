import Image from "next/image";
import Link from "next/link";
import { CategoryTag } from "@/components/CategoryTag";
import { formatDate, getCategory, type Post } from "@/lib/content";

type PostCardProps = {
  post: Post;
  /** Posição no grid, usada para alternar a inclinação dos "recortes". */
  index?: number;
  /** Prioriza o carregamento da imagem (cards acima da dobra). */
  priority?: boolean;
  className?: string;
};

const tilts = ["-rotate-1", "rotate-1", "rotate-0", "-rotate-[0.5deg]"];
const noteColors = ["bg-mostarda", "bg-rosa", "bg-papel"];

/** Card estilo polaroid colada com fita, bem longe do visual de jornal. */
export function PostCard({ post, index = 0, priority = false, className = "" }: PostCardProps) {
  const category = getCategory(post.category);

  return (
    <Link
      href={`/post/${post.slug}`}
      className={`group block ${tilts[index % tilts.length]} transition-transform duration-300 hover:-translate-y-1 hover:rotate-0 ${className}`}
    >
      <article className="relative h-full border-[3px] border-tinta bg-papel p-3 shadow-duro transition-shadow duration-300 group-hover:shadow-duro-lg">
        {/* Fita adesiva */}
        <span
          aria-hidden="true"
          className={`fita absolute -top-3 left-1/2 z-10 h-6 w-24 -translate-x-1/2 ${index % 2 ? "rotate-3" : "-rotate-2"}`}
        />

        <div className="relative aspect-[4/5] overflow-hidden border-2 border-tinta bg-creme-escuro">
          <Image
            src={post.cover.src}
            alt={post.cover.alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {post.note && (
            <span
              className={`absolute right-3 bottom-3 max-w-[70%] rotate-2 border-2 border-tinta px-3 py-1 font-hand text-xl leading-tight text-tinta shadow-duro ${noteColors[index % noteColors.length]}`}
            >
              {post.note}
            </span>
          )}
        </div>

        <div className="px-1 pt-4 pb-2">
          {category && <CategoryTag category={category} asLink={false} />}
          <h3 className="mt-3 font-display text-[1.85rem] uppercase leading-[1.02] tracking-tight text-balance group-hover:text-bordo">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-base leading-relaxed text-tinta/75">
            {post.excerpt}
          </p>
          <p className="mt-3 text-xs font-bold uppercase tracking-widest text-tinta/60">
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingTime} min
          </p>
        </div>
      </article>
    </Link>
  );
}
