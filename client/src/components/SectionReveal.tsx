import { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}

export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: SectionRevealProps) {
  const directionClass =
    direction === "left" ? "section-reveal-left" : direction === "right" ? "section-reveal-right" : "section-reveal-up";

  return (
    <div
      className={`${directionClass} ${className}`.trim()}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}
