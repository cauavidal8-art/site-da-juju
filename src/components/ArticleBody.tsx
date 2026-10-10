import { Clock, MapPin, Ticket } from "lucide-react";
import type { AgendaItem, Block } from "@/lib/content";

function AgendaList({ items }: { items: AgendaItem[] }) {
  return (
    <ol className="my-10 flex flex-col gap-4">
      {items.map((item) => (
        <li
          key={`${item.day}-${item.title}`}
          className="flex overflow-hidden border-[3px] border-tinta bg-papel shadow-duro"
        >
          <span className="listras flex w-20 shrink-0 items-center justify-center border-r-[3px] border-tinta">
            <span className="border-2 border-tinta bg-papel px-1.5 py-1 font-display text-lg leading-none">
              {item.day}
            </span>
          </span>
          <div className="min-w-0 flex-1 p-4">
            <p className="font-display text-2xl uppercase leading-tight">{item.title}</p>
            <ul className="mt-2 flex flex-col gap-1 text-sm text-tinta/75">
              <li className="flex items-center gap-2">
                <MapPin size={16} aria-hidden="true" className="shrink-0 text-bordo" />
                {item.place}
              </li>
              <li className="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span className="flex items-center gap-2">
                  <Clock size={16} aria-hidden="true" className="shrink-0 text-bordo" />
                  {item.time}
                </span>
                <span className="flex items-center gap-2">
                  <Ticket size={16} aria-hidden="true" className="shrink-0 text-bordo" />
                  {item.price}
                </span>
              </li>
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Renderiza os blocos de conteúdo com espaçamento pensado para leitura no celular. */
export function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="text-[1.15rem] leading-[1.8] text-tinta/90">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={index} className="my-6 first:mt-0">
                {block.text}
              </p>
            );
          case "heading":
            return (
              <h2
                key={index}
                className="mt-12 mb-4 font-display text-4xl uppercase leading-none tracking-tight text-tinta"
              >
                <span className="bg-[linear-gradient(transparent_62%,var(--color-rosa)_62%)] px-1">
                  {block.text}
                </span>
              </h2>
            );
          case "quote":
            return (
              <figure
                key={index}
                className="relative my-12 -rotate-1 border-[3px] border-tinta bg-bordo p-6 pt-10 text-papel shadow-duro-lg"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-7 left-4 font-display text-8xl leading-none text-mostarda"
                >
                  “
                </span>
                <blockquote className="font-display text-3xl uppercase leading-[1.05] text-balance">
                  {block.text}
                </blockquote>
                {block.cite && (
                  <figcaption className="mt-4 font-hand text-2xl text-rosa">— {block.cite}</figcaption>
                )}
              </figure>
            );
          case "list":
            return (
              <ul key={index} className="my-8 flex flex-col gap-3">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span aria-hidden="true" className="mt-0.5 shrink-0 text-xl text-bordo">
                      ✦
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "agenda":
            return <AgendaList key={index} items={block.items} />;
        }
      })}
    </div>
  );
}
