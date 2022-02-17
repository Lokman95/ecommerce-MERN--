import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaDta from "../../components/MetaData";
import Sidebar from "../../components/Admin/Sidebar";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import styled from "styled-components";
import { UPDATE_USER_RESET } from "../../redux/const/userConst";
import {
  getUserDetails,
  updateUser,
  clearError,
} from "../../redux/actions/userAction";
import Loader from "../../components/Loader";

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  height: 100vh;
  background-color: #1221cf6a;
`;
const ProductContainer = styled.div`
  margin-left: 300px;
  width: 500px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 70%;
  margin: auto;
  padding: 2vmax;
`;
const Heading = styled.h1`
  padding: 20px;
`;
const InputContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 15px;
  align-items: center;
  & > svg {
    position: absolute;
    transform: translateX(1vmax);
  }
`;

const Input = styled.input`
  padding: 1vmax 4vmax;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #1f1e1e;
  outline: none;
  border-radius: 5px;
`;

const Select = styled.select`
  padding: 1vmax 4vmax;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #1f1e1e;
  outline: none;
  border-radius: 5px;
`;

const ButtonContainer = styled.button`
  border: none;
  background-color: tomato;
  padding: 1vmax 3vmax;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 14px;
  :hover {
    background-color: #e03214;
    transition: all 0.5s;
  }
`;

const UpdateUserRole = ({ history, match }) => {
  const dispatch = useDispatch();
  const { error, loading, user } = useSelector((state) => state.userDetails);
  const {
    error: updateError,
    loading: updateLoading,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const userId = match.params.id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      dispatch(clearError());
    }
    if (updateError) {
      dispatch(clearError());
    }
    if (isUpdated) {
      history.push("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, history, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <>
      <MetaDta title="Update User Role" />
      <MainContainer>
        <Sidebar />
        <ProductContainer>
          {loading ? (
            <Loader />
          ) : (
            <Form onSubmit={updateUserSubmitHandler}>
              <Heading>Update User Role</Heading>
              <InputContainer>
                <SpellcheckIcon />
                <Input
                  type="text"
                  placeholder="Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </InputContainer>
              <InputContainer>
                <AttachMoneyIcon />
                <Input
                  type="email"
                  placeholder="Email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputContainer>

              <InputContainer>
                <Select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </Select>
              </InputContainer>

              <ButtonContainer
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update User
              </ButtonContainer>
            </Form>
          )}
        </ProductContainer>
      </MainContainer>
    </>
  );
};

export default UpdateUserRole;
