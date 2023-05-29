import { useOthers } from "@/context/OthersContext";
import { useRouter } from "next/router";
import { Carousel } from "primereact/carousel";
import React from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { TitleText, TypingText } from "./CustomTexts";
import { motion } from "framer-motion";
import { fadeIn } from "@/util/motion";

export default function OurStory(): JSX.Element {
  const { setActivePage } = useOthers();
  const router = useRouter();
  const ourStoryValue = [
    "In the late 19th and early 20th century, bars went from being seedy spots hidden in alleyways to popular gathering spots. Bartenders began dressing up to work and following set recipes.",
    "Jerry Thomas published the country’s first cocktail book, The Bon Vivant’s Compnion, in 1862.",
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ourStoryTemplate = (value: any) => (
    <p key={value._id} className="text-[18px] py-2">
      {value}
    </p>
  );
  const responsiveOptions = [
    {
      breakpoint: "1199px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "991px",
      numVisible: 1,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 1,
      numScroll: 1,
    },
  ];
  return (
    <div className="text-white ourstory flex flex-col justify-center min-h-[80vh]">
      <div className="Container oustory-cont">
        <motion.div
          variants={fadeIn("up", "spring", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
        >
          <TypingText title="| Our story" textStyles="text-left" />{" "}
          <div className="flex ourstory-cont gap-20">
            <div className=" ourstory-right flex flex-col justify-between">
              <div>
                <TitleText title={<>Our story</>} textStyles="text-left" />
                <div className="mb-5">
                  <Carousel
                    prevIcon={<SlArrowLeft />}
                    nextIcon={<SlArrowRight />}
                    value={ourStoryValue}
                    circular={true}
                    numVisible={1}
                    numScroll={1}
                    responsiveOptions={responsiveOptions}
                    itemTemplate={ourStoryTemplate}
                    indicatorsContentClassName={"flex justify-center"}
                  />
                </div>
              </div>
              <button
                className="py-2 ourstory-button px-[6rem] border me-auto"
                onClick={() => {
                  localStorage.setItem("page", "about");
                  setActivePage("about");
                  router.push("../about");
                }}
              >
                read more
              </button>
            </div>{" "}
            <img src="./OurStory.webp" className="ourstory-img" alt="image" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
