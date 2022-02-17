import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import MetaData from "../../components/MetaData";
import Sidebar from "./Sidebar";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import styled from "styled-components";
import {
  getAllUsers,
  clearError,
  deleteUser,
} from "../../redux/actions/userAction";
import { DELETE_USER_RESET } from "../../redux/const/userConst";
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

const UserList = ({ history }) => {
  const dispatch = useDispatch();
  const { error, users } = useSelector((state) => state.allUsers);
  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
    if (deleteError) {
      dispatch(clearError());
    }
    if (isDeleted) {
      history.push("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, isDeleted, history, message]);
  const columns = [
    { field: "id", headerName: "User ID", minWith: 180, flex: 0.8 },
    { field: "email", headerName: "Email", minWith: 200, flex: 0.8 },
    {
      field: "name",
      headerName: "Name",
      minWith: 150,
      flex: 0.6,
    },
    {
      field: "role",
      headerName: "Role",
      minWith: 160,
      flex: 0.3,
      cellClassName: (params) => {
        return params.getValue(params.id, "role") === "admin"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      minWith: 150,
      flex: 0.4,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
              <Button>
                <EditIcon />
              </Button>
            </Link>

            <Button
              onClick={() =>
                deleteUserHandler(params.getValue(params.id, "id"))
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
  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
      });
    });

  return (
    <>
      <MetaData title="User List" description="User List" />
      <Container>
        <Sidebar />
        <AllProducts>
          <h1 style={{ marginLeft: 450, padding: 15 }}>All Users</h1>
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

export default UserList;
