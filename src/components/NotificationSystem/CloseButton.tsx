import { memo } from "../../hocs";

interface CloseButtonProps {
  onClick: () => void;
  className?: string;
}

export const CloseButton = memo(
  ({ onClick, className = "" }: CloseButtonProps) => (
    <button
      onClick={onClick}
      className={`ml-4 text-white hover:text-gray-200 ${className}`}
    >
      닫기
    </button>
  )
);
