"use client";

import { useEffect, useRef, useState } from "react";

// 커스텀 훅: useIntersectionObserver
export function useIntersectionObserver(options: IntersectionObserverInit = {}) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
      if (entry.isIntersecting) {
        observer.disconnect();
      }
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (observer && observer.disconnect) observer.disconnect();
    };
  }, [options]);

  return { targetRef, isIntersecting };
}