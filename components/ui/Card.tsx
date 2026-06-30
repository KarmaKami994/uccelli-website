import { cn } from "@/lib/cn";
import Image from "next/image";
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

export function Card({ title, body, imageSrc, imageAlt = "", buttonText, buttonHref, className }: CardProps) {
  return (
    <div className={cn(
      "group border border-neutral-200 rounded-[12px] overflow-hidden flex flex-col bg-white transition-shadow duration-300 hover:shadow-lg hover:border-neutral-300",
      className
    )}>
      {imageSrc ? (
        <div className="aspect-[16/10] w-full overflow-hidden bg-neutral-100 relative">
          <Image src={imageSrc} alt={imageAlt} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 400px" />
        </div>
      ) : (
        <div className="aspect-[16/10] w-full bg-gradient-to-br from-neutral-100 to-neutral-200 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-neutral-300/50" />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold mb-2 leading-tight">{title}</h3>
        <p className="text-[15px] text-neutral-600 leading-relaxed mb-5 flex-1">{body}</p>
        {buttonText && (
          <div>
            <Button variant="primary" href={buttonHref}>{buttonText}</Button>
          </div>
        )}
      </div>
    </div>
  );
}
