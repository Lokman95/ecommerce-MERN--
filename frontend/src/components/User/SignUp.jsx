import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import FaceIcon from "@material-ui/icons/Face";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { clearError, register } from "../../redux/actions/userAction";
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
const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 70%;
  margin: auto;
  padding: 2vmax;
`;
const SignUpEmail = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  & > svg {
    position: absolute;
    transform: translateX(1vmax);
  }
`;
const SignUpName = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  & > svg {
    position: absolute;
    transform: translateX(1vmax);
  }
`;
const SignUpPassword = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  & > svg {
    position: absolute;
    transform: translateX(1vmax);
  }
`;
const RegisterImage = styled.div`
  & > img {
    height: 25px;
    width: 25px;
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

const SignUp = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/profile.png");

  const registerSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (isAuthenticated) {
      history.push("/account");
    }
  }, [dispatch, error, alert, history, isAuthenticated]);

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
                  <p>SIGNUP</p>
                </MenuContainer>
                <Button></Button>
              </Menu>
              <SignUpForm
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <SignUpName>
                  <FaceIcon />
                  <Input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </SignUpName>
                <SignUpEmail>
                  <MailOutlineIcon />
                  <Input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </SignUpEmail>
                <SignUpPassword>
                  <LockOpenIcon />
                  <Input
                    type="password"
                    placeholder="Password at least 8 charecters"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </SignUpPassword>

                <RegisterImage>
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                  <p
                    style={{
                      fontSize: 12,
                      display: "flex",
                      marginLeft: 30,
                      color: "gray",
                    }}
                  >
                    Smaller than 750 kb
                  </p>
                </RegisterImage>
                <InputBtn type="submit" value="Register" />
                <a href="/login" style={{ color: "gray", fontSize: 12 }}>
                  Already Have Account?
                  <span
                    style={{
                      color: "#307fe7",
                      cursor: "pointer",
                      fontSize: 17,
                    }}
                  >
                    Login here !
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
              </SignUpForm>
            </LoginSignUpBox>
          </LoginSignUpContainer>
        </>
      )}
    </>
  );
};

export default SignUp;
