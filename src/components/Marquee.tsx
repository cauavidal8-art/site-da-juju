const words = ["Cultura", "Rolês", "Moda", "Entretenimento", "Achados", "Experiências", "Manaus"];

/** Letreiro rolando, como uma faixa de revista colada torta. */
export function Marquee({ className = "" }: { className?: string }) {
  const sequence = [...words, ...words];

  return (
    <div
      aria-hidden="true"
      className={`overflow-hidden border-y-[3px] border-tinta bg-bordo py-3 text-papel ${className}`}
    >
      <div className="animate-letreiro flex w-max">
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0">
            {sequence.map((word, i) => (
              <li key={`${word}-${i}`} className="flex items-center gap-5 pr-5 font-display text-3xl uppercase">
                {word}
                <span className="text-mostarda">✦</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
