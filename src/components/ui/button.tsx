import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f3b14a] focus-visible:ring-offset-2 focus-visible:ring-offset-white cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-[#8f1d10] via-[#c65a18] to-[#f0a233] text-white shadow-[0_16px_40px_rgba(169,72,20,0.35)] hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(169,72,20,0.42)]",
        secondary:
          "bg-white/90 text-[#8b2f18] shadow-[0_10px_30px_rgba(117,57,20,0.12)] hover:bg-white",
        outline:
          "border border-[#d9b175] bg-white/80 text-[#7d2a19] hover:bg-[#fff7e8]",
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
