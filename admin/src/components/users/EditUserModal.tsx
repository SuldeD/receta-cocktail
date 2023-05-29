/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUser } from "@/src/context/UserContext";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";

interface UserModalType {
  user: any;
}

export default function EditUserModal({ user }: UserModalType) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { users, setUsers } = useUser();

  function submitHandler(e: any) {
    e.preventDefault();
    const token = Cookies.get("token");
    const data = {
      _id: user._id,
      name: e.target.name.value,
      email: e.target.email.value,
      role: e.target.role.value,
    };
    const filterData = users.filter(
      (filterUser: { _id: any }) => filterUser._id !== user._id
    );
    axios
      .patch(
        `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/users/${user._id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.data.email == data.email) {
          setUsers([...filterData, data]);
        }
      });
  }

  return (
    <>
      <div className="cursor-pointer text-blue-500" onClick={onOpen}>
        Edit
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <form onSubmit={submitHandler}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input type="text" name="name" defaultValue={user.name} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" defaultValue={user.email} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Role</FormLabel>
                <Select defaultValue={user.role} name="role">
                  <option value="CLIENT">CLIENT</option>
                  <option value="ADMIN">ADMIN</option>
                  <option value="MODERATOR">MODERATOR</option>
                </Select>
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose} type="submit">
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
