import Layout from "@/component/Layout";
import { useOthers } from "@/context/OthersContext";
import { CiSearch } from "react-icons/ci";
import { ToolType } from "@/util/Types";
import axios from "axios";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { Section } from "@/component/motionScroll/MotionScroll";

export default function Shop({ tools }: { tools: ToolType[] }): JSX.Element {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const { setActivePage } = useOthers();

  function handleSort(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
  }

  const filteredTools = tools.filter((tool) =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTools = filteredTools.sort((a, b) =>
    a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
  );
  return (
    <Layout>
      <Section>
        <div className="w-screen flex flex-col justify-center">
          <div className="w-full h-auto relative flex flex-col items-center justify-center">
            <img src="/Rectangle.webp" className="w-full relative store-img" />
            <div className="w-full flex flex-col justify-center items-center absolute">
              <h5 className="font-bold text-white text-8xl font-poppins">
                STORE
              </h5>
              <div className="w-[608px] store-search-input h-[56px] flex items-center border border-[#424242] px-[23px] py-2 mt-[50px]">
                <input
                  type="text"
                  onChange={handleSort}
                  placeholder="search tools"
                  className="w-full italic placeholder-black focus:outline-none bg-transparent mr-[20px]"
                />
                <CiSearch className="w-[30px] h-[30px]" />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center border-b border-[#dadada]">
            <div className="w-[1120px] flex flex-wrap gap-6 justify-center py-[50px] border-s-[0.5px] border-[#dadada] px-[10px]">
              {sortedTools.length > 0 ? (
                sortedTools.map((tool, index) => (
                  <div
                    onClick={() => {
                      router.push(`../store/${tool._id}`);
                      localStorage.setItem("page", "");
                      setActivePage("");
                    }}
                    key={index}
                    className="w-[256px] h-[400px] cursor-pointer"
                  >
                    <img
                      className="w-full hover:bg-violet-600"
                      src={tool.image_url}
                    />
                    <div className="flex justify-center mt-[12px] text-lg">
                      <p>{tool.name}</p>
                    </div>
                    <div className="flex justify-center">
                      <p className="font-bold">price soon $</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full text-center">
                  <p className="text-[24px]">No tools found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Section>
    </Layout>
  );
}

interface Props {
  tools: ToolType[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const tools = await axios
    .get(`${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/tools/get`)
    .then((res) => res.data);

  return {
    props: {
      tools: tools,
    },
  };
};
