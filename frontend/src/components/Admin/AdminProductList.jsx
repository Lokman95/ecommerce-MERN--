import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import {
  clearErrors,
  getProductAdmin,
  deleteProduct,
} from "../../redux/actions/productAction";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../../components/MetaData";
import Sidebar from "./Sidebar";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import styled from "styled-components";
import { useAlert } from "react-alert";
import { ADMIN_PRODUCT_DELETE_RESET } from "../../redux/const/productConst";

const Container = styled.div`
  display: flex;
`;
const AllProducts = styled.div`
  width: 80vw;
`;

const AdminProductList = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, products } = useSelector((state) => state.products);
  const { error: errorDelete, isDeleted } = useSelector(
    (state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (errorDelete) {
      alert.error(errorDelete);
      dispatch(clearErrors());
    }
    if (isDeleted) {
      alert.success("Product deleted");
      history.push("/admin/dashboard");
      dispatch({ type: ADMIN_PRODUCT_DELETE_RESET });
    }
    dispatch(getProductAdmin());
  }, [dispatch, alert, error, errorDelete, isDeleted, history]);
  const columns = [
    { field: "id", headerName: "Product ID", minWith: 200, flex: 0.5 },
    { field: "name", headerName: "Name", minWith: 300, flex: 1 },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWith: 150,
      flex: 0.3,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWith: 270,
      flex: 0.5,
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
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <Button>
                <EditIcon />
              </Button>
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
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
  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        stock: item.Stock,
        price: item.price,
      });
    });

  return (
    <>
      <MetaData title="Admin Product List" description="Admin Product List" />
      <Container>
        <Sidebar />
        <AllProducts>
          <h1 style={{ marginLeft: 450, padding: 15 }}>All Products</h1>
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

export default AdminProductList;
