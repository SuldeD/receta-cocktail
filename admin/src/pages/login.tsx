import { useToast } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import RecetaIcon from "../icons/RecetaIcon";
import UserIcon from "../icons/UserIcon";
import PasswordIcon from "../icons/PasswordIcon";
import jwtDecide from "jwt-decode";
import { useUser } from "../context/UserContext";

export default function Login(): JSX.Element {
  const router = useRouter();
  const { setUser, user } = useUser();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function loginHandler(e: any) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/users/login`,
      {
        email,
        password,
      }
    );

    if (result.data.access_token) {
      Cookies.set("token", result.data.access_token);
      setUser(jwtDecide(result.data.access_token));
      router.push("/");
      successToast();
    } else {
      errToast();
    }
  }

  const successToast = useToast({
    position: "top-right",
    title: "success",
    containerStyle: {
      width: "10%",
      maxWidth: "100%",
    },
    status: "success",
    duration: 2000,
    isClosable: true,
  });

  const errToast = useToast({
    position: "top-right",
    title: "something wrong",
    containerStyle: {
      width: "10%",
      maxWidth: "100%",
    },
    status: "error",
    duration: 2000,
    isClosable: true,
  });

  if (user) {
    router.push("../");
    return <div>404 not pount</div>;
  } else {
    return (
      <div className="w-screen h-screen flex">
        <div className="w-1/2 h-full bg-blue-100">
          <img className="w-full h-full object-cover" src="/MaskGroup.png" />
        </div>
        <div className="w-1/2 h-full flex justify-center items-center bg-[#1E1E1E]">
          <form
            className="flex flex-col justify-center gap-4 w-[406px] p-7 "
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={(e) => loginHandler(e)}
          >
            <div className="w-full flex jsutify-between">
              <RecetaIcon />
              <p className="text-lime-800 text-lg font-bold ml-[8px] mt-[3px]">
                admin 1.3.0
              </p>
            </div>
            <div>
              <div className="h-[40px] flex border-b items-center">
                <UserIcon />
                <input
                  className="w-full italic placeholder-white ml-[10px] bg-transparent focus:outline-none text-white"
                  name="email"
                  id="email1"
                  type="email"
                  placeholder="username"
                  required={true}
                />
              </div>
            </div>
            <div>
              <div className="h-[40px] flex border-b items-center">
                <PasswordIcon />
                <input
                  className="w-full italic placeholder-white ml-[10px] bg-transparent focus:outline-none text-white"
                  name="password"
                  id="password1"
                  type="password"
                  placeholder="password"
                  required={true}
                />
              </div>
            </div>
            <button
              className="bg-white h-[38px] rounded-full font-bold hover:bg-zinc-300 border-none mt-[10px]"
              type="submit"
            >
              Нэвтрэх
            </button>
          </form>
        </div>
      </div>
    );
  }
}
