import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0 min-h-[2.75rem] sm:whitespace-nowrap",
  {
    variants: {
      variant: {
        default:
          "bg-[hsl(var(--primary))] text-[var(--primary-foreground)] shadow-[var(--shadow-soft)] hover:opacity-95 hover:shadow-[var(--shadow-card)] active:scale-[0.98] rounded-2xl",
        secondary:
          "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] rounded-2xl hover:bg-[hsl(var(--muted))]/80",
        outline:
          "border-2 border-[hsl(var(--border))] bg-transparent text-[var(--foreground)] rounded-2xl hover:bg-[hsl(var(--muted))]",
        ghost: "text-[var(--foreground)] rounded-2xl hover:bg-[hsl(var(--muted))]",
        link: "text-[hsl(var(--primary))] underline-offset-4 hover:underline rounded-2xl",
      },
      size: {
        default: "h-12 px-6 text-base",
        sm: "h-10 px-4 text-sm rounded-xl",
        lg: "h-14 px-8 text-lg rounded-2xl",
        xl: "h-16 px-10 text-xl rounded-2xl",
        icon: "size-12 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
