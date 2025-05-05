import { ReactElement, useEffect, useState } from "react";
import TableHOC from "../components/admin/TableHOC";
import { ColumnDef } from "@tanstack/react-table";
import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";
import { useMyOrdersQuery } from "../redux/api/orderApi";
import { CustomError } from "../types/apiTypes";
import toast from "react-hot-toast";
import { Skeleton } from "../components/Loader";
import { Link } from "react-router-dom";

// Define the row data type
type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

// Define table columns
const column: ColumnDef<DataType>[] = [
  {
    header: "ID",
    accessorKey: "_id",
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },
  {
    header: "Discount",
    accessorKey: "discount",
  },
  {
    header: "Amount",
    accessorKey: "amount",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: (info) => info.getValue(),
  },
  {
    header: "Action",
    accessorKey: "action",
    cell: (info) => info.getValue(),
  },
];

const Orders = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, isError, error } = useMyOrdersQuery(user?._id!);

  const [rows] = useState<DataType[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data) {
      data.orders.map((i) => ({
        _id: i._id,
        amount: i.total,
        discount: i.discount,
        quantity: i.orderItems.length,
        status: (
          <span
            className={
              i.status === "Processing"
                ? "red"
                : i.status === "Shipped"
                ? "green"
                : "purple"
            }
          >
            {i.status}
          </span>
        ),
        action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
      }));
    }
  }, [data]);

  const Table = (
    <TableHOC<DataType>
      columns={column}
      data={rows}
      containerClassname="dashboard-product-box"
      heading="Orders"
      showPagination={rows.length > 6}
    />
  );

  return (
    <div className="container">
      <h1>My Orders</h1>
      {isLoading ? <Skeleton length={20} /> : Table}
    </div>
  );
};

export default Orders;
