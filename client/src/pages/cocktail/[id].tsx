/* eslint-disable @typescript-eslint/no-explicit-any */
import { CommentType, RecipesType, ToolType } from "@/util/Types";
import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Comment from "@/component/cocktail/Comment";
// import RatingComp from "@/component/cocktail/Rating";
import Details from "@/component/cocktail/Details";
// import { Rating } from "primereact/rating";
import Layout from "@/component/Layout";
import Link from "next/link";
import { Carousel } from "primereact/carousel";
import Image from "next/image";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";

interface RecipeType {
  recipe: RecipesType;
  comments: CommentType[];
  recommend: RecipesType[];
  tools: ToolType[];
}

export default function Recipe({
  recipe,
  comments,
  recommend,
  tools,
}: RecipeType): JSX.Element {
  const recommendTemplate = (recipe: RecipesType) => (
    <div className="my-auto" key={recipe._id}>
      <Link href={`../cocktail/${recipe._id}`}>
        <Image
          src={recipe.image_url}
          alt={`${recipe.name} image`}
          width={1000}
          height={1000}
        />
        <div className="text-white text-center mt-4">
          {recipe.categories_id.map((cate: any) => (
            <p className="text-[#989898]" key={cate._id}>
              {cate.name}
            </p>
          ))}
          <div
            className="mb-3 text-[20px] text-[#dadada
          ] font-medium"
          >
            {recipe.name}
          </div>
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
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: "520px",
      numVisible: 2,
      numScroll: 1,
    },
  ];
  return (
    <Layout>
      <div className="bg-[#1A1A1A]">
        <Details recipe={recipe} tools={tools} />
        <div className="bg-[#FFFBF1] border-b border-[#dadada]">
          <div className="text-[#1e1e1e] text-[20px] max-w-[1300px] pt-[10vh] pb-20 mx-auto border-x border-[#dadada]">
            <div className="px-20 singleProd-sub-div">
              {/* <div className="flex justify-between">
                <p className="text-3xl font-bold">{recipe.name}</p>
                <div>
                  <Rating value={5} disabled cancel={false} />
                </div>
              </div> */}
              <p className="w-[65%] mt-8 singleProd-description">
                {recipe.description}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#FFFBF1]">
          <div className="max-w-[1300px] mx-auto border-x border-[#dadada]">
            <div className="flex gap-5 px-20 py-10 singleProd-review">
              <Comment comments={comments} recipe_id={recipe._id} />
              {/* <RatingComp /> */}
            </div>
          </div>
        </div>
        <div className="related">
          <div className="max-w-[1300px] mx-auto mt-[50px] text-white text-[28px] font-semibold">
            <p>Related cocktails</p>
            <p className="mt-1 border w-[80px]" />
          </div>
          <div className="max-w-[1340px] mx-auto py-[50px] border-b">
            <div className="w-full">
              <Carousel
                prevIcon={<SlArrowLeft />}
                nextIcon={<SlArrowRight />}
                circular={true}
                value={recommend}
                numVisible={4}
                numScroll={1}
                responsiveOptions={responsiveOptions}
                itemTemplate={recommendTemplate}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/recipes/get-ids`
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
interface RecipeProps {
  recipe: RecipesType | null;
}

export const getStaticProps: GetStaticProps<RecipeProps> = async ({
  params,
}: GetStaticPropsContext) => {
  const recipe = await axios
    .get(
      `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/recipes/get?id=${params?.id}`
    )
    .then((res) => res.data);
  const comments = await axios
    .get(
      `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/comments/find?id=${params?.id}`
    )
    .then((res) => res.data);
  const recommend = await axios
    .get(`${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/recipes/recommend`)
    .then((res) => res.data);
  const tools = await axios
    .get(`${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/tools/get`)
    .then((res) => res.data);

  return {
    props: {
      recipe,
      comments,
      recommend,
      tools,
    },
  };
};
