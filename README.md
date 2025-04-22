## 과제 체크포인트

### 배포 링크

https://singyukang.github.io/front_5th_chapter1-3/

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

## 과제 셀프회고 + 기술적 성장 + 문제상황 정리

### (1)  shallowEquals 분기처리

```javascript
export function shallowEquals<T>(objA: T, objB: T): boolean {
  if (typeof objA === "number" && typeof objB === "number") {
    if (objA === objB) {
      return true;
    }
    return false;
  }

  if (typeof objA === "string" && typeof objB === "string") {
    if (objA === objB) {
      return true;
    }
    return false;
  }

  if (typeof objA === "boolean" && typeof objB === "boolean") {
    if (objA === objB) {
      return true;
    }
    return false;
  }

  if (objA === null && objB === null) {
    return true;
  }
	//...
  return objA === objB;
}

```
초기 `number` `boolean` `null` `undefined` 등 원시값들을 `if` 를 통해 `분기처리`를 진행 하였는데 
`코드가 너무 길어지고` `너무 많은 분기처리`에 내가 헷갈리는 상황이 왔습니다.
자료를 찾아보니 `Object.is` 를 통해 `원시값 비교`를 할수 있는 것을 발견하였고 이를 사용

```javascript
  if (Object.is(objA, objB)) {
    return true;
  }
```

### (2)  shallowEquals vs deepEquals

테스트 코드에 `얕은 비교`와 `깊은 비교`가 있는 것을 보고 
아마 이 과제에서는 이것이 `킥`일것이다 라고 생각하여 조사를 진행! 
이 둘의 `차이점`에 대해서 조사를 진행을 하였고 `실제 React에서 언제 사용`하는지 조사를 시작

#### 1. 얕은 비교(Shallow Equals)

  - 객체의 최상위 속성만 비교
  - 중첩된 객체는 참조값만 비교
  - 원시값 비교는 그대로


#### 2. 깊은 비교(Deep Equals)

  - 주소값이 아닌 객체의 모든 요소가 같은지 비교
  - 재귀적으로 비교를 진행하여 원시값확인

만약에 `배열의 depth가 만개`가 있다고 하자 
`깊은 비교`를 통해 진행을 할 경우 `만번의 비교`를 통해서 이 값이 이전과 다른지 확인을 해야하지만 
`얕은 비교`를 진행을 하면 `제일 윗 depth`만 확인을 하기 때문에 깊은 비교에 비하여 `속도가 빠르다는 장점`이 있습니다.

여기서 저는 `얕은 비교`와 `깊은 비교`를 도대체 `언제` 사용해야 하냐에 궁금증이 생겼으며 다음과 같이 정리를 하였습니다.

`하나의 depth`의 검증만으로 충분하다고 판단이 되었을 떄는 `얕은비교!`

흠… 어떠한 자료들은 `끝까지 들여다 봐야` 저장을 할지 말지 판단이 되겠는데? 싶으면은 `깊은비교`를 사용해야한다고 정리하였습니다.

`React.memo`를 생각을 해보자. React 개발자 분들은 아마 생각했을것이다 → 컴포넌트 내에서 `props`가 변경이 있으면은 `리렌더링`을 시켜주는 것으로 하자! 이때 `얕은 비교`와 `깊은 비교`중에 어떤 거를 선택하는게 더 나을까?

`props`라는 것은 `depth가 1층`으로 충분히 비교가 가능한 형태 -> 그렇기 때문에 단순히 `props만 비교`하는 것은 비용이 상대적으로 적은 얕은 비용을 선택을 하자! 

props이외에 `컴포넌트가 depth가 1층 보다 많이 들어가야할때` 깊은 비교가 필요하다 이렇게 이해를 하였습니다


### (3)  useMemo, useRef

`useMemo`에서 가장 중요한 점은 `리렌더링이 되어도 같은 객체({ current: ... })를 계속 유지`하는지 테스트를 하는것!

왜 `useRef` 구현에 `useState`를 쓰는가? 이건 `React의 컴포넌트가 리렌더링`될 때 `데이터가 어떻게 유지`되는가 랑 연결이 됩니다

컴포넌트가 리렌더링되면, 함수는 다시 호출이 되게 되는데
`const ref = { current: ... };`
이렇게 만들면 **매번 새로운 객체**가 생성이 됩니다.

`useState`는  `React 내부 메모리 구조(훅 슬롯)에 저장`돼서 리렌더링 중에도 값을 기억하며 다음 렌더에서도 같은 값이 반환되게 되는 것 입니다 가장 중요한 것은 같은 값 유지 !! → `"객체가 한 번만 생성되게"` 구현

```javascript
export function useMemo<T>(
  factory: () => T,
  _deps: DependencyList,
  _equals = shallowEquals
): T {
  // 1. 이전 의존성과 결과를 저장할 ref 생성
  const prevDependency = useRef<DependencyList | null>(null);
  const result = useRef<T | null>(null);
  // 2. 현재 의존성과 이전 의존성 비교
  const isChanged =
    !prevDependency.current || !_equals(prevDependency.current, _deps);
  // 3. 의존성이 변경된 경우 factory 함수 실행 및 결과 저장
  if (isChanged) {
    result.current = factory();
    prevDependency.current = _deps;
  }
  // 4. 메모이제이션된 값 반환
  return result.current as T;
}
```

#### ✅ `useMemo` 작동 원리 요약

#### 1. **비싼 계산값(`factory()`)은 한 번 계산 후 저장**

→ `result.current`에 저장해둠.

#### 2. **다음 렌더 시, `deps`를 얕은 비교(`shallowEquals`)**

→ 이전 의존성(`prevDependency.current`)과 현재 의존성(`_deps`)을 비교.

#### 3. **의존성이 바뀌었으면?**

- 다시 `factory()` 호출해서 새로운 계산 결과 얻기
- 그걸 `result.current`에 업데이트
- `prevDependency.current`도 최신 `deps`로 업데이트

#### 4. **바뀌지 않았으면?**

- `factory()` 호출 안 함 ❌
- `result.current`의 **캐싱된 값만 그대로 리턴** ✅


### (4)  관심사 분리
기존 코드에는 `theme` `user` `notification` 세 가지의 관심사가 하나로 뭉쳐져 있었습니다.
❌ 관심사가 분리되지 않은 경우
```javascript
  const contextValue: AppContextType = {
    theme,
    toggleTheme,
    user,
    login,
    logout,
    notifications,
    addNotification,
    removeNotification,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div
        className={min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}}
      >
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 md:pr-4">
              <ItemList items={items} onAddItemsClick={addItems} />
            </div>
            <div className="w-full md:w-1/2 md:pl-4">
              <ComplexForm />
            </div>
          </div>
        </div>
        <NotificationSystem />
      </div>
    </AppContext.Provider>
```
`advanced 테스트 코드` 중에 `Notification 알림 추가 및 닫기`시에 `헤더 컴포넌트는 렌더링 되지 않게` 하기위해  `notifications`에 대한 정보와 그에 대한 함수를 `useMemo`를 통해 저장해야 하는 상황이 있었습니다. 
기존 코드에서는 `notification` 하나 수정하려고 해도 다른 요소인 `user, theme 등 불필요한 값들도 모두 확인해야 하는 불편함`이 있었습니다 
이를 통해 로직이 얽혀 있어서 `작은 변경에도 전체에 영향을 주는 문제점`이 발생

```javascript
 it("알림 추가 및 닫기시 ComplexForm, NotificationSystem만 리렌더링되어야 한다", async () => {
    render(<App />);
    renderLogMock.mockClear();

    const submitButton = await screen.findByText("제출");
    await fireEvent.click(submitButton);

    expect(renderLogMock).toHaveBeenCalledWith("NotificationSystem rendered");
    expect(renderLogMock).toHaveBeenCalledWith("ComplexForm rendered");
    expect(renderLogMock).toHaveBeenCalledTimes(2);
    renderLogMock.mockClear();

    // 알림 닫기 버튼 찾기 및 클릭
    const closeButton = await screen.findByText("닫기");
    await fireEvent.click(closeButton);

    expect(renderLogMock).toHaveBeenCalledWith("NotificationSystem rendered");
    expect(renderLogMock).toHaveBeenCalledWith("ComplexForm rendered");
    expect(renderLogMock).toHaveBeenCalledTimes(2);
  });
```

```javascript
export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback(
    (message: string, type: Notification["type"]) => {
      setNotifications((prev) => [...prev, { id: Date.now(), message, type }]);
    },
    []
  );

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
    }),
    [notifications, addNotification, removeNotification]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("NootificationProvider context Error");
  }
  return context;
};


const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};
```

`관심사 분리`를 통해 내가 만약에 `알림 기능에 대한 memo 작업`을 해야한다 싶으면은 
다른 요소를 생각하지 않고 `특정 기능 단독으로 관리하고 최적화`가 가능!

### (5)  useMemo + useCallback + ContextAPI 이해
```javascript
    
const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const [items, setItems] = useState(() => generateItems(1000));

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };

  return (
    <div
      className={min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}}
    >
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:pr-4">
            <ItemList items={items} onAddItemsClick={addItems} />
          </div>
          <div className="w-full md:w-1/2 md:pl-4">
            <ComplexForm />
          </div>
        </div>
      </div>
      <NotificationSystem />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (message: string, type: Notification["type"]) => {
    setNotifications((prev) => [...prev, { id: Date.now(), message, type }]);
  };

  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const value = { notifications, addNotification, removeNotification };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("NootificationProvider context Error");
  }
  return context;
};
```
테스트 코드 중 `Notification 알림 추가 및 닫기시에 헤더 컴포넌트는 렌더링 되지 않게` 가 있었는데 

기존 코드에서 알림 추가, 닫기 버튼을 누르면은 `<Header />` 컴포넌트는 `Provider`안에 있었기 때문에 `리렌더링`이 발생을 합니다. 

그렇다면은 최적화를 진행했을때 왜 `<Header />` 가 `리렌더링이` 되지 않는거지? `헤더컴포넌트에 memo로 캐싱`을 하였지만 `props`가 변화한게 아닌 부모 컴포넌트를 통한 리렌더링 일텐데..?

아무리 `useMemo`를 통해 캐싱을 했어도  분명히 `notifications의 상태는 변화`하였고 `useMemo는 새로운 notification을 전달` `NotificationProvider에서 상태 변화를 감지`하고 `그 내부에 있는 AppContent(자식컴포넌트)는 리렌더링`이 진행이 되어야 한다고 생각했습니다.

```javascript
    <ThemeProvider>
      <NotificationProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </NotificationProvider>
    </ThemeProvider>
    
    <div
      className={min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900 text-white"}}
    >
      <Header />
      <NotificationSystem />
    </div>
    
    
   const addNotification = useCallback(
    (message: string, type: Notification["type"]) => {
      setNotifications((prev) => [...prev, { id: Date.now(), message, type }]);
    },
    []
  );

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      notifications,
      addNotification,
      removeNotification,
    }),
    [notifications, addNotification, removeNotification]
  );
```

#### 중요한 것은 객체!!!!

```javascript
<NotificationContext.Provider
  value={{
    notifications,
    addNotification,
    removeNotification,
  }}
>
```
`Provider의 value`를 매번 새로 생성하는 경우 `매 렌더링마다 새로운 객체 레퍼런스 전달` → 이를 통해 `AppContent가 리렌더링` 되면서 `<Header />가 리렌더링`하게 됩니다.


useMemo를 사용했을 경우
```javascript
const value = useMemo(
  () => ({
    notifications,
    addNotification,
    removeNotification,
  }),
  [notifications, addNotification, removeNotification]
);
```
`notifications`가 변하면은 물론 `value`는 변하게 됩니다(레퍼런스 새로 생성)

그럼에도 `Header가 리렌더링이 안 되는 이유`는

`Context`가 바뀌었을 때 리렌더링 되는 건 `Context 소비자!!` 입니다

처음에는 잘 이해가 가지 않았는데

```javascript
<NotificationProvider>  // value가 바뀜
  <AppContent>          // useNotification 안 씀
    <Header />          // useNotification 안 씀
    <NotificationSystem />  // 여기서만 useNotification 사용
  </AppContent>
</NotificationProvider>
```

`value`가 바뀌었을때 리렌더링되는 것은 `useNotification`을 사용하는 `NotificationSystem`

→ `AppContent`, `Header`는 `context를 소비하지 않았기 때문`에 `리렌더링`이 발생하지 않게 됩니다.

하지만 `value`가 `useMemo`를 통해 레퍼런스를 유지하지 못하면(객체 생성을 매번 하게 되면) → `React는 “모든 하위 컴포넌트가 소비자일 수 있다”`고 확인하여 `리렌더링을 진행`하게 됩니다.

즉, `useMemo` 없이 `value가 매번 새로 생성`이 되면은

`React는 <NotificationContext.Provieder>` 안에 있는 `모든 자식을 리렌더링 대상`으로 판단하게 됩니다.

정리를 하면은 `notifications` → `배열(레퍼런스)`

`useMemo`를 통해 `레퍼런스를 저장` vs 기존방식으로 리렌더링하면은 `value가 초기화 되어 레퍼런스 새로 생성`

`Context.Provider`의 `value`가 매번 새 객체면, 하위 전부 리렌더링.

`useMemo`로 레퍼런스 저장시, 오직 `useContext` 소비자만 리렌더링.
<img width="238" alt="스크린샷 2025-04-11 오전 3 12 14" src="https://github.com/user-attachments/assets/a077cbea-c8ea-4215-a25e-d870a1fe211d" />


### (6) 리렌더링 발생조건 확인

https://github.com/user-attachments/assets/6cccb22e-2263-4233-8e35-2e4e2107bca9

`light bg-gray` 를 포함한 `<div> 태그`에 `props가 변경`이 되면은 `리렌더링이 발생`하게 되고 
`Header <ItemList> <NotificationSystem>` 은 `theme div` 내부에 있기 때문에(자식 컴포넌트) 
`부모 컴포넌트가 렌더링이 일어나게 되면은 자식 컴포넌트 리렌더링`이 발생하게 된다

### (7) 초기 State 고비용 계산

https://github.com/user-attachments/assets/2275269c-f0da-4997-bcd1-af32435f5b87

```javascript
  it("여러 작업을 연속으로 수행해도 각 컴포넌트는 필요한 경우에만 리렌더링되어야 한다", async () => {
	  ...
	  expect(generateItemsSpy).toHaveBeenCalledTimes(1); // I got 2
  }
  
  const [items, setItems] = useState(generateItems(1000));

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };
```

영상을 확인해보면 단순히 `theme`가 변하는 것인데 `generateItems(1000)`이 실행되는 것을 확인할 수 있다.

지금은 `1000번이지만 만약 만번 수억번` `item을 발생`시킨다면은 너무 `비효율` 적일 것이다.

그럼 지금 문제는 `매 렌더마다 무거운 실행이 일어나게 되는것`이고 `초기 렌더에 한 번만 실행`을 하면 되겠네?

Lazy Initialization :  https://ko.legacy.reactjs.org/docs/hooks-reference.html#usestate

자료를 확인해보면 

```jsx
initialState 인자는 초기 렌더링 시에 사용하는 state입니다. 
그 이후의 렌더링 시에는 이 값은 무시됩니다. 
초기 state가 고비용 계산의 결과라면, 초기 렌더링 시에만 실행될 함수를 대신 제공할 수 있습니다.
```

이를 이용하면은 이건 **초기 렌더에서만** 값을 호출하고 이후 리렌더링시에는 절대 실행하지 않도록 할수있습니다.

이를 `Lazy Initialization` 이라고 합니다.

### (8) 불필요한 헤더 리렌더링
https://github.com/user-attachments/assets/ccb1207f-1438-49d3-bd2d-6f19fa92fa39

추가적으로 진행을 해본것은 `대량추가` 버튼 클릭시에 `헤더가 리렌더링`이 되는것을 확인할 수가 있는데, 
이는 맞지 않다고 생각을 하여 `최적화를 진행`해보았습니다.

대량추가 버튼을 클릭시에 `items 상태가 변화`하게 되고 이는 `리렌더링의 조건을 만족`하게 됩니다.
```javascript
const AppContent: React.FC = () => {
  const { theme } = useTheme();
  const [items, setItems] = useState(() => generateItems(1000));

  const addItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      ...generateItems(1000, prevItems.length),
    ]);
  };
  
  <div>
	  <Header />
  </div>
```

그렇게 되면은 자식 컴포넌트인 `Header는 당연히 리렌더링`이 일어나게 됩니다.

여기서 저는 `Header의 props`는 변경이 되지 않으니 `props변화를 감지해주는 memo`를 통해 진행을 하였습니다.

```javascript
export const Header: React.FC = memo(() => {
...
}
```


https://github.com/user-attachments/assets/02de19d0-9287-4d93-a7bc-b88949cef9ba


이를 통해 헤더 컴포넌트가 대량추가 버튼 클릭시에 리렌더링이 발생하지 않는것을 확인하실 수 있습니다.


## 리뷰 받고 싶은 내용

개발 외적인 질문인거같긴한데..

준일 코치님의 블로그를 보면서

`자기 자신에 대한 솔직한 얘기`를 물 흐르듯이 자연스럽게 잘 쓰시는 거를 보고

아 나도 글을 잘 써보고 싶다 라는 생각을 가지게 되었습니다.

`나의 생각을 상대방에게 잘 전달할 수 있는 방법`이나 `글을 잘 쓰기 위한 과정이나 준비?` 가 궁금합니다.
