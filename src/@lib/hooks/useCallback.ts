import type { DependencyList } from "react";
import { useMemo } from "./useMemo";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useCallback<T extends (...args: any[]) => any>(
	callback: T,
	_deps: DependencyList,
) {
	// 직접 작성한 useMemo를 통해서 만들어보세요.
	const memoizedCallback = useMemo(() => callback, [..._deps]);

	return memoizedCallback as T;
}
