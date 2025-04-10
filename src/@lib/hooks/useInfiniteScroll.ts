import React, { useEffect } from "react";

interface useInfiniteScrollProps {
  targetRef: React.RefObject<Element>;
  callback: () => void;
  options?: IntersectionObserverInit;
}

export const useInfiniteScroll = ({
  targetRef,
  callback,
  options,
}: useInfiniteScrollProps) => {
  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          callback();
        }
      },
      options ?? { threshold: 1.0 },
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
      observer.disconnect();
    };
  }, [targetRef, callback, options]);
};
