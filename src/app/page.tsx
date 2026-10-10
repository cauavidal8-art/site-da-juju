import { ArrowRight } from "lucide-react";
import { AboutSection } from "@/components/AboutSection";
import { CategoryPanels } from "@/components/CategoryPanels";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { Marquee } from "@/components/Marquee";
import { PostCard } from "@/components/PostCard";
import { SectionHeading } from "@/components/SectionHeading";
import { StripeButton } from "@/components/StripeButton";
import { categories, getAllPosts, getFeaturedPost } from "@/lib/content";

export default function Home() {
  const featured = getFeaturedPost();
  const latest = getAllPosts().filter((post) => post.slug !== featured.slug);

  return (
    <>
      <Highlights categories={categories} />
      <Hero post={featured} />
      <Marquee />

      <section aria-labelledby="recentes" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
        <SectionHeading id="recentes" title="Fresquinhos" aside="acabou de sair do forno" />
        <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {latest.slice(0, 6).map((post, index) => (
            <li key={post.slug}>
              <PostCard post={post} index={index} priority={index < 2} />
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="temas"
        className="border-t-[3px] border-tinta bg-creme-escuro"
      >
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <SectionHeading id="temas" title="Escolha seu rolê" aside="qual é a vibe de hoje?" />
          <CategoryPanels categories={categories} />
        </div>
      </section>

      {latest.length > 6 && (
        <section aria-labelledby="mais" className="mx-auto max-w-6xl px-4 py-14 sm:px-6 md:py-20">
          <SectionHeading id="mais" title="Tem mais" aside="pra ler com calma" />
          <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {latest.slice(6).map((post, index) => (
              <li key={post.slug}>
                <PostCard post={post} index={index + 1} />
              </li>
            ))}
          </ul>
          <div className="mt-12 flex justify-center">
            <StripeButton href="/categoria/agenda" className="w-full sm:w-auto">
              Ver a agenda completa <ArrowRight size={20} strokeWidth={2.5} />
            </StripeButton>
          </div>
        </section>
      )}

      <AboutSection />
    </>
  );
}
