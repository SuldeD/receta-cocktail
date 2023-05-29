import { useOthers } from "../../context/OthersContext";
import { CollectionType } from "../../util/Types";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "@/util/motion";

export default function Collection({
  collections,
}: {
  collections: CollectionType[];
}): JSX.Element {
  const { setActiveCollectionBtn, activeCollectionBtn } = useOthers();
  const [test, setTest] = useState(false);

  useEffect(() => {
    localStorage.getItem("currentCollection")
      ? setActiveCollectionBtn(localStorage.getItem("currentCollection"))
      : setActiveCollectionBtn("Difficulty");
  }, []);

  return (
    <div className={`bg-white `}>
      <div className="Collection Container relative">
        <div className="w-[50%] relative Col-section-left h-full">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeIn("down", "tween", 0.2)}
          >
            {" "}
            <div className="Collection-div">
              <h1 className="text-[48px] text-[#000] font-medium Collection-title">
                {activeCollectionBtn && activeCollectionBtn}
              </h1>
              <p className="text-[#000] Collection-text">
                The origins of the word `cocktail` have been debated . The first
                written mention of `cocktail` as a beverage appeared in The
                Farmers Cabinet, 1803 in the United States. The first definition
                of a cocktail as an alcoholic beverage appeared three years
                later in The Balance and Columbian Repository May 13, 1806
              </p>
              <div className={`gap-[12px] flex flex-wrap left-buttons`}>
                {collections.map((collection, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveCollectionBtn(collection.name),
                        localStorage.setItem(
                          "currentCollection",
                          collection.name
                        );
                      localStorage.removeItem("category");
                      setTest(!test);
                    }}
                    className={
                      activeCollectionBtn === collection.name
                        ? `py-[6px] px-[16px] text-[#fff] bg-[#000] border-[1px] border-[#fff] rounded-[50px] duration-300 z-10`
                        : `py-[6px] px-[16px] text-[#000] border-[1px] border-[#000] rounded-[50px] z-10`
                    }
                  >
                    {collection.name}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="Collection-arrow absolute text-black rounded-[50%] bottom-[56px] right-[-26px]">
            <div className="container ">
              <div className="chevron" />
              <div className="chevron" />
              <div className="chevron" />
              <span className="text text-black">Scroll down</span>
            </div>
          </div>
        </div>{" "}
        <div className="w-[50%] Col-section-right">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.25 }}
            variants={fadeIn("down", "tween", 0.2)}
          >
            {collections.map(
              (collection, index) =>
                activeCollectionBtn === collection.name && (
                  <img
                    key={index}
                    className="Col-right-image"
                    src={collection.image_url}
                    alt="col"
                  />
                )
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
