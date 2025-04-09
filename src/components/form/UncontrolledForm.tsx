// ComplexForm 컴포넌트
import { useRef } from "react";
import { memo } from "../../@lib/hocs/memo";
import { useNotificationContext } from "../../hooks";

const UncontrolledForm: React.FC = () => {
  //   renderLog("Controlled rendered");
  const nameRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const ageRef = useRef<HTMLInputElement | null>(null);
  const preferencesRef = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  const { addNotification } = useNotificationContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 각 입력값 가져오기
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const age = ageRef.current?.value;

    // preferencesRef 배열에서 체크된 항목을 모두 필터링하여 값만 뽑기
    const checkedPreferences = preferencesRef
      .map(({ current }) => current)
      .filter((input) => input?.checked)
      .map((input) => input!.value);

    console.log(name, email, age, checkedPreferences);

    (e.target as HTMLFormElement).reset();

    addNotification(
      `${name}, ${email}, ${age}, ${checkedPreferences}`,
      "success",
    );
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">비제어컴포넌트 폼</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="uncontrolled-name"
          ref={nameRef}
          placeholder=" 비제어컴포넌트 이름"
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          type="email"
          name="uncontrolled-email"
          ref={emailRef}
          placeholder=" 비제어컴포넌트 이메일"
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <input
          type="number"
          name="uncontrolled-age"
          ref={ageRef}
          placeholder=" 비제어컴포넌트 나이"
          className="w-full p-2 border border-gray-300 rounded text-black"
        />
        <div className="space-x-4">
          {["독서", "운동", "음악", "여행"].map((pref, index) => (
            <label key={pref} className="inline-flex items-center">
              <input
                type="checkbox"
                ref={preferencesRef[index]}
                value={pref}
                className="form-checkbox h-5 w-5 text-blue-600"
              />
              <span className="ml-2">{pref}</span>
            </label>
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          비제어 컴포넌트 폼 제출
        </button>
      </form>
    </div>
  );
};

export default memo(UncontrolledForm);
