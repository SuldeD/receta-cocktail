// import { useRouter } from "next/router";
// import { CiSearch } from "react-icons/ci";
import { RiArrowDropDownFill } from "react-icons/ri";
import { useOthers } from "../context/OthersContext";
import { useUser } from "../context/UserContext";

export default function Navbar(): JSX.Element {
  const { activePage } = useOthers();
  const { user } = useUser();

  return (
    <div className="text-white my-[50px] p-[8px] flex justify-between rounded-md border-[0.2px]">
      <div className="text-[teal] flex flex-col justify-center">
        {activePage && activePage}
      </div>
      <div className="flex gap-3 ">
        {user && (
          <div className="text-gray-400 flex gap-1 pt-3">
            Hello! <p className="text-[black] font-bold">{user.name}</p>
          </div>
        )}
        {user?.picture ? (
          <picture className="flex flex-col justify-center">
            <img
              className="rounded-[50%] h-[25px] object-cover w-[25px]"
              src="https://i.guim.co.uk/img/media/bc12099e16c5e0a7ed7b1e63687dac6dd71ff13b/305_331_2800_1680/master/2800.jpg?width=620&quality=45&dpr=2&s=none"
              alt="..."
            />
          </picture>
        ) : (
          <div className="flex flex-col justify-center">
            <div className="text-black bg-gray-300 w-[30px] h-[30px] text-center rounded-[25px] p-[2px] ">
              {user?.name.slice(0, 1)}
            </div>
          </div>
        )}
        <RiArrowDropDownFill className="w-6 h-6 cursor-po" />
      </div>
    </div>
  );
}
