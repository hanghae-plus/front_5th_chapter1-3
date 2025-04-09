import { useState } from "react";

export function useRef<T>(initialValue: T): { current: T } {
  // React의 useState를 이용해서 만들어보세요.
  // useRef 훅은 렌더링 사이에 값을 유지하는 가변 ref 객체를 생성합니다.
  const [ref] = useState({ current: initialValue });
  return ref;
}

///🔍 공통점 (useRef vs useState)
// 항목	설명
// ✅ React Hook	둘 다 React에서 제공하는 훅
// ✅ 값 저장 기능	렌더링 사이에 값을 **기억(유지)**할 수 있음
// ✅ 함수형 컴포넌트에서 사용 가능	상태 관리나 DOM 조작 등에 사용

// ⚔️ 차이점 비교
// 항목:	useState	/ useRef
// 리렌더링 여부:	값을 바꾸면 리렌더링 발생	/ 값을 바꿔도 리렌더링 없음
// 주요 목적:	화면에 표시될 UI 상태 관리	/ DOM 참조, 비표시 데이터 저장 등
// 값 변경 방법:	setState() /	ref.current = 값
// 초기화:	const [value, setValue] = useState(초기값)	/ const ref = useRef(초기값)
// React 상태 추적:	리렌더링과 함께 추적	/ 추적 안 함 (변수처럼 사용)

// 🧠 언제 useState를 쓰나?
// 화면에 영향을 주는 데이터일 때 (→ 리렌더링 필요)

// 예: 폼 입력값, 로딩 상태, 선택된 탭 등

// const [count, setCount] = useState(0);
// return <button onClick={() => setCount(count + 1)}>{count}</button>

// 🧠 언제 useRef를 쓰나?
// 리렌더링 없이 값을 유지하고 싶을 때
// DOM 요소에 접근하고 싶을 때 (input, video 등)
// 이전 값 기억용 (prevCount.current = count 이런 식으로)
// 디바운스/타이머 ID 저장 등

// const inputRef = useRef<HTMLInputElement>(null);
// useEffect(() => {
//   inputRef.current?.focus();
// }, []);
// return <input ref={inputRef} />;

//✅ 예제 비교: 카운터
// const [count, setCount] = useState(0);        // 화면에 표시됨
// const countRef = useRef(0);                   // 값은 기억되지만 화면에 안 보임

// const increase = () => {
//   setCount(count + 1);        // 리렌더됨
//   countRef.current += 1;      // 렌더링 안 됨
// }

// 🧩 간단 요약
// 상황 /	추천 훅
// 값이 바뀌면 화면이 바뀌어야 한다 /	useState
// 값이 바뀌어도 화면엔 안 보여도 된다 /	useRef
// DOM 요소에 접근하고 싶다 /	useRef
// 이전 props/state를 저장하고 싶다	/ useRef
// 로딩 중 여부 등 UI 상태 /	useState
