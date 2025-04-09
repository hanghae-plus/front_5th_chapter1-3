// 미사용 코드

import { useEffect, useState } from "react";

interface UseVirtualScrollProps {
  containerRef: React.RefObject<HTMLElement>;
  itemHeight: number;
  itemCount: number;
  overscan?: number;
}

export function useVirtualScroll({
  containerRef,
  itemHeight,
  itemCount,
  overscan = 10,
}: UseVirtualScrollProps) {
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(20);

  const requestIdleCallback =
    window.requestIdleCallback ||
    function (cb: () => void) {
      return setTimeout(cb, 1);
    };

  const cancelIdleCallback =
    window.cancelIdleCallback ||
    function (id: number) {
      clearTimeout(id);
    };

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const offsetTop = rect.top + window.scrollY;
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;

      const visibleStart = Math.floor((scrollTop - offsetTop) / itemHeight);
      const visibleEnd = Math.ceil(
        (scrollTop - offsetTop + viewportHeight) / itemHeight
      );

      setStartIndex(Math.max(0, visibleStart - overscan));
      setEndIndex(Math.min(itemCount, visibleEnd + overscan));
    };

    const idleId = requestIdleCallback(() => {
      onScroll();
    });

    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);

    return () => {
      cancelIdleCallback(idleId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [containerRef, itemHeight, itemCount, overscan]);

  const visibleItems = Array(endIndex - startIndex).fill(null);

  return {
    startIndex,
    endIndex,
    visibleItems,
  };
}
