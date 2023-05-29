import { useRouter } from "next/router";
import React from "react";
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
} from "@chakra-ui/react";
import axios from "axios";
import { FaCocktail } from "react-icons/fa";

export default function Login() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  function googleLoginHandler() {
    axios
      .get(`${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/google-login`)
      .then((res) => {
        router.push(res.data);
        localStorage.setItem("page", "cocktails");
      });
  }

  return (
    <>
      <Tooltip label="Login" aria-label="A tooltip" openDelay={200}>
        <button onClick={onOpen} className="z-10">
          Log in
        </button>
      </Tooltip>

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
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
              className="flex place-content-center cursor-pointer mt-[45px] mb-2 px-5 py-[12px] bg-white border border-[#cecdcd] max-w-[334px] mx-auto border-[0.3px] gap-2 hover:bg-gray-50 duration-300"
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
