import * as React from "react";
import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";

export const Example = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);

  return (
    <motion.nav
      animate={isOpen ? "open" : "closed"}
      ref={containerRef}
      className="motion-menu-ul"
    >
      <MenuToggle toggle={() => toggleOpen()} />
      <Navigation isOpen={isOpen} />
    </motion.nav>
  );
};
