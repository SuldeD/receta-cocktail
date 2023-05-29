import { motion } from "framer-motion";
import { textContainer, textVariant2 } from "../../util/motion";

export const TypingText = ({ title, textStyles }) => (
  <motion.p
    variants={textContainer}
    className={`font-normal text-[14px] text-secondary-white ${textStyles}`}
  >
    {Array.from(title).map((letter, index) => (
      <motion.span variants={textVariant2} key={index}>
        {letter === " " ? "\u00A0" : letter}
      </motion.span>
    ))}
  </motion.p>
);

export const TitleText = ({ title, textStyles }) => (
  <motion.h2
    variants={textVariant2}
    initial="hidden"
    whileInView="show"
    className={`mt-[8px] font-bold md:text-[64px] text-[40px] text-white ${textStyles}`}
  >
    {title}
  </motion.h2>
);

import styles from "../../styles";

export const StartSteps = ({ number, text }) => (
  <div className={`${styles.flexCenter} flex-row`}>
    <div
      className={`${styles.flexCenter} w-[70px] h-[70px] border-[0.3px] rounded-[0.1px]`}
    >
      <p className="font-bold text-[20px] text-white ">{number}</p>
    </div>
    <p className="flex-1 ml-[30px] font-normal text-[18px] leading-[32px]">
      {text}
    </p>
  </div>
);
