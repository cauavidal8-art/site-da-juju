import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PostCard } from "@/components/PostCard";
import { PageSkeleton } from "@/components/Skeletons";
import { StripeButton } from "@/components/StripeButton";
import { categories, getCategory, getPostsByCategory } from "@/lib/content";
import { categoryStyles } from "@/lib/styles";

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/categoria/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return { title: category.name, description: category.tagline };
}

export default function CategoryPage({ params }: PageProps<"/categoria/[slug]">) {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <CategoryContent params={params} />
    </Suspense>
  );
}

async function CategoryContent({ params }: Pick<PageProps<"/categoria/[slug]">, "params">) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const posts = getPostsByCategory(category.slug);
  const styles = categoryStyles[category.color];

  return (
    <>
      <section className={`relative overflow-hidden border-b-[3px] border-tinta ${styles.panel}`}>
        <div
          aria-hidden="true"
          className="listras absolute -top-10 -right-14 h-44 w-32 rotate-12 border-[3px] border-tinta sm:h-56 sm:w-56"
        />
        <div className="relative mx-auto max-w-6xl px-4 pt-10 pb-12 sm:px-6 md:pt-16 md:pb-16">
          <p className="font-hand text-2xl opacity-85">
            {posts.length} {posts.length === 1 ? "matéria" : "matérias"} pra você
          </p>
          <h1 className="font-display text-[5.5rem] uppercase leading-[0.85] tracking-tight sm:text-9xl">
            {category.name}
          </h1>
          <p className="mt-4 max-w-[80%] text-lg leading-relaxed opacity-90 sm:max-w-lg">{category.tagline}</p>
        </div>
      </section>

      <nav aria-label="Outras categorias" className="border-b-[3px] border-tinta bg-papel">
        <ul className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-4 [scrollbar-width:none] sm:px-6">
          {categories.map((item) => {
            const active = item.slug === category.slug;
            return (
              <li key={item.slug} className="shrink-0">
                <Link
                  href={`/categoria/${item.slug}`}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex min-h-11 items-center rounded-full border-2 border-tinta px-5 text-sm font-bold uppercase tracking-widest transition-colors ${
                    active ? "bg-tinta text-papel" : "bg-papel hover:bg-creme-escuro"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
        {posts.length > 0 ? (
          <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <li key={post.slug}>
                <PostCard post={post} index={index} priority={index < 2} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mx-auto max-w-md rotate-1 border-[3px] border-tinta bg-papel p-8 text-center shadow-duro">
            <p className="font-hand text-3xl text-bordo">em breve por aqui…</p>
            <p className="mt-2 text-lg">Estamos garimpando conteúdo novo pra essa editoria.</p>
            <StripeButton href="/" className="mt-6 w-full">
              Voltar pra home
            </StripeButton>
          </div>
        )}
      </section>
    </>
  );
}
