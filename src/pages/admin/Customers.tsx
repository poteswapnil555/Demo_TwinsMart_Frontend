import { ReactElement, useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { ColumnDef } from "@tanstack/react-table";
import TableHOC from "../../components/admin/TableHOC";
import { FaTrash } from "react-icons/fa";
import { Skeleton } from "../../components/Loader";
import { CustomError } from "../../types/apiTypes";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/Store";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
} from "../../redux/api/userApi";
import { responseToast } from "../../utils/Features";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action?: ReactElement;
}

const Customers = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError, error } = useAllUsersQuery(user?._id!);
  const [rows, setRows] = useState<DataType[]>([]);
  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (userId: string) => {
    const res = await deleteUser({ userId, adminUserId: user?._id! });
    responseToast(res, null, "");
  };

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data) {
      setRows(
        data.users.map((i) => ({
          avatar: (
            <img
              style={{ borderRadius: "50%" }}
              src={i.photo}
              alt={i.name}
              width={40}
              height={40}
            />
          ),
          name: i.name,
          email: i.email,
          gender: i.gender,
          role: i.role,
          action: (
            <button onClick={() => deleteHandler(i._id)}>
              <FaTrash />
            </button>
          ),
        }))
      );
    }
  }, [data]);

  const columns: ColumnDef<DataType>[] = [
    {
      header: "Avatar",
      cell: (info) => info.row.original.avatar,
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Gender",
      accessorKey: "gender",
    },
    {
      header: "Role",
      accessorKey: "role",
    },
    {
      header: "Action",
      cell: (info) => info.row.original.action,
    },
  ];

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <TableHOC
            columns={columns}
            data={rows}
            containerClassname="dashboard-product-box"
            heading="Customers"
            showPagination={rows.length > 6}
          />
        )}
      </main>
    </div>
  );
};

export default Customers;
