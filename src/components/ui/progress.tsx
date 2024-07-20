"use client";

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";

import { cn } from "@/lib/utils";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const DEFAULT_DURATION = 500;

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & { value: number, duration?: number }
>(({ className, value, duration = DEFAULT_DURATION, ...props }, ref) => {
  const { isIntersecting, targetRef } = useIntersectionObserver();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (!isIntersecting) return;

    const timer = setTimeout(() => setProgress(value), duration);
    return () => clearTimeout(timer);
  }, [isIntersecting, value, duration]);

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn("bg-primary/20 relative h-2 w-full overflow-hidden rounded-full", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        ref={targetRef}
        className="bg-primary size-full flex-1 transition-all"
        style={{ transform: `translateX(-${100 - (progress || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
