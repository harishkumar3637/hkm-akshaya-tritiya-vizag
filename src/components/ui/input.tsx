import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-2xl border border-[#e8d0b1] bg-[#fffaf2] px-4 py-3 text-sm text-[#FF9933] shadow-inner outline-none transition-all placeholder:text-[#af8a66] focus:border-[#d4842d] focus:bg-white focus:ring-[3px] focus:ring-[#f7d8a0]",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
