import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myOrders } from "../../redux/actions/orderAction";
import { Link } from "react-router-dom";
import Loader from "../Loader";
import MetaData from "../MetaData";

const OrderContainer = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 99%;
  padding: 8px;
  .MuiDataGrid-columnHeaderWrapper {
    background-color: #5cfa34;
  }
  .greencolor {
    color: green;
  }
  .redColor {
    color: red;
  }
`;

const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 200, flex: 0.6 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 110,
      flex: 0.4,
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minWidth: 100,
      sortable: false,
      flex: 0.4,
      renderCell: (params) => {
        return (
          <Link
            to={`/order/${params.getValue(params.id, "id")}`}
            style={{
              textDecoration: "none",
              color: "white",
              padding: "0px 10px",
              backgroundColor: "#5cfa34",
            }}
          >
            <span>View</span>
          </Link>
        );
      },
    },
  ];
  const rows = [];
  orders &&
    orders.forEach((order, index) => {
      rows.push({
        id: order._id,
        status: order.orderStatus,
        itemsQty: order.orderItems.length,
        amount: order.totalPrice,
      });
    });

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error]);
  return (
    <Fragment>
      <MetaData title={`${user.name}--Orders`} />
      {loading ? (
        <Loader />
      ) : (
        <OrderContainer>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            autoHeight
            disbaleSelectionOnClick
          />
        </OrderContainer>
      )}
    </Fragment>
  );
};

export default MyOrders;
