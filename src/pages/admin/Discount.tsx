import { useFetchData } from "6pp";
import { useEffect, useState, ReactElement } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ColumnDef } from "@tanstack/react-table";

import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { Skeleton } from "../../components/Loader";
import { RootState, server } from "../../redux/Store";
import { AllDiscountResponse } from "../../types/apiTypes";

/* const server = "https://backend.TwinsMart.com";  New Domain from Route53 Service of AWS
 paste in line no : 47 {server} */

interface CouponType {
  _id: string;
  code: string;
  amount: number;
}

interface DataType {
  code: string;
  amount: number;
  _id: string;
  action: ReactElement;
}

const columns: ColumnDef<DataType>[] = [
  { header: "Id", accessorKey: "_id", cell: (info) => info.getValue() },
  { header: "Code", accessorKey: "code" },
  { header: "Amount", accessorKey: "amount" },
  { header: "Action", accessorKey: "action", cell: (info) => info.getValue() },
];

const Discount = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const userId = user?._id ?? "";

  const {
    data,
    loading: isLoading,
    error,
  } = useFetchData<AllDiscountResponse>({
    url: `${server}/api/v1/payment/coupon/all?id=${userId}`,
    key: "discount-codes",
    dependencyProps: [userId],
  });

  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(() => {
    if (data?.coupons)
      setRows(
        data.coupons.map((i: CouponType) => ({
          _id: i._id,
          code: i.code,
          amount: i.amount,
          action: <Link to={`/admin/discount/${i._id}`}>Manage</Link>,
        }))
      );
  }, [data]);

  if (error) toast.error(error);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>
        {isLoading ? (
          <Skeleton length={20} />
        ) : (
          <TableHOC<DataType>
            columns={columns}
            data={rows ?? []}
            containerClassname="dashboard-product-box"
            heading="Discount Codes"
            showPagination={true}
          />
        )}
      </main>
      <Link to="/admin/discount/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Discount;
