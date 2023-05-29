import { useOthers } from "@/context/OthersContext";
import { useRouter } from "next/router";
import React from "react";

export default function HowToUse(): JSX.Element {
  const router = useRouter();
  const { setActivePage } = useOthers();
  return (
    <div className="HowToUse py-[5rem] text-white">
      <div className="Container flex flex-col gap-7 p-5">
        <h1 className="text-3xl font-semibold">How to use Shaker</h1>
        <p className="HowToUse-text">
          In the shaker you are mixing the ingredients, cooling the drink down,
          air rate it and giving the right dilution. And for some cocktails
          making foam and releasing flavors from herbs and fruits. Watch Kenji
          showing you the technics of shaking.
        </p>
        <button
          className="py-3 px-[6rem] border me-auto"
          onClick={() => {
            router.push("../news"),
              localStorage.setItem("page", "news"),
              setActivePage("news");
          }}
        >
          read more
        </button>
      </div>
    </div>
  );
}
