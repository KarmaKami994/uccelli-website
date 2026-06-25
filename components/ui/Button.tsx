import { cn } from "@/lib/cn";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "accent";
type ButtonSize = "default" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-black text-white hover:bg-neutral-800 active:bg-neutral-900",
  secondary: "bg-white text-black border border-black hover:bg-neutral-50 active:bg-neutral-100",
  accent: "bg-brand-accent text-white hover:bg-brand-accent-accessible active:bg-brand-accent-accessible",
};

const sizes: Record<ButtonSize, string> = {
  default: "px-7 py-3 text-[13px]",
  lg: "px-9 py-4 text-[14px]",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", children, href, ...props }, ref) => {
    const cls = cn(
      "inline-flex items-center justify-center font-bold uppercase tracking-[0.12em] rounded-[12px] transition-all duration-200",
      "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent",
      variants[variant],
      sizes[size],
      className
    );
    if (href) return <a href={href} className={cls}>{children}</a>;
    return <button ref={ref} className={cls} {...props}>{children}</button>;
  }
);
Button.displayName = "Button";

export { Button };
export type { ButtonProps };
