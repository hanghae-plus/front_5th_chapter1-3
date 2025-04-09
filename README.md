## 과제 체크포인트

### 배포 링크

https://hanbeulyou.github.io/front_5th_chapter1-3/

### 기본과제

- [x] shallowEquals 구현 완료
- [x] deepEquals 구현 완료
- [x] memo 구현 완료
- [x] deepMemo 구현 완료
- [x] useRef 구현 완료
- [x] useMemo 구현 완료
- [x] useDeepMemo 구현 완료
- [x] useCallback 구현 완료

### 심화 과제

- [x] 기본과제에서 작성한 hook을 이용하여 렌더링 최적화를 진행하였다.
- [x] Context 코드를 개선하여 렌더링을 최소화하였다.

## 과제 셀프회고

지난 과제에서는 `Virtual DOM`을 직접 구현하며 리액트의 렌더링 구조와 이벤트 위임, `diffing` 알고리즘의 기초 원리를 몸으로 익혔다면, 이번 과제는 “리액트를 실제로 잘 쓰기 위해” 어떤 구조를 고민해야 하는지, 그리고 그 구조 속에서 어떻게 렌더링을 제어하고 최적화할 것인가에 집중한 시간이었다.

단순히 기능을 구현하는 것에서 벗어나, `Context` 분리, `memoization`, 렌더링 트래킹, 컴포넌트 리렌더링 최적화까지, 실제로 규모가 있는 리액트 앱을 운영할 때 어떤 고민이 필요한지를 작게나마 체감할 수 있었다.

이번 회고에서는 과제를 진행하며 마주친 고민들, 해결을 위한 시도, 그리고 끝내 해결하지 못했던 지점까지 포함해 정리해보고자 한다.

### 🛠️ 커스텀 훅과 렌더링 제어 도구 구현

리액트에서 성능을 고려한 렌더링 제어는 `useMemo`, `useCallback`, `memo` 등 다양한 도구를 통해 이루어진다. 이번 과제에서는 이 모든 도구를 직접 구현하며, 내부 원리와 동작 방식에 대한 깊은 이해를 쌓는 경험을 했다.

> 비교 함수 구현과 타입 안정성 고민

자바스크립트에서 객체와 배열은 모두 참조 타입으로, 같은 참조를 가진다면 내부 구조 또한 같다고 볼 수 있다. 하지만 두 값이 서로 다른 참조를 갖는 경우에는 얕은 비교와 깊은 비교가 각각 다른 목적과 방식으로 적용되어야 했다.

`shallowEquals`는 성능을 고려해 객체의 key 수가 같고, 각 key의 값이 `Object.is`를 기준으로 동일한지만 확인하도록 구현했다.
특히 `NaN` 비교나 `0`과 `-0` 문제에서 안전한 비교가 가능하도록 `===`이 아닌 `Object.is`를 사용했다.
또한 객체 여부를 판별하는 과정에서 `isObject` 헬퍼 함수를 함께 활용했다. 이 함수는 null을 걸러주기 위해 `typeof === "object"` 조건 외에 `value !== null`까지 함께 확인하는 방식으로 작성했다.

```ts
function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}
```

반면 `deepEquals`는 구조적으로 훨씬 더 복잡했다. 배열과 객체를 구분해 각각 재귀적으로 순회하면서 모든 요소 또는 속성 값을 비교해야 했고, 순서까지 고려해야 하므로 반복 구조가 필수였다. 구조가 조금만 복잡해져도 누락되기 쉬운 edge case들을 모두 포괄하려면, 비교 함수 내에서 방어적인 접근이 필수였다.

두 비교 함수는 단순히 동작만 하면 되는 도구가 아니라, 이후에 구현하는 `useMemo`, `useCallback`, `memo`의 신뢰성과 직접 연결되어 있었다. 특히 `deepEquals`는 잘못 사용할 경우 렌더링 최적화를 오히려 방해할 수 있기 때문에 비용과 효과를 고려한 선택이 중요함을 느꼈다.

> useRef 구현과 참조 안정성

`useRef`를 직접 구현하면서 가장 중요하게 체감한 건 렌더링 사이에서도 값이 초기화되지 않고 유지되어야 한다는 점이었다.

처음에는 `const obj = { current: null }`처럼 객체를 만들어 저장하면 될 것 같았지만, 함수 컴포넌트는 매 렌더링마다 다시 실행되므로 이 객체는 매번 새로 만들어져 초기화된다. 이를 해결하기 위해, 내부적으로 상태를 보존할 수 있는 저장소를 `useState`로 만들어 `state.current`로 접근 가능하게 설계했다. 또, React의 관용 스타일에 따라 기본값을 `null`이 아닌 `undefined`로 설정해 일관성을 유지했다.

이 과정은 단순한 훅 구현을 넘어, 렌더 주기와 메모리 참조의 차이, 그리고 불필요한 리렌더링을 방지하는 메커니즘을 직접 몸으로 익히는 경험이었다.

> useMemo 구현과 의존성 추적

`useMemo`는 의존성 배열이 변경되지 않으면 계산 결과를 재사용한다는 원리로 작동한다.

구현 과정에서는 `useRef`를 활용해 이전 결과와 의존성 배열을 저장하고, `shallowEquals`로 비교하여 재계산 여부를 판단하도록 구성했다.
의존성 비교가 부정확하거나 빠질 경우 불필요한 연산이 계속 발생하기 때문에, `useMemo`는 정확한 비교 함수와 참조 일관성 유지가 생명이라는 것을 알게 됐다. 특히 의존성 배열을 직접 다루면서, 리액트의 “불변성 유지”가 단순한 코드 규칙이 아니라 성능과 직결된 원칙임을 깨달을 수 있었다.

> useCallback 구현과 함수 참조 일관성

`useCallback`은 `useMemo`를 함수 전용으로 단순화한 형태다.

의존성 배열이 바뀌지 않는 한, 동일한 함수 인스턴스를 유지할 수 있게 해준다. `props`로 함수를 전달할 때 매번 새 함수가 생성되면 하위 컴포넌트는 `memo`로 감싸도 리렌더링되기 때문에, 이런 상황에서 `useCallback`을 사용하면 리렌더링을 방지할 수 있다.

이를 직접 구현하면서 의존성 배열을 비교해 함수 인스턴스를 관리하는 방식이 구조적으로 `useMemo`와 같다는 점, 그리고 함수도 결국 값처럼 캐싱할 수 있다는 점을 배웠다.

> 고차 컴포넌트(HOC) 구현

`memo`는 리액트에서 동일한 `props`가 들어올 경우 컴포넌트의 리렌더링을 건너뛰는 고차 컴포넌트(`HOC`)다.

이번 과제에서는 이를 직접 구현하며 `HOC`의 작동 방식과 내부 흐름을 구체적으로 확인할 수 있었다. 핵심은 이전 `props`와 현재 `props`를 비교해 같을 경우 컴포넌트를 다시 호출하지 않고 이전 결과를 그대로 반환하는 구조였다.

이를 위해 `useRef`를 활용해 이전 `props`와 컴포넌트 실행 결과를 저장했고, 매 렌더링마다 `shallowEquals`를 통해 비교한 뒤 필요 시에만 컴포넌트를 다시 실행하도록 했다. 또한 비교 전략을 외부에서 주입할 수 있도록 설계해 `deepMemo`처럼 더 정교한 비교가 필요한 경우에도 동일한 구조를 활용할 수 있도록 확장 가능성을 열어두었다.

이를 통해 `HOC`는 단순히 컴포넌트를 감싸는 도구가 아니라, 렌더링 조건을 세밀하게 제어할 수 있는 중요한 추상화 도구임을 이해할 수 있었다.

### 🧩 Context 분리와 Provider 설계

> 하나의 Context에서 역할 분리하기

처음에는 하나의 `AppContext`에서 모든 상태를 관리하고 있었지만, 실제 컴포넌트들이 필요로 하는 데이터가 각기 다르기 때문에 기능별로 `Context`를 분리하는 것이 더 나은 설계라는 판단을 내렸다.
이에 따라 `Theme`, `User`, `Notification` 각각의 상태와 액션을 독립된 `Context`로 분리하고, 필요한 범위에서만 `Provider`를 적용하는 방식으로 구조를 재설계했다.
또한 `Context` 내부의 값을 `state`와 `actions`로 나누어 관리함으로써, 실제 컴포넌트에서 필요한 데이터만 구독하게 만들어 불필요한 리렌더링을 줄이는 데 집중했다.
예를 들어 테마 정보를 사용하는 컴포넌트는 테마 값만 구독하고, 토글 함수를 사용하는 쪽에서는 액션만 가져가도록 설계했다.

```ts
// context/ThemeContext.tsx
const ThemeStateContext = createContext<"light" | "dark">("light");
const ThemeActionContext = createContext<() => void>(() => {});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  return (
    <ThemeStateContext.Provider value={theme}>
      <ThemeActionContext.Provider value={toggleTheme}>
        {children}
      </ThemeActionContext.Provider>
    </ThemeStateContext.Provider>
  );
};
```

이렇게 관심사에 따라 `Context`를 분리하고 역할 기반으로 `Provider`를 구성하면서, 코드의 응집도를 높이고 컴포넌트 간 결합도를 줄일 수 있었다.

구조는 최종적으로는 `Theme`, `User`, `Notification` 각각의 `Provider`를 최상단에서 한 번에 감싸는 구조를 선택했다. 이렇게 하면 각 컴포넌트들이 필요한 `Context`에 자유롭게 접근할 수 있고, `Provider` 중첩 구조를 신경쓰지 않아도 되기 때문이다.

물론 일부 `Context`만 필요한 컴포넌트가 존재할 때는 하위 범위에서 `Provider`를 감싸는 방식이 더 적절할 수도 있겠지만, 현재 과제의 구조와 요구사항을 고려했을 때는 최상단에서 한 번에 감싸는 것이 가장 단순하고 효율적인 방법이라고 판단해 적용했다.

> ComplexForm의 상태 관리와 리렌더링의 한계

`ComplexForm`은 다수의 입력 필드를 포함한 폼 컴포넌트로, 초기에는 `useState`를 사용해 전체 폼 데이터를 관리했다.

하지만 이 방식은 각 입력 필드가 바뀔 때마다 전체 폼이 리렌더링되는 문제를 일으켰다. 하위 컴포넌트인 `InputField`도 모두 리렌더링되면서 비효율적인 구조가 됐다.

이 문제를 해결하기 위해 `useReducer`를 도입했다. `useReducer`는 상태 업데이트의 분리와 명확한 액션 처리로 코드의 예측 가능성을 높이고, 상태 변경이 각 입력 필드에 독립적으로 이루어지게 하여 불필요한 리렌더링을 줄일 수 있다는 장점이 있었다.

하지만 `formData` 객체 전체가 갱신되는 구조에서는 여전히 상위 컴포넌트인 `ComplexForm`이 리렌더링되며, 하위 컴포넌트인 `InputField`들도 다시 렌더링되는 현상을 해결할 수 없었다.

```ts
// formReducer.ts
export interface FormState {
  // ...
}

type Action =
  | { type: "UPDATE_FIELD"; name: string; value: string | number }
  | { type: "TOGGLE_PREFERENCE"; preference: string };

export const initialFormState: FormState = {
  // ...
};

export function formReducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        [action.name]:
          action.name === "age" ? Number(action.value) || 0 : action.value,
      };
    case "TOGGLE_PREFERENCE":
      return {
        ...state,
        preferences: state.preferences.includes(action.preference)
          ? state.preferences.filter((p) => p !== action.preference)
          : [...state.preferences, action.preference],
      };
    default:
      return state;
  }
}
```

```ts
// useFormReducer.ts
export function useFormReducer() {
  const [formData, dispatch] = useReducer(formReducer, initialFormState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "UPDATE_FIELD",
      name: e.target.name,
      value: e.target.value,
    });
  };

  const handlePreferenceChange = (preference: string) => {
    dispatch({ type: "TOGGLE_PREFERENCE", preference });
  };

  return {
    formData,
    handleInputChange,
    handlePreferenceChange,
  };
}
```

이후, 비제어 컴포넌트(`uncontrolled input`)로 전환하여 리렌더링을 최적화하려 시도했었다. 비제어 컴포넌트는 리렌더링 없이 입력값을 처리할 수 있기 때문에, 이 방법으로 리렌더링 최적화를 시도했지만, 과제 테스트에서 “폼 입력 시 `ComplexForm`만 리렌더링되어야 한다”는 조건을 맞추는 데 문제가 있었다. 비제어 컴포넌트를 도입하면 `ComplexForm`이 리렌더링되지 않으므로 테스트 조건을 충족할 수 없었다.

결국 이 구조에서는 `formData`가 하나의 객체로 묶여 있는 한, 입력 하나가 바뀔 때마다 전체 폼이 리렌더링되는 문제를 완전히 피할 수 없었다. `useReducer`는 상태 관리의 명확성을 높여주었지만, 테스트 조건을 충족시키는 최적화를 이루지는 못했다.

이는 단순한 훅 변경이나 `memo` 적용만으로 해결될 수 있는 문제가 아니라, 컴포넌트 간 상태 구조와 렌더링 책임을 처음부터 어떻게 설계하느냐에 대한 문제라는 점을 다시금 깨닫게 해줬다.

### 🚀 렌더링 최적화와 성능 개선

렌더링 최적화는 과제 내내 중요한 고민거리였고, `memo`, `useMemo`, `useCallback` 같은 도구들을 활용하여 불필요한 렌더링을 방지하고 성능을 개선했다.

처음에는 1000개의 아이템을 기준으로 기본적인 최적화를 적용했지만, 10000개로 늘려가면서 렌더링 성능에 한계를 느꼈다. 이를 해결하기 위해 `React Profiler`를 활용해 렌더링 성능을 분석하고, 불필요한 렌더링을 최소화하는 방법을 찾아내었다.

> 렌더링 성능 개선 과정

`React Profiler`를 활용해 렌더링 시간을 측정했을 때, 아이템 수가 많아질수록 렌더링 시간이 급격히 증가하는 것을 확인했다.

이를 해결하기 위해 `filter === ''` 일 때 연산을 하지 않는 방법을 시도해 어느정도의 성능 개선이 되었지만, 근본적인 성능 개선을 위해 효과적인 방법이 필요했다.

많은 아이템이 화면에 존재하면서 렌더링 속도가 느려졌기 때문에, 성능을 개선할 수 있는 방법으로 `virtual list`를 적용했다.

```ts
// VisibleItemList.tsx

import { memo } from "../../hocs";
import { Item } from "../../types";
import { ItemRow } from "./ItemRow";

interface Props {
  getItem: (index: number) => Item;
  itemCount: number;
  theme: "light" | "dark";
  startIndex: number;
  endIndex: number;
  itemHeight: number;
}

export const VisibleItemList: React.FC<Props> = memo(
  ({ getItem, itemCount, theme, startIndex, endIndex, itemHeight }) => {
    const visibleCount = endIndex - startIndex;
    return (
      <>
        {Array.from({ length: visibleCount }).map((_, i) => {
          const actualIndex = startIndex + i;
          const item = getItem(actualIndex);
          if (!item) return null;
          return (
            <div
              key={actualIndex}
              style={{
                position: "absolute",
                top: actualIndex * itemHeight,
                left: 0,
                right: 0,
                height: itemHeight,
              }}
            >
              <ItemRow item={item} theme={theme} />
            </div>
          );
        })}
      </>
    );
  }
);
```

```ts
// ItemList.tsx

const ITEM_HEIGHT = 40;

export const ItemList: React.FC<{
  items: Item[];
  onAddItemsClick: () => void;
}> = memo(({ items, onAddItemsClick }) => {
  ...
  const listRef = useRef<HTMLDivElement>(null);

  const { startIndex, endIndex } = useVirtualScroll({
    containerRef: listRef,
    itemHeight: ITEM_HEIGHT,
    itemCount: filteredItems.length,
  });

  return (
    <div className="mt-8">
      ...
      <div
        ref={listRef}
        style={{
          position: "relative",
          height: filteredItems.length * ITEM_HEIGHT,
        }}
      >
        <VisibleItemList
          getItem={(index) => filteredItems[index]}
          itemCount={filteredItems.length}
          theme={theme}
          startIndex={startIndex}
          endIndex={endIndex}
          itemHeight={ITEM_HEIGHT}
        />
      </div>
    </div>
  );
});
```

이 방식은 화면에 보이는 아이템만 렌더링하여 성능을 크게 향상시켰고, 10000개의 아이템을 렌더링해도 렌더링 시간이 현저히 단축되었다.
하지만 `virtual list` 적용은 테스트 요구 사항을 충족시키지 못해 최종적으로 구현하지 못했다.

화면에 보이는 아이템만 렌더링함으로써 성능을 크게 개선할 수 있었지만, `virtual list`에서 보여야 할 개수가 브라우저 크기에 따라 동적으로 변하게 되어 그 값이 변함에 따라 `ItemList` 컴포넌트가 재렌더링되는 이슈가 발생했다. 테스트에서는 `ItemList`가 "단 한 번만 렌더링"되어야 한다는 요구 사항이 있었기 때문에, 이 방식은 테스트 조건과 충돌하여 최종적으로 적용을 완료하지 못했다.

### 🧠 느낀점

이번 과제에서는 리액트의 렌더링 성능 최적화와 관련된 여러 고민을 해결하려고 다양한 도구와 방법들을 적용해봤다. `useMemo`, `useCallback`, `memo` 등을 활용해서 불필요한 렌더링을 방지하려 했지만, 10000개 아이템을 처리하면서 성능 한계를 느꼈다. 그때마다 성능을 개선할 방법들을 고민했었고, `virtual list` 적용 후에는 성능이 크게 향상되는 걸 확인할 수 있었다.

그렇지만 `virtual list`는 테스트 조건을 맞추지 못해서 결국 구현하지 못했다. 화면에 보이는 아이템만 렌더링하는 방식으로 성능을 크게 개선할 수 있었지만, 테스트에서 요구하는 "단 한 번만 렌더링"을 충족하지 못해 아쉬웠다. 이런 과정들을 거치면서 실제 프로젝트에서 겪을 수 있는 성능 문제와 이를 해결하는 방법을 조금이나마 알게 된 것 같다.

이번 과제를 통해 성능 최적화에 대한 감각을 조금 더 쌓을 수 있었고, 앞으로도 비슷한 문제에 직면했을 때 어떻게 접근해야 할지에 대한 방향을 잡을 수 있게 되었다.

## 과제 중 질문 사항

### ComplexForm 리렌더링 최적화 관련 질문

`useReducer`를 사용하여 `ComplexForm`에서 상태 관리를 최적화하려 했지만, 여전히 입력 값이 변경될 때마다 상위 컴포넌트인 `ComplexForm`이 리렌더링되는 문제가 있었습니다.
이 문제를 해결하기 위해 다른 접근 방법이 있을까요? 리렌더링 최적화에서 놓친 부분이 있을지 궁금합니다.
비제어 컴포넌트를 사용하지 않고 해결할 수 있는 방법이 있을지도 궁금합니다.

### ItemList 최적화 관련 질문

`virtual list`를 적용하려 했지만, 테스트 조건에 맞추지 못해 구현하지 못했습니다.
화면에 보이는 아이템만 렌더링하는 방식 외에도 렌더링 최적화를 위한 다른 방안이 있을까요?
혹은 `virtual list`와 관련된 성능 최적화 방법이나, 테스트 요구사항을 충족할 수 있는 대안이 있을지 궁금합니다.

### 디렉토리 구조 관련 질문

FSD 구조를 적용하려고 했지만, 과제의 규모와 복잡도를 고려할 때 오버엔지니어링이 될 수 있다는 판단에 따라 적용을 피했습니다.
작은 규모의 프로젝트에서 FSD를 적용하는 것이 적합한지, 혹은 어떻게 더 간결하게 적용할 수 있을지 조언을 얻고 싶습니다.
