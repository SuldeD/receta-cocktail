import { motion } from "framer-motion";
import styles from "../../styles";
import { StartSteps, TitleText, TypingText } from "./CustomTexts";
import { staggerContainer, fadeIn } from "../../util/motion";

export const startingFeatures = [
  "Gather Your Ingredients and Tools",
  "Measure and Mix",
  "Strain and Serve",
];

function GetStartted() {
  return (
    <section
      className={`${styles.paddings} relative z-10 text-white  min-h-[80vh]`}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex lg:flex-row flex-col gap-8`}
      >
        <motion.div
          variants={fadeIn("right", "tween", 0.3)}
          className={`flex-1 ${styles.flexCenter}`}
        >
          <picture>
            <img
              src="/HowToUse.webp"
              alt="get-started"
              className="w-[90%] h-[90%] object-contain"
            />
          </picture>
        </motion.div>
        <motion.div
          variants={fadeIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] flex justify-center flex-col"
        >
          <TypingText title="| How to start" />
          <TitleText title={<>Get started</>} />
          <div className="mt-[31px] flex flex-col max-w-[350px] gap-[24px]">
            {startingFeatures.map((feature, index) => (
              <StartSteps
                key={feature}
                number={`${index < 10 ? "" : ""} ${index + 1}`}
                text={feature}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default GetStartted;
