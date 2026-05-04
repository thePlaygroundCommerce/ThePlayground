import clsx from "clsx";
import { ReactNode } from "react";

type CardProps = {
  image: ReactNode;
  title: string;
  headline: string;
  description: string;
  className?: string;
};

const Card = ({
  title,
  image,
  headline,
  description,
  className,
}: CardProps) => {
  return (
    <article
      className={clsx(
        "overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm",
        className,
      )}
    >
      <div className="relative h-56 w-full">
        {image}
      </div>

      <div className="space-y-2 p-4">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-black/50">
          {headline}
        </p>
        <h3 className="text-xl font-semibold leading-tight text-black">{title}</h3>
        <p className="text-sm leading-relaxed text-black/70">{description}</p>
      </div>
    </article>
  );
};

export type { CardProps };
export default Card;
