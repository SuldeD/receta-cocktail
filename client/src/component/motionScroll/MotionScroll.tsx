import { useRef } from "react";
import { useInView } from "framer-motion";
import React from "react";

export function Section({ children }: { children: JSX.Element }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref}>
      <span
        style={{
          transform: isInView ? "none" : "translateX(-100px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.5s cubic-bezier(1, 0.55, 0.55, 0.5) 0.2s",
        }}
      >
        {children}
      </span>
    </section>
  );
}
