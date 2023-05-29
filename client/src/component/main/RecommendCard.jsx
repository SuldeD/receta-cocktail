/* eslint-disable camelcase */
import { motion } from "framer-motion";
import { fadeIn } from "../../util/motion";
import { BsArrowUpRight } from "react-icons/bs";
import Image from "next/image";
import { useRouter } from "next/router";

const InsightCard = ({ image_url, name, description, index, _id }) => {
  const router = useRouter();
  return (
    <motion.div
      variants={fadeIn("up", "spring", index * 0.5, 1)}
      className="flex md:flex-row flex-col gap-4"
    >
      <Image
        src={image_url}
        width={300}
        height={300}
        alt={"image"}
        className="md:w-[270px] w-full h-[250px]  object-cover cursor-pointer md:hover:h-[270px] duration-500"
        onClick={() => router.push(`../cocktail/${_id}`)}
      />
      <div className="w-full flex justify-between items-center">
        <div className="flex-1 md:ml-[62px] flex flex-col max-w-[650px]">
          <h4 className="font-normal lg:text-[32px] text-[26px] text-white">
            {name}
          </h4>
          <p className="mt-[16px] font-normal lg:text-[20px] text-[14px] text-gray-400">
            {description}
          </p>
        </div>
        <div
          className="lg:flex hidden items-center justify-center w-[100px] h-[100px] p-[35px] hover:p-7 rounded-full duration-500 cursor-pointer bg-transparent border-[1px] border-white hover:rotate-[45deg]"
          onClick={() => router.push(`../cocktail/${_id}`)}
        >
          <BsArrowUpRight className="text-white w-[50px] h-[50px] " />
        </div>
      </div>
    </motion.div>
  );
};

export default InsightCard;
