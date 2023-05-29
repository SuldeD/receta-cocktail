/* eslint-disable @typescript-eslint/no-explicit-any */
import { useOthers } from "@/context/OthersContext";
import { RecipesType, ToolType } from "@/util/Types";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Carousel } from "primereact/carousel";
import { useEffect, useState } from "react";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

interface DetailsType {
  recipe: RecipesType;
  tools: ToolType[];
}

export default function Details({ recipe, tools }: DetailsType): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [usedTools, setUsedTools] = useState<any>([]);
  const router = useRouter();
  const { setActivePage } = useOthers();

  function getToolById(id: string) {
    return tools.find((tool: ToolType) => tool._id === id);
  }

  useEffect(() => {
    const temp = recipe.tools_id.map((tool) => getToolById(tool._id));
    setUsedTools(temp);
  }, []);

  const toolTemplate = (tool: ToolType) => (
    <div className="my-auto" key={tool._id}>
      <Link href={`../store/${tool._id}`}>
        <img src={tool.image_url} alt={tool.name} />
        <div className="text-white text-center mt-4">
          <div className="mb-3">{tool.name}</div>
        </div>
      </Link>
    </div>
  );

  const responsiveOptions = [
    {
      breakpoint: "1199px",

      numVisible: 4,
      numScroll: 1,
    },
    {
      breakpoint: "910px",
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: "520px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  return (
    <div className="border-x border-[#424242] relative">
      <div className="flex flex-col min-[990px]:flex-row max-w-[1300px] mx-auto">
        <div className="w-full min-[990px]:w-[50%]">
          <div className="relative">
            <div className="image-bg">
              <picture>
                <img
                  className="w-full"
                  src={`${recipe.image_url}`}
                  alt="image"
                />
              </picture>
              <div className="overlay" />
            </div>
            <div className="text-white text-[52px] absolute bottom-[10%] w-full text-center font-semibold tracking-wider cocktail-title">
              {recipe.name}
            </div>
            <div className="text-white text-xl absolute bottom-[6%] w-full text-center font-light">
              {recipe.categories_id[0]?.name}
            </div>
            <div
              className="absolute top-[5%] left-[5%] cursor-pointer"
              onClick={() => {
                router.back();
                localStorage.setItem("page", "cocktails");
                setActivePage("cocktails");
              }}
            >
              <SlArrowLeft className="text-white w-[16px] h-[16px]" />
            </div>
          </div>
        </div>
        <div className="w-full min-[991px]:w-[50%] relative text-white tabs">
          <Tabs>
            <TabList
              className="px-10"
              style={{ justifyContent: "space-evenly" }}
            >
              <Tab
                _selected={{
                  color: "white !important",
                  borderBottom: "1px solid white",
                }}
              >
                <span className="md:px-8 py-5 md:text-[24px] text:[16px] cocktail-text">
                  Ingredients
                </span>
              </Tab>
              <Tab
                _selected={{
                  color: "white !important",
                  borderBottom: "1px solid white",
                }}
              >
                <span className="md:text-[24px] md:px-8 py-5 text:[16px] cocktail-text">
                  Step by step
                </span>
              </Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <div className="h-[40vh] min-[1000px]:h-[35vh] min-[1200px]:h-[50vh] flex flex-col flex-wrap md:mt-20 px-5 mt-5 md:px-[76px] gap-10 overflow-y-auto text-xl">
                  {recipe.ingredients.map(
                    (ingredient: string, index: number) => (
                      <div key={index}>
                        {index + 1}.{" "}
                        <span className="ps-2 md:text-[22px] sm:text-[16px] cocktail-text">
                          {ingredient}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </TabPanel>
              <TabPanel>
                <div className="h-[40vh] min-[1000px]:h-[35vh] min-[1200px]:h-[50vh] md:px-[74px] px-5 md:mt-20 mt-5 overflow-y-auto">
                  <div className="text-[20px]">
                    {recipe.how_to.map((single: any, index: number) => (
                      <div
                        key={index}
                        className="leading-8 mb-[3rem] font-medium cocktail-text"
                      >
                        <p className="mb-1 md:text-[22px] sm:text-[16px]">
                          Step {index + 1}.
                        </p>
                        <p className="md:text-[22px] sm:text-[16px]">
                          {single}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </div>
      <div className="bg-[#FFFBF1]">
        <div className="max-w-[1300px] w-full mx-auto text-white bg-[#121212] singleProd-tab py-5 px-10">
          <div className="text-2xl font-semibold ps-[3.5rem] mt-5">
            Used tools
          </div>
          <div className="mt-5 recipe-carousel">
            {usedTools.length < 5 ? (
              <div className="flex max-[767px]:flex-col gap-[2%] px-[3.5rem]">
                {usedTools.map((tool: any) => (
                  <div
                    className="w-[23.5%] max-[991px]:w-[49%] max-[767px]:w-full"
                    key={tool._id}
                  >
                    <Link href={`../store/${tool._id}`}>
                      <img src={tool.image_url} alt={tool.name} />
                      <div className="text-white text-center mt-4">
                        <div className="mb-3">{tool.name}</div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <Carousel
                nextIcon={<SlArrowRight />}
                prevIcon={<SlArrowLeft />}
                circular={true}
                value={usedTools}
                numVisible={5}
                responsiveOptions={responsiveOptions}
                itemTemplate={toolTemplate}
                indicatorsContentClassName={"flex justify-center gap-0"}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
