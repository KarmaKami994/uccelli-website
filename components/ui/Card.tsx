import { cn } from "@/lib/cn";
import { Button } from "./Button";

interface CardProps {
  title: string;
  body: string;
  imageSrc?: string;
  imageAlt?: string;
  buttonText?: string;
  buttonHref?: string;
  className?: string;
}

export function Card({
  title,
  body,
  imageSrc,
  imageAlt = "",
  buttonText,
  buttonHref,
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        "border border-brand-black rounded-card overflow-hidden flex flex-col",
        className
      )}
    >
      {imageSrc && (
        <div className="aspect-video w-full overflow-hidden bg-neutral-200">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-h3 font-bold mb-2">{title}</h3>
        <p className="text-body text-neutral-700 mb-4 flex-1">{body}</p>
        {buttonText && (
          <div>
            <Button variant="primary" href={buttonHref}>
              {buttonText}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
