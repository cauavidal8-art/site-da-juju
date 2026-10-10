import categoriesData from "@/data/categories.json";
import postsData from "@/data/posts.json";

export type CategorySlug = "agenda" | "lifestyle" | "cultura" | "achados" | "moda";
export type CategoryColor = "ceu" | "rosa" | "mostarda" | "mata" | "bordo";

export type Category = {
  slug: CategorySlug;
  name: string;
  tagline: string;
  color: CategoryColor;
};

export type AgendaItem = {
  day: string;
  title: string;
  place: string;
  time: string;
  price: string;
};

export type Block =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] }
  | { type: "agenda"; items: AgendaItem[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: CategorySlug;
  author: string;
  /** Data de publicação no formato ISO (AAAA-MM-DD). */
  date: string;
  readingTime: number;
  cover: { src: string; alt: string };
  featured: boolean;
  /** Bilhetinho escrito à mão que aparece colado na capa. */
  note?: string;
  tags: string[];
  body: Block[];
};

export const categories = categoriesData as Category[];

// Mais recentes primeiro.
const posts = (postsData as Post[]).toSorted((a, b) => b.date.localeCompare(a.date));

export function getAllPosts(): Post[] {
  return posts;
}

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getPostsByCategory(slug: CategorySlug): Post[] {
  return posts.filter((post) => post.category === slug);
}

export function getFeaturedPost(): Post {
  return posts.find((post) => post.featured) ?? posts[0];
}

/** Posts da mesma categoria primeiro, completando com os mais recentes. */
export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const others = posts.filter((p) => p.slug !== post.slug);
  const sameCategory = others.filter((p) => p.category === post.category);
  const rest = others.filter((p) => p.category !== post.category);
  return [...sameCategory, ...rest].slice(0, limit);
}

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(`${iso}T00:00:00Z`));
}

export const site = {
  name: "Juma Clube",
  city: "Manaus",
  description:
    "O seu clube cultural favorito para descobrir a cidade! Cultura, rolês, moda, entretenimento e experiências em Manaus.",
  instagram: "https://www.instagram.com/jumaclube/",
  threads: "https://www.threads.net/@jumaclube",
  linktree: "https://linktr.ee/jumaclube",
  handle: "@jumaclube",
};
