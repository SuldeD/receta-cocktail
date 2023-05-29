import React, { Dispatch, SetStateAction } from "react";
import Image from "next/image";

type Tool = {
  _id: string;
  name: string;
  image_url: string;
};

type ToolProps = {
  tools: Tool[];
  selectTools: string[];
  setSelectTools: Dispatch<SetStateAction<string[]>>;
};

const AddToolHandler: React.FC<ToolProps> = ({
  tools,
  selectTools,
  setSelectTools,
}) => {
  function addToolHandler(id: string) {
    if (selectTools.includes(id)) {
      setSelectTools(selectTools.filter((tool) => tool !== id));
    } else {
      setSelectTools([...selectTools, id]);
    }
  }

  return (
    <>
      {tools.map((tool, index) => (
        <div
          className={
            selectTools.includes(tool._id)
              ? "w-[170px] py-[10px] border-[1px] border-teal-500 cursor-pointer flex flex-col items-center"
              : "w-[170px] py-[10px] border-[0.5px] border-[#dadada] flex flex-col cursor-pointer items-center"
          }
          key={index}
          onClick={() => addToolHandler(tool._id)}
        >
          <p className="">{tool.name}</p>
          <Image
            className="drop-shadow-2xl"
            priority={true}
            alt="tool image"
            src={tool.image_url}
            height={80}
            width={80}
          />
        </div>
      ))}
    </>
  );
};

export default AddToolHandler;
