
## useRef
과제를 진행할 때는 의심 없이 아래 코드를 작성했는데 돌이켜 보니 이해되지 않은 부분이 있었다. 
`useRef`를 사용할 때 렌더링 될텐데 `state`값을 반환한다고 리렌더링이 발생하지 않는 이유가 뭘까 생각했다.

`state`는 상태값이고 이전 값과 비교해 변경되면 리렌더링을 트리거한다. 트리거 시키는 도구로 우리는 `setState`를 사용한다. 
우리가 구현한 `useRef`는 `setState`를 사용하지 않아 `state` 값이 변경되지 않고, 사용처에서 렌더링 되어도 같은 참조값을 보고 있어 내용을 유지할 수 있는 것이다.

* `useRef`는 내부적으로 `useState`를 써서 참조 객체를 한 번만 만들고 고정시킴.
* `ref.current`는 자유롭게 변경 가능하지만, `setState`를 사용하지 않으므로 리렌더링은 발생하지 않음.

```tsx
export function useRef<T>(initialValue: T): { current: T } {
  const [state] = useState({ current: initialValue });

  return state;
}
```
```tsx
import { useRef } from "./useRef";

const ref = useRef(null);
```

## useMemo & useCallback
구현해보니 동작의 원리 자체는 감이 왔다. 비교를 해서 의존성 배열이 변경 되었을 경우에만 새로운 값을 계산하고 반환하는 구조였다. 이걸 통해 불필요한 연산을 줄일 수 있다는 것도 알게 되었다. 리액트스럽게 무언가 추가되어야 한다면.. 순서를 관리한다는 것..? 

* `useMemo`와 `useCallback`은 결과를 재사용(memoization) 하기 위한 훅이다.
* 내부적으로는 factory() 또는 callback 함수를 실행하고, 의존성 배열이 바뀌지 않으면 이전 값을 재사용한다.
* 이로 인해 불필요한 계산/함수 생성을 줄이고 성능 최적화가 가능하다.
* [추가] `React`는 훅의 순서를 엄격하게 관리한다.
  * `useMemo`나 `useCallback`은 컴포넌트 내에서 정해진 순서로 호출되어야 함.

<br/>

## 🙄🔫 트러블 슈팅: Context 분리 후 불필요한 리렌더 발생했다
### 👀 문제 상황
context를 분리하는 과정에서, `Header` 컴포넌트가 불필요하게 리렌더링되는 현상이 발생했다.
[제출] 클릭 시 `Header`가 렌더링되었고, 실제로 유저 정보가 바뀌지 않았음에도 불구하고 리렌더되는 문제였다.!!

### 🛠 원인 분석
 `useUserStore`에서 값을 return 할때 객체로 보내주고 `useUserContext`에서 `useMemo`로 감싸서 value 할당해주는 방식으로 진행했다. 
이게 완전 `useMemo`를 잘 못 사용한 방식이었는데...  `const store = useUserStore()` 에서는 렌더링 될때마다 새로운 객체가 전달되어 이걸 구독한 `Header`가 렌더링 된 것이엇다.
```tsx
// useUserStore.ts
export const useUserStore = () => {
  const [user, setUser] = useState<User | null>(null);

  const login = useCallback(() => { ... }, []);
  const logout = useCallback(() => { ... }, []);

  return {
    user,
    login,
    logout, 
  };
};
```

```tsx
// useUserContext.tsx
  const store = useUserStore(); // ❗매번 새로운 객체 

  const userContextValue = useMemo(() => store, [store]); // ❗ 문제

```

### ✅ 해결방법
useUserStore 내부에서 useMemo를 사용해 return 객체의 참조를 고정시켜 렌더링 되어도 참조값이 변하지 않도록 해주었다.
```tsx
export const useUserStore = () => {
  const [user, setUser] = useState<User | null>(null);
  const { addNotification } = useNotificationContext();

  const login = useCallback(() => { ... }, [addNotification]);
  const logout = useCallback(() => { ... }, [addNotification]);

  const userContextValue = useMemo(() => {
    return {
      user,
      login,
      logout,
    };
  }, [user, login, logout]); // ✅ 요기

  return userContextValue;
};
```

<br/>

## 🤔 가졌던 고민들 

### 계산이 비싼지 어떻게 알 수 있지?
궁금했던 부분이 공식문서에 나와있길래 확인해보았다. useMemo를 사용해야하는 부분에 대해 고민할 때 하나의 기준이 될 수 있을 것 같다고 생각했다. 양이 많아질수록 시간도 늘어나게 되면서 효과가 있다! 고 판단할 수 있었다.
매번 이런식으로 사용할 수 없기때문에 자동으로 알려주는 도구를 사용해야겠다고 생각했다.. [why-did-you-render](https://github.com/welldone-software/why-did-you-render)


```tsx
  console.time("filter array");
  const filteredItems = useMemo(() => {
    return items.filter(
      (item) =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.category.toLowerCase().includes(filter.toLowerCase()),
    );
  }, [filter, items]);
  console.timeEnd("filter array");
```

|  |          useMemo 사용 전            |           useMemo 사용 후           |
|-|-----------------------------|------------------------------|
| 20000개 |<img width="341" alt="image" src="https://github.com/user-attachments/assets/de7c691d-83f5-4547-b01b-c5079835136d" />|<img width="331" alt="image" src="https://github.com/user-attachments/assets/a60a59ae-77cf-4e2f-8643-58042b96df14" />|
|40000개|<img width="280" alt="image" src="https://github.com/user-attachments/assets/3f6692d1-983e-4809-be4a-7eb5d8ab6ff9" />|<img width="312" alt="image" src="https://github.com/user-attachments/assets/c7d93b23-da96-4aed-9a78-79924d368da1" />|

<br/>


### memo, useMemo, useCallback을 무조건 사용해야하나?
문득 과제를 완료하고 남은 생각은 `모든 컴포넌트, 함수에 이런 hooks을 사용하면 최적화 되는게 아닌가? `라는 생각을 가지게 되었다. 그럼 애초에 리액트는 왜 이들을 장착하지 않고 별도로 제공했을까... 하는 의문이 들었는데 해답은 역시나 공식 문서에 있었다. 정리해보면...

* memo  컴포넌트가 정확히 동일한 props로 자주 리렌더링되고 리렌더링 로직이 비효율적일 때만 최적화가 유용하다.
* 컴포넌트가 리렌더링될 때 눈에 띄는 지연이 없다면 최적화는 불필요하다.
* 개별적인 사례를 고려하지 않고 최대한 메모이제이션을 활용한다면 코드의 가독성이 떨어질 것이다.

등등 무분별한 사용을 지양하라는 안내가 있어서 이해되었다.
> 특정 상호작용이 여전히 지연되는 것처럼 느껴진다면 [React Developer Tools 프로파일러를 사용하여](https://legacy.reactjs.org/blog/2018/09/10/introducing-the-react-profiler.html) 어떤 컴포넌트가 메모이제이션의 이점을 가장 많이 얻을 수 있는지 확인하고 필요한 경우 메모이제이션을 추가하세요.

<img width="916" alt="image" src="https://github.com/user-attachments/assets/65874a7a-722e-434e-91ba-34ff5901f8f0" />

[🔗 참고 링크](https://react.dev/reference/react/memo#usage) 
