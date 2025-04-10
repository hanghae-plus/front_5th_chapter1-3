/**
 * 알림 타입
 *
 * 1. `info`: 정보
 * 2. `success`: 성공
 * 3. `warning`: 경고
 * 4. `error`: 오류
 */
export type TNotificationType = "info" | "success" | "warning" | "error";

/** 알림 정보 */
export interface INotification {
  /** 알림 식별자 */
  id: number;
  /** 알림 메시지 */
  message: string;
  /** 알림 타입 */
  type: TNotificationType;
}
