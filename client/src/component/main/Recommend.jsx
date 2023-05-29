import { motion } from "framer-motion";
import styles from "../../styles";
import { TitleText, TypingText } from "./CustomTexts";
import { staggerContainer } from "../../util/motion";
import RecommendCard from "./RecommendCard";

const Recommend = ({ recommend }) => {
  return (
    <section className={`${styles.paddings} relative z-10  h-full`}>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >
        <TypingText title="| Recommend" textStyles="text-center text-white" />

        <TitleText title="We are recommend you" textStyles="text-center" />
        <div className="mt-[50px] flex flex-col gap-[30px]">
          {recommend.slice(3, 6).map((recipe, index) => (
            <RecommendCard
              key={`insight-${index}`}
              {...recipe}
              index={index + 1}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Recommend;
