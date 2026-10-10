import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, Clock } from "lucide-react";
import { ArticleBody } from "@/components/ArticleBody";
import { CategoryTag } from "@/components/CategoryTag";
import { InstagramIcon } from "@/components/InstagramIcon";
import { PostCard } from "@/components/PostCard";
import { SectionHeading } from "@/components/SectionHeading";
import { PageSkeleton } from "@/components/Skeletons";
import { StripeButton } from "@/components/StripeButton";
import { StripeDivider } from "@/components/StripeDivider";
import { formatDate, getAllPosts, getCategory, getPost, getRelatedPosts, site } from "@/lib/content";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/post/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default function PostPage({ params }: PageProps<"/post/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <PostContent params={params} />
    </Suspense>
  );
}

async function PostContent({ params }: Pick<PageProps<"/post/[slug]">, "params">) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const category = getCategory(post.category);
  const related = getRelatedPosts(post);

  return (
    <article>
      {/* Cabeçalho da matéria */}
      <header className="papel-quadriculado border-b-[3px] border-tinta">
        <div className="mx-auto max-w-4xl px-4 pt-6 pb-10 sm:px-6 md:pt-10">
          {category && (
            <Link
              href={`/categoria/${category.slug}`}
              className="inline-flex min-h-11 items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-bordo"
            >
              <ArrowLeft size={18} strokeWidth={2.5} aria-hidden="true" /> {category.name}
            </Link>
          )}

          <div className="mt-4">{category && <CategoryTag category={category} />}</div>

          <h1 className="mt-4 font-display text-[2.9rem] uppercase leading-[0.95] tracking-tight text-balance sm:text-7xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed text-tinta/80">{post.excerpt}</p>

          <div className="mt-6 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="listras-finas grid size-12 shrink-0 place-items-center rounded-full border-[3px] border-tinta"
            >
              <span className="grid size-7 place-items-center rounded-full bg-tinta font-display text-sm text-papel">
                {post.author[0]}
              </span>
            </span>
            <div className="text-sm leading-snug">
              <p className="font-bold uppercase tracking-widest">Por {post.author}</p>
              <p className="flex flex-wrap items-center gap-x-2 text-tinta/65">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span aria-hidden="true">·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={14} aria-hidden="true" /> {post.readingTime} min de leitura
                </span>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Capa */}
      <div className="relative bg-tinta md:bg-creme md:px-6 md:pt-10">
        <div className="relative mx-auto aspect-[4/5] max-h-[85svh] w-full overflow-hidden md:aspect-[16/9] md:max-w-6xl md:border-[3px] md:border-tinta md:shadow-duro-lg">
          <Image
            src={post.cover.src}
            alt={post.cover.alt}
            fill
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover"
          />
        </div>
        {post.note && (
          <p className="absolute right-4 -bottom-6 z-10 max-w-[70%] rotate-[-4deg] border-2 border-tinta bg-mostarda px-4 py-2 font-hand text-2xl leading-tight shadow-duro md:right-[max(2.5rem,calc(50%-34rem))]">
            {post.note}
          </p>
        )}
      </div>

      {/* Texto */}
      <div className="mx-auto max-w-2xl px-5 pt-14 pb-12 sm:px-6 md:pt-16">
        <ArticleBody blocks={post.body} />

        <ul className="mt-10 flex flex-wrap gap-2" aria-label="Tags">
          {post.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border-2 border-tinta bg-papel px-3 py-1 text-sm font-bold lowercase"
            >
              #{tag.replaceAll(" ", "")}
            </li>
          ))}
        </ul>

        <aside className="mt-10 rotate-1 border-[3px] border-tinta bg-rosa p-6 shadow-duro">
          <p className="font-hand text-3xl leading-tight">curtiu? conta pra gente lá no insta!</p>
          <StripeButton
            href={site.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 w-full"
          >
            <InstagramIcon size={20} /> {site.handle}
          </StripeButton>
        </aside>
      </div>

      <StripeDivider />

      {/* Relacionados */}
      <section aria-labelledby="relacionados" className="bg-creme-escuro">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <SectionHeading id="relacionados" title="Mais rolês e achados" aside="se joga também" />
          <ul className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pt-4 pb-6 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0">
            {related.map((item, index) => (
              <li key={item.slug} className="w-[82%] shrink-0 snap-center md:w-auto">
                <PostCard post={item} index={index} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </article>
  );
}
