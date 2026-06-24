import { cn } from "@/lib/cn";
import { type ButtonHTMLAttributes, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "accent";
type ButtonSize = "default" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-brand-black text-brand-white hover:bg-neutral-800 active:bg-neutral-900",
  secondary:
    "bg-brand-white text-brand-black border border-brand-black hover:bg-neutral-100 active:bg-neutral-200",
  accent:
    "bg-brand-accent text-brand-white hover:bg-brand-accent-accessible active:bg-brand-accent-accessible",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", children, href, ...props }, ref) => {
    const classes = cn(
      "inline-flex items-center justify-center font-bold uppercase tracking-wider rounded-button transition-colors duration-200 font-lato focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent",
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    if (href) {
      return (
        <a href={href} className={classes}>
          {children}
        </a>
      );
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
export type { ButtonProps };
