import React, { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const Loader = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return loading ? (
    <div className="loader-container w-screen h-screen flex justify-center items-center">
      <Loaderr />
    </div>
  ) : (
    <>{children}</>
  );
};

export default Loader;

const colors = ["#22238f", "#6b45fa", "#ca3286", "#fe2b49", "#fe652d"];

const containerVariants = {
  initial: {},
  animate: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const dotVariants = {
  initial: {},
  animate: {
    height: [20, 40, 20],
    transition: {
      repeat: Infinity,
    },
  },
};

export const Loaderr = ({ count = 5 }) => (
  <motion.div
    variants={containerVariants}
    initial="initial"
    animate="animate"
    style={{
      display: "flex",
      gap: 2,
      height: 20,
      alignItems: "center",
    }}
  >
    {Array(count)
      .fill(null)
      .map((_, index) => (
        <motion.div
          key={index}
          variants={dotVariants}
          style={{
            height: 20,
            width: 10,
            backgroundColor: colors[index % colors.length],
            borderRadius: 20,
          }}
        />
      ))}
  </motion.div>
);
