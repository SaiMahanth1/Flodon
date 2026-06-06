import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import * as React from "react";

const buttonVariants = cva(
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-xl font-semibold text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white shadow-lg shadow-blue-500/10 hover:bg-blue-500 active:bg-blue-700",
        destructive:
          "bg-red-600 text-white shadow-lg shadow-red-500/10 hover:bg-red-500 active:bg-red-700",
        outline:
          "border border-neutral-800 bg-neutral-950 text-neutral-300 hover:border-neutral-700 hover:bg-neutral-900 hover:text-white",
        secondary:
          "bg-neutral-900 text-neutral-300 border border-neutral-800/80 hover:bg-neutral-800 hover:text-white",
        ghost:
          "text-neutral-400 hover:text-white hover:bg-neutral-900/60 pb-1 pt-1 px-3",
        link: "text-blue-400 underline-offset-4 transition-colors hover:text-blue-300 hover:underline",
        shimmer:
          "relative border border-neutral-800 bg-[#0A0E17] text-white hover:border-blue-500/40 hover:bg-neutral-900/80",
        glow: "bg-blue-600 text-white shadow-xl shadow-blue-500/15 hover:bg-blue-500 active:bg-blue-700",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 rounded-lg px-3.5 text-xs",
        lg: "h-12 rounded-xl px-8 text-sm",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      const { left, top } = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);
    };

    const background = useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.08), transparent 80%)`;

    if (asChild) {
      return (
        <Comp
          className={`${buttonVariants({ variant, size })} ${className || ""}`}
          ref={ref}
          {...props}
        >
          {children}
        </Comp>
      );
    }

    const MotionButton = motion.button;

    return (
      <MotionButton
        className={`${buttonVariants({ variant, size })} ${className || ""}`}
        ref={ref}
        onMouseMove={handleMouseMove}
        whileHover={{ y: variant === "link" ? 0 : -1.5 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "tween", duration: 0.15 }}
        {...(props as any)}
      >
        {variant !== "link" && variant !== "ghost" && (
          <motion.div
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background }}
          />
        )}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {children}
        </span>
      </MotionButton>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
