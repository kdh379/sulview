"use client";

import { useEffect, useState } from "react";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

interface CounterProps {
  value: number;
  duration?: number;
  className?: string;
}

const DEFAULT_DURATION = 1000;

const Counter = ({
  value,
  className,
  duration = DEFAULT_DURATION,
}: CounterProps) => {
  const [count, setCount] = useState(value);
  const [isClient, setIsClient] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const { targetRef, isIntersecting } = useIntersectionObserver();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isIntersecting || hasAnimated) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < duration) {
        setCount(Math.min(Math.floor((value * progress) / duration), value));
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(value);
        setHasAnimated(true);
      }
    };

    if(typeof window !== "undefined") animationFrameId = requestAnimationFrame(animate);

    return () => {
      if(typeof window !== "undefined")
        cancelAnimationFrame(animationFrameId);
    };
  }, [isIntersecting, value, duration, hasAnimated]);

  return (
    <div ref={targetRef}>
      <span className={className}>
        {count}
      </span>
      {!isClient && (
        <noscript>{value}</noscript>
      )}
    </div>
  );
};

export default Counter;