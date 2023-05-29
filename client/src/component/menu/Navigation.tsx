import * as React from "react";
import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Navigation = ({ isOpen }: { isOpen: any }) => (
  <motion.ul variants={variants} className={isOpen ? "open-ul" : "close-ul"}>
    <MenuItem />
  </motion.ul>
);
