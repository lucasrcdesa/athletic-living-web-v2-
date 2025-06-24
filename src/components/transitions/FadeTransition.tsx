import React from "react";
import "./styles.css";

interface FadeTransitionProps {
  children: React.ReactNode;
  isVisible: boolean;
  duration?: number;
}

const FadeTransition: React.FC<FadeTransitionProps> = ({
  children,
  isVisible,
  duration = 300,
}) => {
  return (
    <div
      className={`fade-transition ${isVisible ? "fade-in" : "fade-out"}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};

export default FadeTransition;
