import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import FaceIcon from "@material-ui/icons/Face";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {
  clearError,
  loadUser,
  updateProfile,
} from "../../redux/actions/userAction";
import MetaData from "../MetaData";
import { UPDATE_PROFILE_RESET } from "../../redux/const/userConst";
import { useAlert } from "react-alert";

const UpdateProfileContainer = styled.div`
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

const UpdateProfileBox = styled.div`
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
const UpdateProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 70%;
  margin: auto;
  padding: 2vmax;
`;
const UpdateProfileEmail = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  & > svg {
    position: absolute;
    transform: translateX(1vmax);
  }
`;
const UpdateProfileName = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  & > svg {
    position: absolute;
    transform: translateX(1vmax);
  }
`;

const UpdateProfileImage = styled.div`
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

const UpdateProfile = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { user } = useSelector((state) => state.user);
  const { error, loading, isUpdated } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/profile.png");

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("avatar", avatar);
    dispatch(updateProfile(myForm));
  };

  const updateProfileDataChange = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert.error("Please update your profile");
      dispatch(clearError());
    }

    if (isUpdated) {
      alert.success("Profile Update Successfully");
      dispatch(loadUser());
      history.push("/account");

      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, history, isUpdated, user, alert]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Profile" />
          <UpdateProfileContainer>
            <UpdateProfileBox>
              <Menu>
                <MenuContainer>
                  <p>Update profile</p>
                </MenuContainer>
                <Button></Button>
              </Menu>
              <UpdateProfileForm
                encType="multipart/form-data"
                onSubmit={updateProfileSubmit}
              >
                <UpdateProfileName>
                  <FaceIcon />
                  <Input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </UpdateProfileName>
                <UpdateProfileEmail>
                  <MailOutlineIcon />
                  <Input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </UpdateProfileEmail>

                <UpdateProfileImage>
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProfileDataChange}
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
                </UpdateProfileImage>
                <InputBtn type="submit" value="Update" />
              </UpdateProfileForm>
            </UpdateProfileBox>
          </UpdateProfileContainer>
        </>
      )}
    </>
  );
};

export default UpdateProfile;
