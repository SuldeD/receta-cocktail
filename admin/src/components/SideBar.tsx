import { useRouter } from "next/router";
import { BiHomeAlt2 } from "react-icons/bi";
import { BsFillPeopleFill } from "react-icons/bs";
import { TbBrandShopee } from "react-icons/tb";
import { RiSettings3Fill } from "react-icons/ri";
import { MdBookmarkBorder } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { useOthers } from "../context/OthersContext";
import { SiApplenews } from "react-icons/si";
import { useUser } from "../context/UserContext";
import Cookies from "js-cookie";

export default function SideBar(): JSX.Element {
  const { activePage, setActivePage } = useOthers();
  const { setUser } = useUser();
  const router = useRouter();

  return (
    <div className="h-[100vh] sidebar ps-[40px] bg-white">
      <div className="fixed">
        <h1 className="text-[teal] text-[32px] font-bold mb-[80px] mt-[50px] sidebar-title">
          receta.
        </h1>
        <div className="w-[120%] sidebar-menu">
          {pages.map((page, index) => (
            <button
              key={index}
              className={
                activePage == page.name
                  ? "w-full rounded-md text-[20px] text-left text-[#fff] bg-[teal] flex mb-[20px] items-center p-[8px]"
                  : "w-full text-[20px] text-left text-[#C9C9C9] bg-[#FCFCFC] flex items-center mb-[20px] p-[8px]"
              }
              onClick={() => {
                router.push(`/${page.url}`);
                setActivePage(page.name);
                localStorage.setItem("page", page.name);
              }}
            >
              <span className="mt-[3px] w-[20px] h-[20px] mb-[2px]">
                {page.icon}
              </span>
              <p className="m-0 pl-[10px] sidebar-name">{page.name}</p>
            </button>
          ))}
        </div>

        <div
          className="flex gap-[6px] cursor-pointer mt-[30vh]"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onClick={async () => {
            setUser(null),
              Cookies.remove("token"),
              localStorage.removeItem("page"),
              await router.push("../login");
          }}
        >
          <CiLogout className="text-[#FF543E] mt-[2px] w-[20px] h-[20px] ms-[6px]" />{" "}
          <p>Log out</p>
        </div>
      </div>
    </div>
  );
}

interface PageType {
  name: string;
  url: string;
  icon: JSX.Element;
}
export const pages: PageType[] = [
  {
    url: "../",
    name: "Dashboard",
    icon: <BiHomeAlt2 />,
  },
  {
    url: "../recipe",
    name: "Recipe",
    icon: <TbBrandShopee />,
  },
  {
    url: "../news",
    name: "News",
    icon: <SiApplenews />,
  },

  {
    url: "../user",
    name: "User",
    icon: <BsFillPeopleFill />,
  },
  {
    url: "../order",
    name: "Order",
    icon: <MdBookmarkBorder />,
  },
  {
    url: "../settings",
    name: "Settings",
    icon: <RiSettings3Fill />,
  },
];
