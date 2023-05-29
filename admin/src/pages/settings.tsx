/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Box,
  Button,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Stack,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import Layout from "../components/Layout";
import { useUser } from "../context/UserContext";
import jwtDecide from "jwt-decode";

export default function Settings(): JSX.Element {
  const [spinner, setSpinner] = useState<string>();
  const [show, setShow] = useState<boolean>(false);
  const handleClick = () => setShow(!show);
  const { user, setUser } = useUser();

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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function createCateHandler(e: any) {
    e.preventDefault();
    if (
      e.target.newPassword.value === e.target.verPassword.value &&
      e.target.currentPassword.value !== e.target.newPassword.value &&
      e.target.currentPassword.value !== e.target.verPassword.value &&
      e.target.currentPassword.value == user?.password
    ) {
      setSpinner("loading");
      const token = Cookies.get("token");
      const data = {
        _id: user?._id,
        email: user?.email,
        name: user?.name,
        role: user?.role,
        password: e.target.verPassword.value,
      };
      const result = await axios.patch(
        `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/users/admin/${user?._id}`,
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (result.data.access_token) {
        setUser(jwtDecide(result.data.access_token));
        Cookies.set("token", result.data.access_token);
        setSpinner("run");
        successToast();
      }
    } else {
      errToast();
    }
    e.target.currentPassword.value = "";
    e.target.newPassword.value = "";
    e.target.verPassword.value = "";
  }
  return (
    <Layout>
      <form
        className="flex flex-col max-w-[500px]"
        onSubmit={createCateHandler}
      >
        <Stack spacing="16px">
          <Box>
            <FormLabel htmlFor="name">Current password</FormLabel>
            <Input
              name="currentPassword"
              placeholder="Please enter current password"
            />
          </Box>
          <Box>
            <FormLabel htmlFor="name">New Password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter new password"
                name="newPassword"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
          <Box>
            <FormLabel htmlFor="name">Re-type new password</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter re-type new password"
                name="verPassword"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </Box>
          <Button
            colorScheme="teal"
            type="submit"
            leftIcon={spinner == "loading" ? <Spinner size="xs" /> : <></>}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Layout>
  );
}
