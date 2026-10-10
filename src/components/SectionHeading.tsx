import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: string;
  /** Comentário escrito à mão ao lado do título. */
  aside?: string;
  action?: ReactNode;
  id?: string;
};

export function SectionHeading({ title, aside, action, id }: SectionHeadingProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {aside && <p className="font-hand text-2xl text-bordo">{aside}</p>}
        <h2 id={id} className="font-display text-5xl uppercase leading-none tracking-tight sm:text-6xl">
          {title}
        </h2>
        <div className="listras-finas mt-3 h-2.5 w-28 border-2 border-tinta" aria-hidden="true" />
      </div>
      {action}
    </div>
  );
}
