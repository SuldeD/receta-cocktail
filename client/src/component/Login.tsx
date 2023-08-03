import { useRouter } from "next/router";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
  Tooltip,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import axios from "axios";
import { FaCocktail } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { AiOutlineShopping } from "react-icons/ai";

export default function Login({ icon }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  function googleLoginHandler() {
    axios
      .get(`${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/google-login`)
      .then((res) => {
        router.push(res.data);
      });
  }
  const [openPopup, setPopup] = useState<boolean>(false);

  return (
    <>
      <Tooltip label="Login" aria-label="A tooltip" openDelay={200}>
        <button
          onClick={() => {
            onOpen();
            !icon && setPopup(true);
            setTimeout(() => setPopup(false), 1500);
          }}
          className="z-10"
        >
          {icon ? (
            <BiUser className="w-[24px] h-[24px] mx-auto flex text-center cursor-pointer basket-icon" />
          ) : (
            <div>
              <AiOutlineShopping className="w-[24px] h-[24px] mx-auto flex text-center cursor-pointer basket-icon" />
            </div>
          )}
        </button>
      </Tooltip>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />

        <ModalContent className="relative">
          {openPopup && (
            <div className="absolute z-50 top-[10px] w-full h-[20px]">
              <Alert status="warning">
                <AlertIcon />
                <p className="text-[14px]">Нэвтрэх шаардлагатай</p>
              </Alert>
            </div>
          )}
          <ModalHeader className="flex text-[#101419]">
            <h1 className="login-logo">receta.</h1>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={10}>
            <FaCocktail className="mx-auto text-center text-[#DE2D01] w-[44px] h-[44px] my-[30px]" />
            <p className="login-title">Welcome back</p>
            <p className="login-sub-title">
              Please sign in to your google account thanks!
            </p>
            <span
              onClick={googleLoginHandler}
              className="flex place-content-center cursor-pointer mt-[45px] mb-2 px-5 py-[12px] bg-white  border-[#cecdcd] max-w-[334px] mx-auto border-[0.3px] gap-2 hover:bg-gray-50 duration-300"
            >
              <FcGoogle className="mt-[3px] w-[20px] h-[20px]" />
              <p className="text-[16px] text-[#424242]">sign in google</p>
            </span>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
