import React from "react";

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function SectionContainer({
  children,
  className = "",
  id,
}: SectionContainerProps) {
  return (
    <div id={id} className={`w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}