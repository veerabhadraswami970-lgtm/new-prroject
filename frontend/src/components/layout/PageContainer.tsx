import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "full";
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = "",
  size = "lg",
}) => {
  const maxMap = {
    sm: "max-w-xl",
    md: "max-w-3xl",
    lg: "max-w-5xl",
    full: "max-w-7xl",
  };

  return (
    <div className={`w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 ${maxMap[size]} ${className}`}>
      {children}
    </div>
  );
};
