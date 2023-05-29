/* eslint-disable @typescript-eslint/no-explicit-any */
import { useOthers } from "@/context/OthersContext";
import { RecipesType, ToolType } from "@/util/Types";
import Image from "next/image";
import { useRouter } from "next/router";
import { Carousel } from "primereact/carousel";
import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

export default function Store({
  snowBank,
}: {
  snowBank: RecipesType;
}): JSX.Element {
  const router = useRouter();
  const { setActivePage } = useOthers();
  const shopIcon =
    "w-[30px] h-[30px] p-[10px] w-[50px] h-[50px] rounded-[25px] border cursor-pointer ease-in duration-100";
  const responsiveOptions = [
    {
      breakpoint: "1199px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "1091px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "767px",
      numVisible: 2,
      numScroll: 1,
    },
  ];
  const toolTemplate = (tool: ToolType) => (
    <div
      className="cursor-pointer relative tool-card"
      key={tool._id}
      onClick={() => {
        router.push(`../store/${tool._id}`);
        setActivePage("");
        localStorage.setItem("page", "");
      }}
    >
      <Image
        src={tool.image_url}
        alt="tool"
        width={1000}
        height={1000}
        className="mb-10 z-20 hover:opacity-10 hover:z-0"
      />

      <p className="absolute bottom-[-50px] w-full text-white text-center">
        {tool.name}
      </p>
      <HiOutlineShoppingBag
        className={`${shopIcon} text-white absolute top-0 z-10 hover:block mx-[38.5%] mt-[120px] tool-icon`}
      />
    </div>
  );

  return (
    <div className="">
      <div className="Container border-s-[0.5px] border-[#424242] pb-[90px] pt-[80px]">
        <h1 className="font-semibold Store-title text-[72px] leading-[86px] pb-[50px] ps-[40px] text-[#FFFFFF]">
          Store
        </h1>
        <div className="flex Store">
          <div className="relative Store-image h-full object-cover mt-auto">
            <Image
              src={snowBank.image_url}
              width={1000}
              height={1000}
              alt={"snowbank"}
              className="Store-image-abs"
            />

            <HiOutlineShoppingBag
              onClick={() => {
                router.push("../store");
                localStorage.setItem("page", "store");
                setActivePage("store");
              }}
              className={`${shopIcon} Store-image-icon text-[#A0A0A0] border-[#A0A0A0] absolute bottom-[40px] right-[40px] hover:border-white hover:text-white`}
            />
          </div>
          <div className="ps-[45px] w-[57%] Store-shop-slider h-full flex flex-col justify-start">
            <h2 className="font-semibold text-[48px] py-[30px] Store-shop-title leading-[72px] text-[#FFFFFF] ms-[20px]">
              Snowbank
            </h2>
            <div className="flex flex-col gap-[45px] pt-[20px] h-[40%]">
              <div>
                <h3 className="font-semibold text-[28px] leading-[24px] text-[#FFFFFF] pb-[20px] ps-[20px]">
                  Tools
                </h3>
                <div>
                  <Carousel
                    nextIcon={<SlArrowRight />}
                    prevIcon={<SlArrowLeft />}
                    circular={true}
                    value={snowBank.tools_id}
                    numVisible={2}
                    numScroll={1}
                    responsiveOptions={responsiveOptions}
                    itemTemplate={toolTemplate}
                  />
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[28px] leading-[24px] text-[#FFFFFF] pb-[40px] ps-[20px]">
                  Ingredients
                </h3>
                <div className="p-[20px] flex flex-col gap-2 w-[84%]">
                  {snowBank.ingredients.map((ing: any, index: number) => (
                    <div className="text-[#f4f4f4]" key={index}>
                      {ing}
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="buyButton w-[385px] ms-[20px] text-[#ffffff] border-[#ffffff] font-semibold leading-[16px] text-[16px] py-[16px] border-[1px]"
                onClick={() => {
                  router.push("../store");
                  localStorage.setItem("page", "store");
                  setActivePage("store");
                }}
              >
                buy bar set
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
