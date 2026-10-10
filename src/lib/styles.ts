import type { CategoryColor } from "@/lib/content";

/** Classes completas (para o Tailwind detectar) de cada cor de categoria. */
export const categoryStyles: Record<CategoryColor, { chip: string; panel: string }> = {
  ceu: { chip: "bg-ceu text-papel", panel: "bg-ceu text-papel" },
  rosa: { chip: "bg-rosa text-tinta", panel: "bg-rosa text-tinta" },
  mostarda: { chip: "bg-mostarda text-tinta", panel: "bg-mostarda text-tinta" },
  mata: { chip: "bg-mata text-papel", panel: "bg-mata text-papel" },
  bordo: { chip: "bg-bordo text-papel", panel: "bg-bordo text-papel" },
};
