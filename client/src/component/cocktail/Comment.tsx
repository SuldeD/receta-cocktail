/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/no-explicit-any */
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { GrEmoji } from "react-icons/gr";
import { IoMdSend } from "react-icons/io";
import { useState } from "react";
import { useUser } from "@/context/UserContext";
import axios from "axios";
import { Button, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { CommentType } from "@/util/Types";
import moment from "moment";
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";

export default function Comment({
  comments,
  recipe_id,
}: {
  recipe_id: string;
  comments: CommentType[];
}): JSX.Element {
  const [emoji, setEmoji] = useState<string>("");
  const [commentsArr, setCommentsArr] = useState<any>(comments);
  const [showComment, setShowComment] = useState<boolean>(false);
  const { user } = useUser();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function CommentHandler(e: any) {
    e.preventDefault();
    if (user) {
      const data = {
        comment: e.target.comment.value,
        writer: { picture: user.picture, name: user.name },
        recipe_id: recipe_id,
        created_at: moment().format("l"),
      };

      axios
        .post(`${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/comments/create`, data)
        .then((res) => {
          res.data.comment === data.comment
            ? setCommentsArr([...commentsArr, data])
            : alert(res.data);
        });
    } else {
      alert("login");
    }

    setEmoji("");
  }

  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            isActive={isOpen}
            as={Button}
            style={{
              backgroundColor: "#1e1e1e",
              color: "#FFFBF1",
              margin: "30px 0",
            }}
            rightIcon={
              isOpen ? (
                <AiOutlineEye className="w-[25px] h-[25px]" />
              ) : (
                <AiOutlineEyeInvisible className="w-[25px] h-[25px]" />
              )
            }
          >
            Comment
          </MenuButton>
          <MenuList className="p-10 lg:w-[900px] md:w-[500px] w-[300px] absolute bottom-[56px]">
            {" "}
            <h2 className="border-b-2 py-[10px] text-[24px] font-medium">
              Comment
            </h2>
            {commentsArr.length == 0 && (
              <div className="flex text-gray-500">
                <MdOutlineDoNotDisturbAlt className="w-[25px] h-[25px] mt-[3px]" />
                <p className="text-center text-[20px] ms-1">Not comment</p>
              </div>
            )}
            {commentsArr.map((data: any, index: number) => (
              <div key={index}>
                <div key={index} className="flex py-4">
                  {data.writer.picture ? (
                    <img
                      className="rounded-[25px] w-[32px] h-[32px]"
                      src={data.writer.picture}
                    />
                  ) : (
                    <div className="w-[35px] h-[35px] p-1 rounded-[25px] bg-[#f2f2f2] text-black text-center  uppercase">
                      {data.writer.name?.slice(0, 1)}
                    </div>
                  )}
                  <p className="ms-[10px]"> {data.writer.name}</p>
                  <p className="ms-[10px] mt-1 text-[16px] text-gray-400">
                    {data.created_at}
                  </p>
                </div>
                <div className="ms-[40px] bg-slate-100 w-[80%] p-3 rounded-md">
                  {data.comment}
                </div>
              </div>
            ))}
            <div className="relative">
              <form className="flex w-full mt-[40px]" onSubmit={CommentHandler}>
                <div className="relative flex">
                  <picture className="absolute top-0 left-0 mt-[5px] ms-2 rounded-[25px]">
                    {user ? (
                      <div>
                        {user.picture ? (
                          <img
                            className="w-[32px] h-[32px] rounded-[25px]"
                            src={user.picture}
                            alt=""
                          />
                        ) : (
                          <div className="w-[32px] h-[32px] p-1 rounded-[25px] bg-[#f2f2f2] text-black text-center uppercase">
                            {user.name?.slice(0, 1)}
                          </div>
                        )}
                      </div>
                    ) : (
                      <AiOutlineUser className="w-[30px] h-[30px] rounded-[25px] border text-gray-500 mt-[2px]" />
                    )}
                  </picture>

                  <input
                    type="text"
                    name="comment"
                    className={
                      emoji
                        ? `border border-gray-500 ps-[45px] p-[8px] lg:w-[695px] w-[200px] rounded-[20px]`
                        : `border border-gray-500 ps-[45px] p-[8px] lg:w-[300px] w-[200px] rounded-[20px]`
                    }
                    placeholder="write a comment"
                    value={emoji}
                    onChange={(e) => setEmoji(e.target.value)}
                  />
                  <GrEmoji
                    onClick={() => setShowComment(!showComment)}
                    className="hover:bg-gray-100 rounded-[25px] absolute cursor-pointer w-[30px] h-[30px] right-2 top-[5px]"
                  />
                </div>
                {showComment && (
                  <div className={`absolute z-10 top-12`}>
                    <Picker
                      data={data}
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      onEmojiSelect={(e: any) => {
                        setEmoji(emoji.concat(e.native));
                      }}
                    />
                  </div>
                )}

                {emoji ? (
                  <button type="submit">
                    <IoMdSend
                      data-te-animation-init
                      data-te-animation-reset="true"
                      data-te-animation="[slide-right_1s_ease-in-out]"
                      className="hover:bg-gray-100 cursor-pointer mt-[1px] ms-3 w-[30px] text-[#1e1e1e] h-[30px]"
                    />
                  </button>
                ) : (
                  <IoMdSend className="text-gray-300 mt-[10px] ms-3 w-[30px] h-[30px]" />
                )}
              </form>
            </div>
          </MenuList>
        </>
      )}
    </Menu>
  );
}
