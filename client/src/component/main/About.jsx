import { motion } from "framer-motion";
import { TypingText } from "./CustomTexts";
import styles from "../../styles";
import { fadeIn, staggerContainer } from "../../util/motion";

const About2 = () => (
  <section
    className={`${styles.paddings} relative z-10  text-white h-[80vh] flex flex-col justify-center mb-[20vh]`}
  >
    <div className="gradient-02 z-0" />
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="| About receta" textStyles="text-center" />

      <motion.p
        variants={fadeIn("up", "tween", 0.2, 1)}
        className="mt-[8px] font-light sm:text-[32px] text-[16px] text-center text-gray-300 "
      >
        <span className="font-extrabold text-white">{`"`}Welcome</span> to the
        Receta. Are you ready to elevate your drinking experience and indulge in
        exquisite cocktail creations? Look no further!{` `}
        <span className="font-extrabold text-white">
          Why Receta? Discover a world of flavors, where classic recipes meet
          innovative twists.
        </span>{" "}
        Our team of expert mixologists has curated an extensive menu that caters
        to both seasoned cocktail enthusiasts and newcomers alike. Whether
        you`re hosting a party, planning a romantic date night, or simply
        looking to unwind after a long day, our cocktails are designed to
        impress and delight.{`"`}
      </motion.p>

      <motion.img
        variants={fadeIn("up", "tween", 0.3, 1)}
        src="/arrow-down.svg"
        alt="arrow down"
        className="w-[18px] h-[28px] object-contain mt-[28px]"
      />
    </motion.div>
  </section>
);

export default About2;
