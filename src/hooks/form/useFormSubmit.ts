import { useNotificationActions, useNotificationState } from "../../context";

export function useFormSubmit() {
  useNotificationState();
  const { addNotification } = useNotificationActions();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addNotification("폼이 성공적으로 제출되었습니다", "success");
  };

  return {
    handleSubmit,
  };
}
