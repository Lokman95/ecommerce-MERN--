import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import styled from "styled-components";
//import SignUp from "./SignUp";
//import FaceIcon from "@material-ui/icons/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearError, login } from "../../redux/actions/userAction";
import { useAlert } from "react-alert";

const LoginSignUpContainer = styled.div`
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
  z-index: 1;
`;

const LoginSignUpBox = styled.div`
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
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 70%;
  margin: auto;
  padding: 2vmax;
`;
const LoginEmail = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  & > svg {
    position: absolute;
    transform: translateX(1vmax);
  }
`;
const LoginPassword = styled.div`
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
  cursor: pointer;
  font: 300 0.9vmax cursive;
  border-radius: 5px;
`;

const Login = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  const link = location.search ? location.search.split("=")[1] : "/account";
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isAuthenticated) {
      //alert.success("Logged in successfully");
      history.push(link);
    }
  }, [dispatch, error, alert, isAuthenticated, history, link]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <LoginSignUpContainer>
            <LoginSignUpBox>
              <Menu>
                <MenuContainer>
                  <p>LOGIN</p>
                </MenuContainer>
                <Button></Button>
              </Menu>
              <LoginForm onSubmit={loginSubmit}>
                <LoginEmail>
                  <MailOutlineIcon />
                  <Input
                    key="email"
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </LoginEmail>
                <LoginPassword>
                  <LockOpenIcon />
                  <Input
                    key="password"
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </LoginPassword>
                <Link to="/password/forgot">Forget Password ?</Link>
                <InputBtn type="submit" value="Login" />
                <a href="/signup" style={{ color: "gray", fontSize: 12 }}>
                  Don't Have Account?
                  <span
                    style={{
                      color: "#307fe7",
                      cursor: "pointer",
                      fontSize: 17,
                    }}
                  >
                    SignUp here !
                  </span>
                </a>

                <a href="/" style={{ textDecoration: "inherit" }}>
                  <span
                    style={{
                      marginTop: 15,
                      color: "#307fe7",
                      cursor: "pointer",
                      fontSize: 20,
                    }}
                  >
                    Home
                  </span>
                </a>
              </LoginForm>
            </LoginSignUpBox>
          </LoginSignUpContainer>
        </>
      )}
    </>
  );
};

export default Login;
