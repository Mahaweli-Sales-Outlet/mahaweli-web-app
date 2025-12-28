import React from "react";
import clsx from "clsx";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline";
}

const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "default",
  children,
  ...rest
}) => {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full text-xs px-2 py-1",
        variant === "default" && "bg-green-500 text-white",
        variant === "outline" && "border border-gray-300 text-gray-700",
        className
      )}
      {...rest}
    >
      {children}
    </span>
  );
};

export { Badge };
export default Badge;
