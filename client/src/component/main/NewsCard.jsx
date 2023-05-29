/* eslint-disable camelcase */
import { motion } from "framer-motion";
import { fadeIn } from "../../util/motion";

const NewsCard = ({
  _id,
  image_url,
  category,
  index,
  active,
  handleClick,
  subTitle,
}) => (
  <motion.div
    variants={fadeIn("right", "spring", index * 0.8, 0.75)}
    className={`relative flex items-center justify-center min-w-[150px] max-h-[600px] transition-[flex] duration-[0.4s] ease-in-out opacity-100 ${
      active === _id
        ? "lg:flex-[2.5] flex-[10]"
        : "lg:flex-[1.5] flex-[2] filter grayscale contrast-100"
    }`}
    onHoverStart={() => handleClick(_id)}
    style={{ opacity: 1 }}
  >
    <img
      src={image_url}
      alt="planet-04"
      className="absolute w-full h-full object-cover opacity-[0.6]"
    />
    {active !== _id ? (
      <h3 className="font-semibold sm:text-[26px] text-[18px] text-white absolute z-0 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0] ">
        {category}
      </h3>
    ) : (
      <div className="absolute bottom-0 p-8 flex justify-start w-full flex-col rounded-b-[16px]">
        <motion.h2
          variants={fadeIn("up", "tween", 0.2)}
          initial="hidden"
          whileInView="show"
          className="mt-[24px] font-semibold sm:text-[32px] text-[24px] text-white"
        >
          {category}
        </motion.h2>
        <motion.p
          variants={fadeIn("up", "tween", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className="lg:mb-[24px] font-semibold sm:text-[24px] text-[16px] text-white"
        >
          {subTitle}
        </motion.p>
      </div>
    )}
  </motion.div>
);

export default NewsCard;
