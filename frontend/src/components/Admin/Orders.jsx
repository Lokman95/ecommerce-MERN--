import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { DELETE_ORDER_RESET } from "../../redux/const/orderConst";
import { Button } from "@material-ui/core";
import MetaData from "../../components/MetaData";
import Sidebar from "./Sidebar";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import styled from "styled-components";
import {
  deleteOrder,
  getAllOrders,
  clearErrors,
} from "../../redux/actions/orderAction";

const Container = styled.div`
  display: flex;
`;
const AllProducts = styled.div`
  width: 80vw;
  .redColor {
    color: red;
  }
  ,
  .greenColor {
    color: green;
  }
`;

const Orders = ({ history }) => {
  const dispatch = useDispatch();
  const { error, orders } = useSelector((state) => state.allOrders);
  const { error: errorDelete, isDeleted } = useSelector(
    (state) => state.updateOrders
  );

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    if (errorDelete) {
      dispatch(clearErrors());
    }
    if (isDeleted) {
      history.push("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }
    dispatch(getAllOrders());
  }, [dispatch, error, errorDelete, isDeleted, history]);
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
      field: "actions",
      headerName: "Actions",
      minWith: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
              <Button>
                <EditIcon />
              </Button>
            </Link>

            <Button
              onClick={() =>
                deleteOrderHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteOutlineIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];
  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
      });
    });

  return (
    <>
      <MetaData title="Admin Order List" description="Admin Product List" />
      <Container>
        <Sidebar />
        <AllProducts>
          <h1 style={{ marginLeft: 450, padding: 15 }}>All Orders</h1>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </AllProducts>
      </Container>
    </>
  );
};

export default Orders;
