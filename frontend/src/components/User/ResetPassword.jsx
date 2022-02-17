import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { clearError, resetPassword } from "../../redux/actions/userAction";
import MetaData from "../MetaData";
import { useAlert } from "react-alert";
import LockOpenIcon from "@material-ui/icons/LockOpen";

const ResetPasswordContainer = styled.div`
  width: 100vw;
  height: 100vh;
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: grey;
  position: fixed;
  top: 0;
  left: 0;
`;

const ResetPasswordBox = styled.div`
  background-color: #eee9e9;
  width: 25vw;
  height: 70vh;
  box-sizing: border-box;
  overflow: hidden;
`;
const Menu = styled.div``;
const MenuContainer = styled.div`
  display: flex;
  height: 3vmax;
  & > p {
    color: gray;
    font-weight: 300;
    transition: all 0.5s;
    cursor: pointer;
    display: grid;
    place-items: center;
    width: 100%;
    :hover {
      color: #ffc107;
    }
  }
`;
const Button = styled.button`
  background-color: #e72323;
  height: 1px;
  width: 100%;
  border: none;
`;
const ResetPasswordForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 70%;
  margin: auto;
  padding: 2vmax;
`;
const ResetPasswordStyle = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  & > svg {
    position: absolute;
    transform: translateX(1vmax);
  }
`;

const InputBtn = styled.input`
  border: none;
  background-color: tomato;
  padding: 1vmax 3vmax;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background-color: #e03214;
    transition: all 0.5s;
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

const ResetPassword = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, success } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(match.params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (success) {
      alert.success("Password Reset successfully");
      history.push("/login");
    }
  }, [dispatch, error, history, success, alert]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Reset Password" />
          <ResetPasswordContainer>
            <ResetPasswordBox>
              <Menu>
                <MenuContainer>
                  <p>Reset Password</p>
                </MenuContainer>
                <Button></Button>
              </Menu>
              <ResetPasswordForm onSubmit={resetPasswordSubmit}>
                <ResetPasswordStyle>
                  <LockOpenIcon />
                  <Input
                    type="password"
                    placeholder="New Password"
                    required
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </ResetPasswordStyle>
                <ResetPasswordStyle>
                  <LockOpenIcon />
                  <Input
                    type="password"
                    placeholder="Confirm New Password"
                    required
                    name="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </ResetPasswordStyle>

                <InputBtn type="submit" value="Reset" />
              </ResetPasswordForm>
            </ResetPasswordBox>
          </ResetPasswordContainer>
        </>
      )}
    </>
  );
};

export default ResetPassword;
