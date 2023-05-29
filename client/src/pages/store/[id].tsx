import Layout from "@/component/Layout";
import { useOthers } from "@/context/OthersContext";
import { ToolType } from "@/util/Types";
import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { SlArrowLeft } from "react-icons/sl";

export default function Recipe(props: {
  tool: ToolType;
  tools: ToolType[];
}): JSX.Element {
  const tool: ToolType = props.tool;
  const label = "text-[16px] font-light border-b border-dashed ";
  const { setActivePage } = useOthers();
  const router = useRouter();

  return (
    <Layout>
      <div>
        <div className="flex bg-white Container store-single relative">
          <div
            className="absolute top-[5%] left-[5%] cursor-pointer"
            onClick={() => {
              router.back();
            }}
          >
            <SlArrowLeft className="w-[16px] h-[16px]" />
          </div>
          <picture className="w-full">
            <img
              className="h-[80vh] border-e border-dashed object-cover"
              src={tool.image_url}
              alt="tool"
            />
          </picture>
          <div className="p-[50px] mb-[50px] w-60% flex flex-col gap-[30px]">
            <p className="text-[32px] font-semibold">{tool.name}</p>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
              aspernatur laborum ipsam nulla repellat excepturi maxime magnam
              labore accusamus voluptate.
            </p>
            <p className={`${label}`}>Stock:</p>
            <p className={`${label}`}>Price:</p>
            <p className={`${label}`}>Brand:</p>
            <button className="buy-button">Coming soon buy</button>
          </div>
        </div>
        <div className="bg-[#f0f0f0]">
          <h3 className="mt-10  text-[24px] Container text-[#121212] store-sub-title pt-20">
            Popular
          </h3>
          <div className="flex justify-between py-[30px] Container store-sub-cont pb-20">
            {props.tools.slice(0, 5).map(
              (tool: ToolType, index: number) =>
                props.tool.name !== tool.name && (
                  <Link
                    href={tool._id}
                    key={index}
                    onClick={() => {
                      localStorage.setItem("page", "");
                      setActivePage("");
                    }}
                  >
                    <picture>
                      <img
                        src={tool.image_url}
                        className="store-sub-img"
                        alt="tool"
                      />
                    </picture>
                    <p className="text-center py-2 text-[#171717]">
                      {tool.name}
                    </p>
                  </Link>
                )
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/tools/get-ids`
  );
  const resJson = await res.data;
  const paths = await resJson.map((id: { _id: string }) => ({
    params: {
      id: id._id,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};
interface ToolProps {
  tool: ToolType | null;
}

export const getStaticProps: GetStaticProps<ToolProps> = async ({
  params,
}: GetStaticPropsContext) => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/tools/find?id=${params?.id}`
  );
  const tool = await res.data;

  const tools = await axios
    .get(`${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/tools/get`)
    .then((res) => res.data);

  return {
    props: {
      tool: tool,
      tools: tools,
    },
  };
};
