import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "../context/UserContext";
import { Menu, MenuButton, MenuList, Tooltip } from "@chakra-ui/react";
import Cookies from "js-cookie";
import { Pages } from "../util/constVariables";
import Login from "./Login";
import { useOthers } from "../context/OthersContext";
import { Example } from "./menu/MotionMenu";
import React from "react";
import { TbLogout } from "react-icons/tb";

export default function Header(): JSX.Element {
  const router = useRouter();
  const { user, setUser } = useUser();
  const { activePage, setActivePage } = useOthers();

  return (
    <header className="header">
      <div className="Container flex justify-between">
        <Tooltip label="Cocktails page" aria-label="A tooltip" openDelay={200}>
          <h1
            className="logo"
            onClick={() => {
              router.push("../");
              setActivePage("cocktails");
              localStorage.setItem("page", "cocktails");
            }}
          >
            receta.
          </h1>
        </Tooltip>

        <div className="header-pages flex justify-between">
          {Pages.map((page, index) => (
            <Link
              className={
                activePage == page.name
                  ? "border-b text-[#1e1e1e] border-[#1e1e1e]"
                  : "text-[#1e1e1e] z-10"
              }
              key={index}
              href={page.url}
              onClick={() => {
                localStorage.setItem("page", page.name);
                setActivePage(page.name);
              }}
            >
              <Tooltip
                label={`${page.name} page`}
                aria-label="A tooltip"
                openDelay={200}
              >
                {page.name}
              </Tooltip>
            </Link>
          ))}
        </div>
        {user ? (
          <Menu>
            <div className="flex gap-5">
              <MenuButton>
                {user.picture ? (
                  <picture>
                    <img
                      className="w-[35px] h-[35px] rounded-[25px]"
                      src={user.picture}
                      alt=""
                    />
                  </picture>
                ) : (
                  <div className="w-[35px] h-[35px] p-1 rounded-[25px] bg-[#f2f2f2] text-black text-center  uppercase">
                    {user.name?.slice(0, 1)}
                  </div>
                )}
              </MenuButton>
              <Example />
            </div>
            <MenuList className="flex text-center flex-col gap-3">
              <div className="text-[16px] p-2 text-gray-600 border-b-[1px] flex w-full justify-center gap-1">
                Hello!{" "}
                <p className="text-black text-center font-bold"> {user.name}</p>
              </div>

              <p
                className="text-gray-500 cursor-pointer hover:text-[#1e1e1e] flex justify-center mx-auto"
                onClick={() => {
                  setUser(undefined), Cookies.remove("token");
                }}
              >
                log out
                <TbLogout className="mt-[5px] ms-[8px]" />
              </p>
            </MenuList>
          </Menu>
        ) : (
          <div className="flex gap-5">
            <Login />
            <Example />
          </div>
        )}
      </div>
    </header>
  );
}
