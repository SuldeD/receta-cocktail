import axios from "axios";
import { GetStaticProps } from "next";
import { useEffect } from "react";
import Layout from "../components/Layout";
import AddUserModal from "../components/users/AddUserModal";
import UsersRow from "../components/users/UsersRow";
import { useUser } from "../context/UserContext";
import { UserProps, UsersType } from "../util/Types";

export default function User({
  usersData,
}: {
  usersData: UsersType[];
}): JSX.Element {
  const { setUsers, users } = useUser();
  useEffect(() => {
    setUsers(usersData);
  }, [setUsers, usersData]);

  return (
    <Layout>
      <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md ps-[20px]">
        <div className="my-[20px]">
          <AddUserModal title="Add User" />
        </div>
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                #
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Name
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Email
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Role
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900" />
              <th scope="col" className="px-6 py-4 font-medium text-gray-900" />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {users.map((user: UsersType, index: number) => (
              <UsersRow key={user._id} user={user} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<UserProps> = async () => {
  const usersData = await axios
    .get(`${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/users/all`)
    .then((res) => res.data);

  return {
    props: {
      usersData,
    },
  };
};
