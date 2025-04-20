## 과제 체크포인트

### 배포 링크

- https://d5br5.github.io/front_5th_chapter1-3/

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

js로 직접 렌더링하는 지난 과제들에서 더 나아가, 이번엔 react와 typescript로 SPA를 구성해보는 시간을 가졌습니다. 
함수형 컴포넌트의 핵심인 react hook, 그 중에서도 useMemo, useRef, useCallback을 직접 구현해보았습니다. 
이 훅들은 의존성 배열을 비교하여 memoization 된 값을 재활용하고 있습니다. 
의존성 비교시 사용되는 diff 알고리즘 또한 직접 구현해보고, 원리를 파악하는 시간을 가졌습니다. 

‘함수형 컴포넌트과 hook. 이것이 react의 존재 이유가 아닌가?’ 코치님의 말씀에 크게 공감하였습니다. 
저는 현업에서 class형 컴포넌트를 함수형 컴포넌트로 전환하는 작업을 적지 않게 했습니다. 
복잡한 라이프사이클 메서드와 다양한 관심사로 거대해진 class형 컴포넌트는, 
훅과 함수형 컴포넌트를 활용하면 작고 깔끔하게 분리될 수 있었습니다. 
다양한 관심사를 분리하고, 책임 범위를 좁혀 더욱 testable한 컴포넌트가 될 수 있었습니다. 
SPA 생태계에 Vue, Angular 등 많은 강자들이 존재했지만, 결국 React가 시장을 먹어버린 데에는 이 hook의 역할이 컸던 것 같습니다. 
이렇게 hook을 자주 사용해왔다 보니, 이번 과제를 더 알차게 할 수 있었던 것 같습니다.

### diff 알고리즘 구현

인자로 들어온 두 값이 같은지 비교하는 함수입니다. 

인자의 타입이 다양할 수 있으므로, 다음과 같이 구조를 생각해보았습니다.

1. 단순 일치 비교를 먼저 수행한다. → 둘 다 원시형이면 여기서 걸러진다.
2. 둘 중 하나만 object 타입이면 false → 둘다 object면 다음 step으로
3. object key 개수가 일치하는지 확인
4. 모든 key에 대해 값이 동일한지 확인

```tsx
const isObj = (obj: unknown): obj is Record<string, unknown> => {
  return obj !== null && typeof obj === "object";
};

export function shallowEquals<T>(objA: T, objB: T): boolean {
  // 원시타입 비교 (둘 다 원시타입이면 여기서 걸러짐)
  if (objA === objB) return true;

  // 둘 다 원시타입일때 비교는 위에서 했으므로, 하나만 원시타입이면 false
  if (!isObj(objA) || !isObj(objB)) return false;

  // 둘다 객체인 상태. key 개수 비교
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  // key 개수는 같으므로, 모든 key값에 대한 value 비교
  return keysA.every((key) => objA[key] === objB[key]);
}
```

이렇게 작성하고 보니, 뭔가 불안했습니다. 
javascript 자료형 비교시, 여러 엣지 케이스가 존재했던 기억이 났습니다. 
예를 들면, null 과 null 은 서로 같지만 NaN과 NaN은 서로 달랐습니다. 
내 코드가 이런 경우를 다 커버할 수 있을까? 답은 No 였습니다. 
그럼 저런 경우의 수를 다 점검해줘야 하는가? 이것은 뭔가 아니다 싶었습니다. 
물론 deep level 로 구현하려면 직접 체크해줘야겠지만,, 지금 그렇게까지 해야하나 싶었습니다. 
그러다 `Object.is` 메소드의 존재가 기억났습니다. 

![image (9)](https://github.com/user-attachments/assets/19ed5c23-e764-4240-91b4-4fc8eb772a02)


React에서도 얕은 비교시 Object.is를 사용하고 있었기에, 제가 생각했던 여러 예외를 커버할 수 있도록 일치 비교에서 이 메서드로 교체하였습니다. (일치 비교로 놔둬도 테스트 케이스를 모두 통과하기는 했습니다)

deep equals에서도 크게 달라지는 부분은 없었습니다.

value가 객체 타입인 경우, 그 내부에 대해서 재귀적으로 비교를 수행해주면 되었습니다.

```tsx
// shallow equal
return keysA.every((key) => objA[key] === objB[key]);

// deep equal
return keysA.every((key) => deepEquals(objA[key], objB[key]));
```

### `App.tsx` 최적화하기

모든 코드가 하나의 파일에 합쳐져 있는 App.tsx를 리팩토링해보았습니다.
개선이 필요한 점은 크게 다음과 같이 정리할 수 있었습니다.

1. 모든 상태가 한 곳에서 정의되어 있다. theme, items, user, notification 등 구분 가능한 상태들이 하나의 context로 전달된다.
2. state, 함수, 컴포넌트가 memoization 되고 있지 않다. 

이 두가지만 개선해도 최적화가 마무리될 것이라는 느낌을 받을 수 있었습니다. (그런 느낌을 받도록 설계된 과제라는 생각도..)

먼저, 서로 다른 관심사의 state, 함수를 별도의 context로 분리했습니다. 
예를 들어, user와 관련된 상태와 함수는 다음과 같이 분리할 수 있었습니다.

```tsx
export interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within an UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const { addNotification } = useNotificationContext();

  const login = useCallback(
    (email: string) => {
      setUser({ id: 1, name: "홍길동", email });
      addNotification("성공적으로 로그인되었습니다", "success");
    },
    [addNotification],
  );

  const logout = useCallback(() => {
    setUser(null);
    addNotification("로그아웃되었습니다", "info");
  }, [addNotification]);

  const contextValue = useMemo(
    () => ({ user, login, logout }),
    [user, login, logout],
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

```
다른 관심사들에 대해서도 동일한 구조로 context, provider를 분리했습니다.
이렇게 분리한 provider는, 바로 body에 감싸주지 않고, providers 라는 중간 컴포넌트에 몰아두었습니다.

```tsx
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <NotificationProvider>
        <UserProvider>
          <ItemProvider>{children}</ItemProvider>
        </UserProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
};
```

이렇게 하면 provider가 추가될 경우 main 혹은 App.tsx를 직접 수정하지 않아도 되고, 
providers의 내부 구조를 다른 컴포넌트들이 신경쓰지 않아도 됩니다.

여기서 중요한 것은, NotificationProvider와 UserProvider의 순서입니다.
위 코드를 보면 알 수 있듯이, user context 내에서 notification hook을 사용하고 있습니다. 
provider가 이 상태, 함수를 자식들에게 내려주기 때문에, 순서가 바뀌면 사용할 수 없습니다. 

또, memoization을 적용했습니다.

- context 로 내려줄 함수들에 useCallback을 적용했습니다.
- context로 내려줄 value 에 useMemo를 적용했습니다.
- header, item-list 등의 컴포넌트에 memo를 적용했습니다.

분리된 녀석들은 관리하기 쉽게 별도 파일로 분리하고, 적절히 그룹화했습니다.

App은 다음과 같이 깔끔해졌습니다. 

```tsx
const App: React.FC = () => {
  return (
    <Providers>
      <ThemedBackground>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 md:pr-4">
              <ItemList />
            </div>
            <div className="w-full md:w-1/2 md:pl-4">
              <ComplexForm />
            </div>
          </div>
        </div>
        <NotificationSystem />
      </ThemedBackground>
    </Providers>
  );
};
```

#### 그래서 얼마나 최적화 되었나??

실제 렌더링 결과 지표를 비교해보도록 하겠습니다.

<table>
  <thead>
   <th>항목</th>
   <th>전후 구분</th>
   <th>렌더링 그래프</th>
   <th>지표</th>
  </thead>
  <tbody>

  <tr>
    <td rowspan="2">최초 렌더링</td>
    <td>전</td>
    <td><img src="https://github.com/user-attachments/assets/71139f33-ca0e-49fc-b5b0-3e8075aac1a9"/></td>
    <td></td>
  </tr>
  <tr>
    <td>후</td>
    <td><img src="https://github.com/user-attachments/assets/7547aa51-cd3b-40dc-85ea-0f0d5ae29442"/></td>
    <td></td>
  </tr>

  <tr>
    <td rowspan="2">테마 전환</td>
    <td>전</td>
    <td><img src="https://github.com/user-attachments/assets/cd6e5864-51d0-4d0e-905e-80a5d9db9514"/></td>
    <td><img src="https://github.com/user-attachments/assets/cc602172-e3eb-47a9-826b-780920de54d3"/> </td>
  </tr>
  <tr>
    <td>후</td>
    <td><img src="https://github.com/user-attachments/assets/f6176a74-6979-4c6b-88de-117a7bf30228"/></td>
    <td><img src="https://github.com/user-attachments/assets/cc4495cb-9ef8-47e5-aa16-bfab8a50b9d0"/></td>
  </tr>

  <tr>
    <td rowspan="2">대량 추가</td>
    <td>전</td>
    <td><img src="https://github.com/user-attachments/assets/0a065df8-f8bc-49db-8ae7-52febf9f9e0f"/></td>
    <td><img src="https://github.com/user-attachments/assets/ca84d127-9663-4c84-9fdf-cb559a546d9b"/></td>
  </tr>
  <tr>
    <td>후</td>
    <td><img src="https://github.com/user-attachments/assets/058e2822-6e01-498a-87f3-ede778659ff8"/></td>
    <td><img src="https://github.com/user-attachments/assets/ce4ddffc-cc16-4de3-b9e1-5ce52860f1fb"/></td>
  </tr>

  <tr>
    <td rowspan="2">상품 검색</td>
    <td>전</td>
    <td><img src="https://github.com/user-attachments/assets/79e7f601-5252-4718-a33a-3f8ad3dba910"/></td>
    <td><img src="https://github.com/user-attachments/assets/b4985ce8-37ec-4a3a-a00c-ec73c0d88e7e"/></td>
  </tr>
  <tr>
    <td>후</td>
    <td><img src="https://github.com/user-attachments/assets/440114f1-c861-405d-b3ae-3ac07c56bd80"/></td>
    <td><img src="https://github.com/user-attachments/assets/62cceecf-933c-4015-a87c-9e4e1cff2162"/></td>
  </tr>
  <tr>
    <td rowspan="2">로그인</td>
    <td>전</td>
    <td><img src="https://github.com/user-attachments/assets/d722c426-1b1d-4d12-843a-357040563606"/></td>
    <td><img src="https://github.com/user-attachments/assets/a2a8f812-53be-40e0-b186-039cc4a9ca46"/></td>
  </tr>
  <tr>
    <td>후</td>
    <td><img src="https://github.com/user-attachments/assets/1a833ddd-cde4-461e-9de9-dd3301163f9a"/></td>
    <td><img src="https://github.com/user-attachments/assets/7c2f3525-780e-444d-9577-444ab7d1e2a6"/></td>
  </tr>
  </tbody>
</table>


오,, 뭔가 기대했던 것만큼의 '다이나믹한' 절감 효과가 있었던 것 같지는 않습니다. 90% 감소! 이런 것을 기대했는데,,
일부 시나리오에서는 최적화 전후 수치가 크게 차이가 없었고, 오히려 약간 증가하는 경우도 있었습니다. 
브라우저, 혹은 리액트에서 기본적으로 제공하고 있는 최적화의 수준이 이미 그렇게 나쁘지 않은 정도라 그럴수 있지 않을까 추측해봤습니다.

하지만 일부를 제외하고는 대부분 눈에 띄는 감소 효과가 있었습니다. 
대부분 초기성 시나리오라 크게 감소하지 않았지만, 실 사용중에 발생하는 사소한 전환에서는 그 차이가 크게 느껴질 것으로 예상됩니다. 

### React useState 구현해보기

리액트로 서비스를 만들면서, 제일 많이 사용하는 hook은 아마도 useState가 아닐까요.. 
숨쉬듯이 사용해왔지만, 정작 그 원리는 제대로 이해하고 있지 못했습니다.
실제 react 내부의 useState 구현체는 더 복잡하겠지만, 간단한 버전으로 useState의 내부 구조를 파악해 보았습니다. 
(제가 과거에 공부하고 정리해둔 내용을 참고하였습니다)

실제 개발 과정에서 사용하면서 파악한 useState의 동작은 다음과 같습니다.

1. 초기값, 혹은 초기값을 생성하는 함수를 인자로 전달해 useState를 호출한다
4. [저장값, 변경함수] 배열을 결과로 반환한다.
5. 저장값은 직접 할당하여 변경할 수 없다. ‘변경함수’를 통해야만 저장값을 변경할 수 있다.
6. 렌더링을 반복해도, 저장값은 초기화되지 않는다.

이를 통해 useState 구현의 실마리를 찾을 수 있습니다. 

1. 값을 어딘가에 저장하고 있어야 합니다. 4번 특성 때문에, 컴포넌트 함수 내에 저장할 수는 없습니다. 전역, 앱 내, 혹은 별도의 컨텍스트에 저장하고 있어야 하지 않을까 싶습니다.
3. 값을 변경하는 함수를 만들어야 합니다. 이 함수를 통해 저장된 값을 변경할 수 있어야 합니다.

다음과 같이 간단하게 구현해볼 수 있겠습니다. 클로저를 활용해 변수를 저장했습니다.

**ver1.**

```tsx
const React = (function() {
let _val; // state가 저장되는 변수
  return {
    useState(initialValue) {
        _val = _val || initialValue      
       function setState(newVal) {
          _val = newVal // state 업데이트
          render(); // 새로운 state를 기반으로 re-render
        }      
	return [_val, setState]
     }
  } 
})()
```

컴포넌트 내에서 useState를 반복 호출해도, 내부 컨텍스트에 저장된 _val 변수는 초기화되지 않습니다. 

동작은 얼추 흉내낸 것 같지만, 큰 오류가 있습니다.

useState는 한 컴포넌트 내에서 여러번 호출할 수 있습니다. 관리하고자 하는 state 개수만큼 부를 수 있습니다. 
위 코드는 그러한 상황에 대응하지 못합니다. 
그러려면 내부 변수를 state 개수만큼 선언해둬야하는데, state가 몇개일지 미리 알 수 없을 뿐더러, 
일반성 및 추상화 관점에서 망가지게 됩니다.

오 그렇다면 하나의 변수에서 여러 state를 관리하는 방법은 무엇일까요. 배열이나 객체를 사용하면 되겠습니다.

**ver2.** 

```tsx
const React = (function() {
  let stateList = [];      // 한 컴포넌트 내 state value 목록
  let setterList = [];     // 한 컴포넌트 내 state setter 목록
  let cursor = 0; 	    // 현재 실행된 hook 번호
	
  return {
    createSetter(cursor) {
      return (newVal) => {
	stateList[cursor] = newVal;
      };
    },
    useState(initialValue) {
      // 첫 mount시에는, state, setter 목록이 비어 있으므로, 초기화
      if(!setterList[cursor]) setterList.push(createSetter(cursor));
      if(!stateList[cursor]) stateList.push(initialValue);

      // 현재 실행되는 hook 순서에 대응하는 value, setter 가져오기
      const setter = setterList[cursor];
      const state = stateList[cursor];
		
      cursor++;
      return [state, setter];
    },
    render(Component) {
      cursor= 0 
      const Comp = Component()
      Comp.render()
      return Comp
    }
  }
})()
```

변수와 변경함수를 각각 배열에 저장하고, 몇 번째에 저장되는지를 cursor변수로 관리합니다. 
한 렌더 내에서 useState를 여러번 호출해도, 배열 맨 앞부터 차곡차곡 관리됩니다.
렌더가 시작될때 cursor는 0으로 초기화되어, useState를 호출한 순서와 state의 순서가 항상 동일함을 보장할 수 있습니다. 

그렇다면 다음과 같은 상황을 상상해보면 어떨까요?

- 최초 mount시에는 a→b→c 순서로 hook이 호출되고, 특정 조건에서는 a→c→b 순서로 hook이 호출되는 상황

```tsx
const Foo = () => {
  const [a, setA] = React.useState(0);
	
  if(a===0){
    const [b, setB] = React.useState(true);
    const [c, setC] = React.useState('foo');
  } else {
    const [c, setC] = React.useState('foo');		
    const [b, setB] = React.useState(true);
  }

  return (
    <section>
      <button onClick={()=>setA(1}> a를 1로 업데이트 </button>
    </section>
  )
}
```

b와 c state를 올바르게 사용할 수 있을까요? 아닙니다. 

- 최초 마운트시에는, `b === true`, `c=== ‘foo’`  입니다.
- button 클릭 이후에는 (a가 1로 업데이트 된 이후에는), `b === ‘foo’`, `c=== true`가 됩니다.

당연히 이를 의도하고 코드를 짜는 개발자는 없을 것이지만, 이는 명백한 안티패턴입니다. (실행되기는 합니다. 리액트는 이에 대해서 경고(에러)를 띄웁니다.)

React 입장에서, b와 c 변수명은 알 바가 아닙니다. 
hook을 실행한 순서대로, list에서 값을 찾아 전달해주는 역할만 수행합니다. 
따라서, 렌더링시 hook의 순서가 유지되는 것이 매우 중요합니다. 

리액트 개발을 시작할 때 암기했던 hook의 중요한 원칙을 이제 이해할 수 있게 되었습니다.

> **Don’t call Hooks inside loops, conditions, or nested functions**
> 훅을 조건문, 반복문, 중첩 함수 안에서 실행하지 말라

리액트는 훅을 실행할 수 없는 예외 상황을 미리 정해둔 것이 아닙니다. 
hook이 실행되는 순서를 유지하는 것이 핵심인 것이고, 그 순서가 유지되지 않는 상황을 예시로써 알려준 것입니다.

어느정도 간단하게 useState 구현을 해보고, 과제에 적용해보려 했지만 성공하지 못했습니다. 
state를 저장할 위치, 값이 변경되었을 때 함수형 컴포넌트를 재호출하는 방법이 도저히 떠오르지가 않더라구요.. 
추후 좀더 실력을 쌓고, 시간적 여유가 될 때(이때가 오겠죠?) 다시 한 번 천천히 구현해보도록 하겠습니다.. ㅜ


### 팀원들과의 질문 중 기억에 남는 것

성윤님이 다음과 같은 질문을 해주셨습니다.

> 다음 코드에서, 왜 호출 수가 증가하나요?
> 
> ![image (10)](https://github.com/user-attachments/assets/23e9eec0-b1b2-4fb4-b968-a41788d4f3cb)
> 
> 

도형: 객체 구성이 동일해도, 두 객체는 다른 참조에 저장되어 서로 다른 객체이기 때문입니다. (반쯤 맞는 답변)

성윤: 얕은 비교가 가능한 대상 아닌가요? 얕은 비교 함수에서는 true인데.. 왜 다시 호출하나요? (각색)

도형: 어 그러게요.. 왜그러지..

그러고 나서 열심히 그 원인을 찾아보았습니다.

앞서 말한대로 얕은 비교함수에서는 두 객체를 동일한 것으로 판단했습니다. 그럼 왜 리렌더링이 되느냐?!

> 리렌더링시, prop 각각에 대해 얕은 비교를 수행하는 것이 아니라, 
> 각 prop을 key, value로 갖고 있는 props객체 하나에 대해 얕은 비교를 수행하기 때문이었습니다.
> 

위 경우 props는 `{ value: 2, style: { color: '#09F' } }`  이기 때문에, 얕은 비교의 대상이 아니었습니다!! 
어떤 내용을 실제로 적용 안해보고 이론으로만 알고 있는게 위험하다는 것을 새삼스럽게 깨달은 순간이었습니다

![image (11)](https://github.com/user-attachments/assets/ff766e95-5a25-409d-94e2-ae695ebafb64)

## 리뷰 받고 싶은 내용

- 한 context 내에서 다른 context의 상태를 참조하는 경우 문제가 될 수 있을 것 같았습니다. 상호 참조하는 context는 없었으나, login, notification처럼 한쪽의 상태를 참조하는 경우는 있었습니다. 이 경우 context provider를 감싸주는 순서를 신경써줘야 했습니다. 서비스가 커지면서 상태가 많이 추가될텐데, 이런 상황이 발생할 때마다 provider의 위치를 조정해줘야하는가? 하는 의문이 들었습니다. 혹시나 더 악화되면 상호 호출하게 되는 경우도 존재할텐데, 이럴 경우 공통 조상 provider를 하나 더 만들어서 사용하면 되겠지만, 코드 구조를 바꿔야 한다는 점에서 많이 불편할 것 같습니다. 아무튼 이러한 측면에서, context 로 전역 상태를 관리하는 것이 괜찮은 것 같다고 생각하시나요? 전역 상태는 다른 방식으로 관리하고, 좁은 범위(혹은 UI)의 상태만 context로 관리하는게 더 나을 것 같다는 생각이 드는데. 코치님이 생각하셨을 때 가장 깔끔한 전역상태 관리 방법은 어떤 것인가요? 여러 방식을 섞어 써야 한다면, 사용할 방식을 나누는 기준은 어떻게 될까요?

<!--
피드백 받고 싶은 내용을 구체적으로 남겨주세요
모호한 요청은 피드백을 남기기 어렵습니다.

참고링크: https://chatgpt.com/share/675b6129-515c-8001-ba72-39d0fa4c7b62

모호한 요청의 예시)
- 코드 스타일에 대한 피드백 부탁드립니다.
- 코드 구조에 대한 피드백 부탁드립니다.
- 개념적인 오류에 대한 피드백 부탁드립니다.
- 추가 구현이 필요한 부분에 대한 피드백 부탁드립니다.

구체적인 요청의 예시)
- 현재 함수와 변수명을 보면 직관성이 떨어지는 것 같습니다. 함수와 변수를 더 명확하게 이름 지을 수 있는 방법에 대해 조언해주실 수 있나요?
- 현재 파일 단위로 코드가 분리되어 있지만, 모듈화나 계층화가 부족한 것 같습니다. 어떤 기준으로 클래스를 분리하거나 모듈화를 진행하면 유지보수에 도움이 될까요?
- MVC 패턴을 따르려고 했는데, 제가 구현한 구조가 MVC 원칙에 맞게 잘 구성되었는지 검토해주시고, 보완할 부분을 제안해주실 수 있을까요?
- 컴포넌트 간의 의존성이 높아져서 테스트하기 어려운 상황입니다. 의존성을 낮추고 테스트 가능성을 높이는 구조 개선 방안이 있을까요?
-->

### 코치님 코멘트

Q. 한 context 내에서 다른 context의 상태를 참조하는 경우 문제가 될 수 있을 것 같았습니다. 상호 참조하는 context는 없었으나, login, notification처럼 한쪽의 상태를 참조하는 경우는 있었습니다. 이 경우 context provider를 감싸주는 순서를 신경써줘야 했습니다. 서비스가 커지면서 상태가 많이 추가될텐데, 이런 상황이 발생할 때마다 provider의 위치를 조정해줘야하는가? 하는 의문이 들었습니다. 혹시나 더 악화되면 상호 호출하게 되는 경우도 존재할텐데, 이럴 경우 공통 조상 provider를 하나 더 만들어서 사용하면 되겠지만, 코드 구조를 바꿔야 한다는 점에서 많이 불편할 것 같습니다. 아무튼 이러한 측면에서, context 로 전역 상태를 관리하는 것이 괜찮은 것 같다고 생각하시나요? 전역 상태는 다른 방식으로 관리하고, 좁은 범위(혹은 UI)의 상태만 context로 관리하는게 더 나을 것 같다는 생각이 드는데. 코치님이 생각하셨을 때 가장 깔끔한 전역상태 관리 방법은 어떤 것인가요? 여러 방식을 섞어 써야 한다면, 사용할 방식을 나누는 기준은 어떻게 될까요?

A. 컨텍스트에서 다른 컨텍스트를 참조하는 것은 안티패턴은 아니에요. 그냥 피하고 싶은거죠 ㅎㅎ. 말씀하신 문제들이 있기 때문에 참조가 있을 거면 그냥 하나로 묶는 방법도 있지만 이것도 사실 랜더링 측면에서 불리해지죠. 사실 저희 과제가 상태관리도구를 커버하지 않아서 컨텍스트로 해결하려고 해서 생기는 문제 인것 같아요ㅎㅎ
컨텍스트는 사용 용도가 컴포넌트 전반적으로 사용되면서 거의 변경이 없는 데이터를 심플하게 공유할 때 유용합니다. 이것만으로 충분한 상황이 있을 수도 있어요.
하지만 보통의 경우에는 zustand와 같은 상태관리 도구를 사용해서 위와같은 컨텍스트로 커버하기 힘든 문제를 해결할 수 있을 것 같아요 :) 
지금 과제에서는 테마 같은 경우가 context를 사용하기 정말 좋은 예인 것 같아요. 

수고하셨습니다!
