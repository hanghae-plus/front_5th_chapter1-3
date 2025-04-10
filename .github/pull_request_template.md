## 과제 체크포인트

### 배포 링크

<!--
배포 링크를 적어주세요
예시: https://<username>.github.io/front-5th-chapter1-1/

배포가 완료되지 않으면 과제를 통과할 수 없습니다.
배포 후에 정상 작동하는지 확인해주세요.
-->

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

<!-- 과제에 대한 회고를 작성해주세요 -->

### 기술적 성장

#### Object를 구분하는 세가지 방법
*typeof의 한계*
`typeof`는 객체를 비교하는데 있어서 한계를 가지고 있습니다. 바로 `Array`와 `null`을 `object`로 반환한다는 것입니다.

```javascript
const obj = {};
const arr = [];
const null_value = null;

console.log(typeof obj); //object
console.log(typeof arr);  //object
console.log(typeof null); //object
```

라는 결과가 나옵니다. 이것을 극복하기 위해서 해야할 것은 아래와 같이 작성하면 위와 같은 상황은 피할 수 있습니다.

```javascript
//배열과 같은 경우
Array.isArray(arr);
//null과 같은 경우
null_value === null
```

추가적인 사항으로는 `순수객체`와 `내장객체`의 차이를 구분하는 방법도 있습니다. 내가 선언한 객체와 기본적으로 `js` 에 내장된 객체를 구분하는 방법도 있습니다.

```javascript
const obj = {};
const date = new Date();

//비교하는 경우는 세가지 경우기 았다.
Object.prototype.toString.call()
Object.getPrototype()
instanceof
```

이 세 가지는 각각이 가지는 특징과 한계가 있음을 알 수 있었습니다.
```javascript
const plainObj = {};
const arrayObj = [];
const dateObj = new Date();
const nullValue = null;

// 1. instanceof 연산자
console.log(plainObj instanceof Object);  // true
console.log(arrayObj instanceof Array);   // true
console.log(dateObj instanceof Date);     // true
console.log(nullValue instanceof Object); // false

// 2. Object.prototype.toString.call()
console.log(Object.prototype.toString.call(plainObj));  // "[object Object]"
console.log(Object.prototype.toString.call(arrayObj));  // "[object Array]"
console.log(Object.prototype.toString.call(dateObj));   // "[object Date]"
console.log(Object.prototype.toString.call(nullValue)); // "[object Null]"

// 3. Object.getPrototypeOf()
console.log(Object.getPrototypeOf(plainObj) === Object.prototype);  // true
console.log(Object.getPrototypeOf(arrayObj) === Array.prototype);   // true
console.log(Object.getPrototypeOf(dateObj) === Date.prototype);     // true
// console.log(Object.getPrototypeOf(nullValue)); // TypeError!
```

여기서 이 타입을 가장 분명하게 구별할 수 있는 것은 `Object.proptotype.toString.call()`로 보입니다. 해당 객체가 어떤 것인지 바로 알려주기 때문이죠.!

`instanceof`는 한계를 가지고 있는데요. `iframe`에서 생성된 객체를 알 수 없다는 점입니다. `iframe` 자신만의 실행 컨택스트를 가지고 있어서 `iframe`의 생성자로 만든 배열은 현재 컨택스트의 `instanceof Array`가 `falsy`로 반환됩니다.

하지만 이번 과제에서는 위 내용들이 그렇게 핵심적으로 보이지는 않습니다. 깊은 비교를 어떻게 할 것인가?

`hasOwnProperty`를 사용해서 깊은 비교를 해보겠습니다. 사실 이건 깊은 비교라기보다는. 참조 값을 비교하는 것에 더 가깝다고 생각이 듭니다. 

저의 코드는 그냥 hasOwnProperty가 같다면 그 해당 키들에 대해서 비교하고, 같다면 true를 리턴하고 다르다면 false를 리턴하면서 계속해서 찾아들어가게 작성해놓은 것입니다. 즉 원시값이 나올때까지 비교하는 것이라고 생각하면 좋을 거 같습니다.
```javascript
return keysA.every((key) => {
    const itemA = (objA as Record<string, unknown>)[key];
    const itemB = (objB as Record<string, unknown>)[key];

    return itemA === itemB;
  });
```

이번 과제를 수행하면서 `deepEquals` 와 `shallowEquals`의 구현과 발제자료를 보면서 이번 과제의 핵심은 바로 `참조`에 있다는 생각이 들었습니다. 이 `참조`를 어떻게 풀어나갈것인가가 이번 발제의 중요한 점이라고 생각했습니다.

### useRef 구현
발제자료를 읽어보닌 `useState`의 `setState`는 새로운 참조를 만들고 저장하고 랜더링 한다는 것을 알 수 있었습니다. 리액트는 참조 값을 비교하여 랜더링 여부를 결정하기 때문이죠 하지만 `useRef`는 랜더링은 일어나지 않지만 값이 변경되는 `hook`입니다. 그래서 참조를 동일하게 해주고 값만 변경해주면 되지 않을까 싶었습니다. 
```javascript
const object = 

```

### useMemo 구현
1. useRef로 참조해야 하는 값을 저장 (메모이제이션 된 값, 의존성 저장)
2. useRef내부의 dependency로 저장한 값이 변경되면 값을 얕은 비교로 비교
3. 의존성에 값의 변경이 생기면 새롭게 값을 변경 `factory`함수를 통해 계산, ref.current.value에 저장.

```javascript
```

### useCallback 구현
1. 함수도 객체이다.
2. 함수는 일급 객체, 함수의 참조값도 객체의 참조값 처럼 비교가 가능하다.

### HOC를 활용한 memo 구현
지속적인 테스트 코드 에러, props가 동일한데도 rendering이 두번 실행 되는것을 볼 수 있엇다. > 이 문제를 어떻게 해결할 수 있을까? 함수가 실행되는 순간 이미 렌더링이 실행된다..! `React.createElement`를 return 하기 때문에 렌더링이 두번 발생.! 이 부분을 새로운 `Ref` 담은 후 `Ref`를 return 하니 랜더링이 한 번만 실행되었다.

## 심화과제
### context 분리
의존성 주입을 하였으나, 렌더링이 2번 발생해야 하나 4번 발생하는 문제를 확인했다. useMemo의 문제라기 보다는 관심사를 분리하고 처리하니 정상 작동하였습니다. context가 제대로 분리 되지 않았던 것으로 보이고 context의 value값이 변경 되다. 보니 많은 렌더링이 발생한 것으로 보입니다.

### 코드 품질
#### 컴포넌트 분리
* `App.tsx`에 하나로 있던 컴포넌트를 세가지 기준으로 나누었습니다. 어떤 `관심사`로 분리할지 고민하다가.
아래와 같이 구분했습니다. 저의 관심사는 기능에 중점했던 거 같습니다. 이렇게 기능을 분리하니 `memo` 관리 `context` 관리가 편하다는 장점이 있었습니다.

```sh
src/
├── @lib                // 공통 유틸리티 기능
├── context             // 상태 관리 기능
├── components          // UI 컴포넌트
└── models              // 데이터 모델 정의
```

### 학습 효과 분석
<!-- 예시
- 가장 큰 배움이 있었던 부분
- 추가 학습이 필요한 영역
- 실무 적용 가능성
-->

### 과제 피드백
<!-- 예시
- 과제에서 모호하거나 애매했던 부분
- 과제에서 좋았던 부분
-->

## 리뷰 받고 싶은 내용

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
