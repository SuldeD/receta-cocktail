import { useState } from "react";
import { motion } from "framer-motion";
import styles from "../../styles";
import { staggerContainer } from "../../util/motion";
import { TitleText, TypingText } from "./CustomTexts";
import NewsCard from "./NewsCard";
// import { HiArrowNarrowRight } from "react-icons/hi";

const News = (...data) => {
  const [active, setActive] = useState("world-2");

  return (
    <section className={`${styles.paddings} text-white`} id="explore">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="| The News" textStyles="text-center" />

        <TitleText title={<>Topic News</>} textStyles="text-center" />
        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
          {data[0].news
            .reverse()
            .slice(0, 5)
            .map((world, index) => (
              <NewsCard
                key={world._id}
                {...world}
                index={index}
                active={active}
                handleClick={setActive}
              />
            ))}
        </div>
      </motion.div>
    </section>
  );
};

export default News;
