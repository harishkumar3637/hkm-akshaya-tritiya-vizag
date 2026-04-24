import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--decorativeAccent)] focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[var(--buttonHover)] via-[var(--buttonPrimary)] to-[var(--impactGradientEnd)] text-[var(--textOnAccent)] shadow-[0_16px_40px_var(--shadowColor)] hover:-translate-y-0.5 hover:brightness-105",
        secondary:
          "bg-white/90 text-[var(--buttonPrimary)] shadow-[0_10px_30px_color-mix(in_srgb,var(--shadowColor)_55%,transparent)] hover:bg-white",
        outline:
          "border border-[var(--borderSubtle)] bg-white/80 text-[var(--buttonHover)] hover:bg-[var(--cardRaisedBackground)]",
      },
      size: {
        default: "h-11 px-6",
        icon: "h-10 w-10 p-0",
        lg: "h-[52px] px-8 text-base",
        sm: "h-9 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | null;
  size?: "default" | "icon" | "lg" | "sm" | null;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
