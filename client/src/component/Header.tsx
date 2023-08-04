import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "../context/UserContext";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  MenuIcon,
  Tooltip,
  useDisclosure,
  Avatar,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Cookies from "js-cookie";
import { Pages } from "../util/constVariables";
import Login from "./Login";
import { useOthers } from "../context/OthersContext";
import { Example } from "./menu/MotionMenu";
import React, { useRef, useState } from "react";
import { TbLogout } from "react-icons/tb";
import { AiOutlineShopping } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function Header(): JSX.Element {
  const router = useRouter();
  const { user, setUser } = useUser();
  const { activePage, setActivePage } = useOthers();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<any>();
  const [openPopup, setPopup] = useState<boolean>(false);

  return (
    <header className="header">
      <div className="Container flex justify-between">
        <Tooltip label="Cocktails page" aria-label="A tooltip" openDelay={200}>
          <h1
            className="logo"
            onClick={() => {
              router.push("../");
              setActivePage("cocktails");
            }}
          >
            receta.
          </h1>
        </Tooltip>
        {openPopup && (
          <div className="absolute z-50 top-[20px] right-5 w-[200px] h-[20px]">
            <Alert status="error">
              <AlertIcon />
              <p className="text-[14px]">Системээс гарлаа</p>
            </Alert>
          </div>
        )}

        <div className="header-pages flex justify-between">
          {Pages.map((page, index) => (
            <Link
              className={
                activePage == page.name
                  ? "border-b text-[#1e1e1e] border-[#1e1e1e]"
                  : "text-[#1e1e1e] z-10 hover:border-b"
              }
              key={index}
              href={page.url}
              onClick={() => {
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
          <div className="flex gap-6 ">
            <MenuIcon
              onClick={() => {
                router.push("/basket");
                setActivePage("basket");
              }}
            >
              <AiOutlineShopping className="w-[26px] h-[26px] mx-auto flex text-center cursor-pointer basket-icon" />
            </MenuIcon>

            <MenuIcon onClick={onOpen}>
              <BiUser className="w-[24px] h-[24px] mx-auto flex text-center cursor-pointer basket-icon" />
            </MenuIcon>

            <Example />
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
              size={"sm"}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                  <div className="text-center mt-[20px]">
                    <Avatar
                      size={"md"}
                      name={`${user?.name}`}
                      src={`${user?.picture}`}
                    />
                  </div>
                  <div className="text-[16px] p-2 text-gray-600 flex w-full justify-center gap-1">
                    Hello!{" "}
                    <p className="text-black text-center font-bold">
                      {user.name}
                    </p>
                  </div>
                </DrawerHeader>

                <DrawerBody>
                  <div className="bg-[#282A3A] w-full h-[140px] rounded-[18px] p-5">
                    <p className="mb-[10px] text-[#fff] text-[20px] font-bold">
                      Receta wallet
                    </p>
                    <div className="flex justify-between text-[#fff] mt-[30px]">
                      <p className="text-[18px]">{"$ 1,000,000"}</p>
                      <Button colorScheme={"whatsapp"}>Top Up+</Button>
                    </div>
                  </div>
                  <div className="mt-[30px]">
                    <Button
                      className="w-full bg-[#282A3A]"
                      colorScheme={"#282A3A"}
                    >
                      <IoMdAddCircleOutline className="text-[20px] h-[20px] me-[8px]" />
                      <p>Add bank card</p>
                    </Button>
                  </div>
                </DrawerBody>

                <DrawerFooter>
                  <Button
                    colorScheme="red"
                    className="text-[#fff] cursor-pointer flex justify-center  bg-red-500 w-full"
                    onClick={() => {
                      setUser(undefined);
                      Cookies.remove("token");
                      setPopup(true);
                      setTimeout(() => setPopup(false), 1500);
                    }}
                  >
                    log out
                    <TbLogout className="mt-[2px] ms-[8px]" />
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        ) : (
          <div className="flex gap-5">
            <Login icon={null} />
            <Login icon={"a"} />
            <Example />
          </div>
        )}
      </div>
    </header>
  );
}
