import axios from "axios";
import EditUserModal from "./EditUserModal";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useUser } from "@/src/context/UserContext";
import { UsersType } from "@/src/util/Types";

interface TableRowType {
  user: UsersType;
  index: number;
}

export default function UsersRow({ user, index }: TableRowType) {
  const { users, setUsers } = useUser();
  function deleteHandler() {
    const filterData = users.filter(
      (filterTool) => filterTool._id !== user._id
    );
    const token = Cookies.get("token");
    if (window.confirm("Устгах уу?")) {
      axios
        .delete(
          `${process.env.NEXT_PUBLIC_PUBLIC_SERVER}/users/delete?id=${user._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          console.log("res", res);

          if (res.data.deletedCount == 1) {
            setUsers(filterData);
            toast.info("Амжилттай устгагдлаа");
          } else {
            toast.error("something error");
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  }

  return (
    <tr className="hover:bg-gray-50">
      <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
        {index + 1}
      </td>
      <td className="px-6 py-4">{user.name}</td>
      <td className="px-6 py-4">{user.email}</td>
      <td className="px-6 py-4">{user.role}</td>
      <td className="px-6 py-4">
        <EditUserModal user={user} />
      </td>
      <td
        className="px-6 py-4 cursor-pointer text-red-500"
        onClick={deleteHandler}
      >
        Delete
      </td>
    </tr>
  );
}
