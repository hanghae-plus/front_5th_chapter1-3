## 과제 체크포인트

### 배포 링크

이번 과제는 배포링크 없다고 하셨습니다.

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

회사에서 vue를 main 으로 다루는 나에게 react hook을 오랜만에 쓰는지 한번도 안썻는지 가물가물한 나에게 다시 한번 이런게 있엇구나 하고 일깨워주는 과제였습니다.

---

- 회사에서 vue를 main 으로 다루는 나에게 react hook을 오랜만에 쓰는지 한번도 안썻는지 가물가물한 나에게 다시 한번 이런게 있엇구나 하고 일깨워주는 과제였습니다.

### 기술적 성장

#### 이번 과제를 통해 얻은 것들

🔍 1. 리액트 컴포넌트 리렌더링의 원리와 최적화 포인트 학습
어떤 상황에서 리렌더링이 발생하는지, 왜 발생하는지를 코드 수준에서 명확히 이해.

React.memo, useMemo, useCallback이 정확히 언제 유의미한지, 언제 오히려 쓸모 없는지도 체감.

→ 단순히 문법을 아는 것이 아니라, 실제 상황에서 불필요한 렌더링을 추적하고 막는 방법을 배움.

🧠 2. Hook의 내부 동작을 직접 구현하면서 React 핵심 개념을 심화 학습
useRef, useMemo, useCallback을 직접 구현하면서 React 내부 동작을 더 깊이 이해.

특히 useMemo에서 의존성 배열을 비교하는 shallowEquals의 역할과 중요성을 직접 체험

→ 단순히 “써본다”가 아니라 **“왜 이렇게 동작해야 하는지”**를 몸으로 익힌 경험.

🔧 3. 디버깅을 통한 문제 해결력 향상
테스트 실패 메시지를 기반으로 실제 어느 컴포넌트가 불필요하게 렌더링됐는지 분석하고,

원인을 찾고 해결하는 과정을 반복하면서 디버깅 감각 생성

→ 앞으로 다른 최적화 이슈나 버그를 볼 때 자신감이 생길수있음

📦 4. 유지보수가 가능한 컴포넌트 설계 사고방식 습득
상태를 적절히 쪼개고, 필요할 때만 전달되게 만드는 구조를 고민

자연스럽게 **“컴포넌트를 독립적이고 예측 가능하게 설계하는 방법”**을 익힘

#### 코드 기능적으로 얻은것들

1.  === vs JSON.stringify() 성능 차이
    🔹 === (Strict Equality)

- 비교 방식: 얕은 비교 (Shallow Comparison)
- 성능: 매우 빠름 (O(1))
- 예시:

```js
const a = { name: "Jane" };
const b = { name: "Jane" };

console.log(a === b); // false (참조값이 다름)
```

`JSON.stringify(a) === JSON.stringify(b)`
비교 방식: 깊은 비교처럼 보일 수 있음 (Deep-ish)

성능: 느림 (O(n))

문자열 변환과 비교가 필요해서, 구조가 복잡할수록 속도가 느려집니다.

예시:

✨ 이번 과제를 통해 얻은 것들
🔍 1. 리액트 컴포넌트 리렌더링의 원리와 최적화 포인트 학습
어떤 상황에서 리렌더링이 발생하는지, 왜 발생하는지를 코드 수준에서 명확히 이해.

React.memo, useMemo, useCallback이 정확히 언제 유의미한지, 언제 오히려 쓸모 없는지도 체감.

→ 단순히 문법을 아는 것이 아니라, 실제 상황에서 불필요한 렌더링을 추적하고 막는 방법을 배움.

🧠 2. Hook의 내부 동작을 직접 구현하면서 React 핵심 개념을 심화 학습
useRef, useMemo, useCallback을 직접 구현하면서 React 내부 동작을 더 깊이 이해.

특히 useMemo에서 의존성 배열을 비교하는 shallowEquals의 역할과 중요성을 직접 체험

→ 단순히 “써본다”가 아니라 **“왜 이렇게 동작해야 하는지”**를 몸으로 익힌 경험.

🔧 3. 디버깅을 통한 문제 해결력 향상
테스트 실패 메시지를 기반으로 실제 어느 컴포넌트가 불필요하게 렌더링됐는지 분석하고,

원인을 찾고 해결하는 과정을 반복하면서 디버깅 감각 생성

→ 앞으로 다른 최적화 이슈나 버그를 볼 때 자신감이 생길수있음

📦 4. 유지보수가 가능한 컴포넌트 설계 사고방식 습득
상태를 적절히 쪼개고, 필요할 때만 전달되게 만드는 구조를 고민

자연스럽게 **“컴포넌트를 독립적이고 예측 가능하게 설계하는 방법”**을 익힘

### 코드 품질

<!-- 예시
- 특히 만족스러운 구현
- 리팩토링이 필요한 부분
- 코드 설계 관련 고민과 결정
-->

### 학습 효과 분석

<!-- 예시
- 가장 큰 배움이 있었던 부분
- 추가 학습이 필요한 영역
- 실무 적용 가능성
-->

- 실제 리액트가 어떻게 구현되는지 알수있었고 vue를 main 으로 다루는 입장에서 어떤 차이가 있는 지 확인할수있었다.

- 🧠 Vue vs React 유사 개념 비교 (같은 점 & 다른 점)

1. useMemo (React) vs computed (Vue)
   항목 React (useMemo) Vue (computed) 같은 점 다른 점
   목적 값 캐싱, 연산 최소화 값 캐싱, 연산 최소화 연산 결과를 캐싱하여 불필요한 재계산 방지 Vue는 의존성 자동 추적, React는 수동 배열 지정
   사용 방식 useMemo(() => ..., [deps]) computed(() => ...) 특정 값의 변화를 추적해 계산 수행 Vue는 선언적, React는 명령형에 가까움
   렌더링 연동 메모된 값 수동 사용 템플릿에서 직접 사용 가능 최적화 목적 Vue는 템플릿에 자연스럽게 연동됨
2. useRef (React) vs ref (Vue)
   항목 React (useRef) Vue (ref) 같은 점 다른 점
   역할 DOM 참조 or 값 저장 DOM 참조 or 반응형 값 저장 DOM 접근 or 상태 보존 가능 React의 ref는 비반응형, Vue는 반응형
   접근 방식 ref.current ref.value 렌더링 없이 상태 유지 Vue는 값이 바뀌면 반응형 시스템 작동
   사용 시점 함수 컴포넌트 내부 어디든 가능 Composition API에서 사용 상태 유지 용도 공통 Vue는 템플릿 ref도 존재함 (<div ref="box">)
3. useContext (React) vs provide/inject (Vue)
   항목 React (useContext) Vue (provide/inject) 같은 점 다른 점
   목적 전역 상태 공유 부모 → 자식 간 상태 공유 계층 구조에서 값 공유 Vue는 단순한 구조, React는 Context 객체 필요
   사용 방식 useContext(SomeContext) inject('key') 중간 컴포넌트 거치지 않고 전달 가능 React는 Context 생성 및 Provider 설정 필요
   반응성 기본 static (state 관리 필요) reactive한 ref 제공 시 반응형 유지 전달된 값 UI 반영 가능 Vue는 더 간단하게 반응형 공유 가능
4. useState (React) vs ref / reactive (Vue)
   항목 React (useState) Vue (ref, reactive) 같은 점 다른 점
   목적 상태 선언 및 변경 반응형 상태 선언 상태 변화에 따라 UI 자동 갱신 Vue는 ref와 reactive로 타입에 따라 사용 다름
   상태 변경 setState 함수 호출 직접 값 변경 (ref.value = ...) 상태 → 렌더링 연결 React는 불변성 유지 권장, Vue는 내부 추적
   배열/객체 직접 조작 후 set 호출 reactive로 감싸거나 toRefs() 사용 복잡한 구조 추적 가능 Vue는 더 직관적인 조작 가능
5. custom hook (React) vs composables (Vue)
   항목 React (custom hook) Vue (composables) 같은 점 다른 점
   목적 로직 재사용 로직 재사용 기능 단위 추출과 재사용 Vue는 reactive system과 함께 사용됨
   구성 방식 함수 내부에서 Hook 조합 함수 내부에서 ref/reactive 사용 공통 로직 추출 및 공유 Vue는 의존성 자동 추적 가능
   사용 위치 컴포넌트 함수 내부 setup() 내에서 사용 다양한 컴포넌트에 재사용 React는 hook 규칙 (top-level, call order 보장) 필요
   ✅ 총정리 요약
   기능 React Vue 핵심 차이점
   값 캐싱 useMemo computed Vue는 자동 추적, React는 의존성 명시
   상태 저장 useRef ref Vue는 반응형, React는 비반응형
   전역 전달 useContext provide/inject React는 Context 정의 필요
   상태 관리 useState ref, reactive Vue는 더 직관적인 변경
   로직 재사용 custom hook composable 둘 다 함수 기반, Vue는 반응형 내장

- 실제 리액트가 어떻게 구현되는지 알수있었고 vue를 main 으로 다루는 입장에서 어떤 차이가 있는 지 확인할수있었다.

- 🧠 Vue vs React 유사 개념 비교 (같은 점 & 다른 점)

1. useMemo (React) vs computed (Vue)
   항목 React (useMemo) Vue (computed) 같은 점 다른 점
   목적 값 캐싱, 연산 최소화 값 캐싱, 연산 최소화 연산 결과를 캐싱하여 불필요한 재계산 방지 Vue는 의존성 자동 추적, React는 수동 배열 지정
   사용 방식 useMemo(() => ..., [deps]) computed(() => ...) 특정 값의 변화를 추적해 계산 수행 Vue는 선언적, React는 명령형에 가까움
   렌더링 연동 메모된 값 수동 사용 템플릿에서 직접 사용 가능 최적화 목적 Vue는 템플릿에 자연스럽게 연동됨
2. useRef (React) vs ref (Vue)
   항목 React (useRef) Vue (ref) 같은 점 다른 점
   역할 DOM 참조 or 값 저장 DOM 참조 or 반응형 값 저장 DOM 접근 or 상태 보존 가능 React의 ref는 비반응형, Vue는 반응형
   접근 방식 ref.current ref.value 렌더링 없이 상태 유지 Vue는 값이 바뀌면 반응형 시스템 작동
   사용 시점 함수 컴포넌트 내부 어디든 가능 Composition API에서 사용 상태 유지 용도 공통 Vue는 템플릿 ref도 존재함 (<div ref="box">)
3. useContext (React) vs provide/inject (Vue)
   항목 React (useContext) Vue (provide/inject) 같은 점 다른 점
   목적 전역 상태 공유 부모 → 자식 간 상태 공유 계층 구조에서 값 공유 Vue는 단순한 구조, React는 Context 객체 필요
   사용 방식 useContext(SomeContext) inject('key') 중간 컴포넌트 거치지 않고 전달 가능 React는 Context 생성 및 Provider 설정 필요
   반응성 기본 static (state 관리 필요) reactive한 ref 제공 시 반응형 유지 전달된 값 UI 반영 가능 Vue는 더 간단하게 반응형 공유 가능
4. useState (React) vs ref / reactive (Vue)
   항목 React (useState) Vue (ref, reactive) 같은 점 다른 점
   목적 상태 선언 및 변경 반응형 상태 선언 상태 변화에 따라 UI 자동 갱신 Vue는 ref와 reactive로 타입에 따라 사용 다름
   상태 변경 setState 함수 호출 직접 값 변경 (ref.value = ...) 상태 → 렌더링 연결 React는 불변성 유지 권장, Vue는 내부 추적
   배열/객체 직접 조작 후 set 호출 reactive로 감싸거나 toRefs() 사용 복잡한 구조 추적 가능 Vue는 더 직관적인 조작 가능
5. custom hook (React) vs composables (Vue)
   항목 React (custom hook) Vue (composables) 같은 점 다른 점
   목적 로직 재사용 로직 재사용 기능 단위 추출과 재사용 Vue는 reactive system과 함께 사용됨
   구성 방식 함수 내부에서 Hook 조합 함수 내부에서 ref/reactive 사용 공통 로직 추출 및 공유 Vue는 의존성 자동 추적 가능
   사용 위치 컴포넌트 함수 내부 setup() 내에서 사용 다양한 컴포넌트에 재사용 React는 hook 규칙 (top-level, call order 보장) 필요
   ✅ 총정리 요약
   기능 React Vue 핵심 차이점
   값 캐싱 useMemo computed Vue는 자동 추적, React는 의존성 명시
   상태 저장 useRef ref Vue는 반응형, React는 비반응형
   전역 전달 useContext provide/inject React는 Context 정의 필요
   상태 관리 useState ref, reactive Vue는 더 직관적인 변경
   로직 재사용 custom hook composable 둘 다 함수 기반, Vue는 반응형 내장

### 과제 피드백

<!-- 예시
- 과제에서 모호하거나 애매했던 부분
- 과제에서 좋았던 부분
-->

- vue를 주로 사용했던 입장으로 react의 장점을 확실히 캐치하였습니다
- 이전까지는 useMemo, useCallback이 있다는 것만 알고 있었고, “최적화에 쓰인다”는 정도로만 이해하고 있었음.
- 하지만 이번 과제를 통해 정확히 언제 써야 하고, 왜 써야 하는지 체감함.
- 예를 들어, useCallback을 쓰지 않으면 자식 컴포넌트에 props로 넘기는 함수가 매 렌더마다 새로 생성되어 불필요한 리렌더링을 유발한다는 점을 직접 확인함.
- useMemo는 무거운 계산 결과나 필터링 로직 등을 캐싱해서 성능을 최적화할 수 있는 훅이라는 걸 처음 실감함.
- React.memo, useMemo, useCallback을 조합해서 컴포넌트 리렌더링을 컨트롤하는 방법을 처음부터 끝까지 경험함.
- 테스트를 통과시키기 위해 “정확히 어떤 상태 변경이 어떤 컴포넌트에 영향을 주는지”를 명확하게 구분해야 했고, 이 과정이 큰 공부가 됨.

- vue를 주로 사용했던 입장으로 react의 장점을 확실히 캐치하였습니다
- 이전까지는 useMemo, useCallback이 있다는 것만 알고 있었고, “최적화에 쓰인다”는 정도로만 이해하고 있었음.
- 하지만 이번 과제를 통해 정확히 언제 써야 하고, 왜 써야 하는지 체감함.
- 예를 들어, useCallback을 쓰지 않으면 자식 컴포넌트에 props로 넘기는 함수가 매 렌더마다 새로 생성되어 불필요한 리렌더링을 유발한다는 점을 직접 확인함.
- useMemo는 무거운 계산 결과나 필터링 로직 등을 캐싱해서 성능을 최적화할 수 있는 훅이라는 걸 처음 실감함.
- React.memo, useMemo, useCallback을 조합해서 컴포넌트 리렌더링을 컨트롤하는 방법을 처음부터 끝까지 경험함.
- 테스트를 통과시키기 위해 “정확히 어떤 상태 변경이 어떤 컴포넌트에 영향을 주는지”를 명확하게 구분해야 했고, 이 과정이 큰 공부가 됨.

## 리뷰 받고 싶은 내용

- 리액트 hook은 그럼 리액트 대부분의 프로젝트에서 필수일까요? memo나 context는 자주 쓰지 않았어 여쭈어 봅니다.
- "React.memo를 어디까지 적용하는 게 적절하다고 생각하세요?"
