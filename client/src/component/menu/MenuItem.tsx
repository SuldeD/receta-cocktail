import * as React from "react";
import { motion } from "framer-motion";
import { Pages } from "../../util/constVariables";
import Link from "next/link";
import { useOthers } from "../../context/OthersContext";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 100, velocity: -10 },
    },
  },
  closed: {
    y: 2,
    opacity: 0,
    transition: {
      y: { stiffness: 200 },
    },
  },
};

export const MenuItem = () => {
  const { setActivePage, activePage } = useOthers();
  return (
    <motion.li
      variants={variants}
      whileTap={{ scale: 0.95 }}
      className="flex flex-col gap-5"
    >
      <h1 className="text-[26px] border-b py-3 text-center">receta.</h1>
      {Pages.map((page, index) => (
        <Link
          href={page.url}
          key={index}
          onClick={() => {
            localStorage.setItem("page", page.name);
            setActivePage(page.name);
          }}
          className={
            activePage === page.name
              ? "cursor-pointer bg-[#DFDFDF] py-3 text-center duration-200"
              : "cursor-pointer hover:bg-[#DFDFDF] py-3 text-center duration-200"
          }
        >
          {page.name}
        </Link>
      ))}
    </motion.li>
  );
};
