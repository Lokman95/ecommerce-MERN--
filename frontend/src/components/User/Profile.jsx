import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MetaData from "../MetaData";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import Styled from "styled-components";

const Container = Styled.div`
display: flex;
height: 100vh;
width: 100vw;
max-width: 100%;
background-color: #cecdc865;
top: 0;
left: 0;
`;

const FirstDiv = Styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 100vh;
width: 100vw;
max-width: 100%;
flex:50%;


`;

const Heading = Styled.h1`
font-Weight: bold;
`;
const Image = Styled.img`
width:15vmax;
border-radius: 100%;
transition: all 0.5s;
`;
const SecondDiv = Styled.div`
justify-content: space-evenly;
flex:50%;
align-items: center;
margin-top: 32vh;
`;
const FullName = Styled.h3`
font-Size: 25px;
margin-bottom: 8px;
`;
const Name = Styled.p`
color: #585656;
font-size: 20px;
margin-bottom: 20px;
`;
const Email = Styled.h3`
font-Size: 25px;
margin-bottom: 8px;
`;
const FullEmail = Styled.p`
color: #585656;
font-size: 20px;
margin-bottom: 20px;
`;
const Joined = Styled.h3`
font-Size: 25px;
margin-bottom: 8px;
`;
const Date = Styled.p`
color: #585656;
font-size: 20px;
margin-bottom: 20px;
`;
const LinkDiv = Styled.div`
flex-direction: column;
margin-top: 10px;
`;

const Profile = ({ history }) => {
  const { user, loading, isAuhtenticated } = useSelector((state) => state.user);
  useEffect(() => {
    if (isAuhtenticated === false) {
      history.push("/login");
    }
  }, [history, isAuhtenticated]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${user.name}'s Profile'`} />
          <Container>
            <FirstDiv>
              <Heading>My Profile</Heading>
              <Image src={user.avatar.url} alt={user.name} />
              <Link
                to="/me/update"
                style={{
                  marginTop: "10px",
                  fontSize: 20,
                  backgroundColor: "#07c4ca",
                  padding: "10px",
                  textDecoration: "none",
                }}
              >
                Update Profile
              </Link>
            </FirstDiv>
            <SecondDiv>
              <FullName>Full Name</FullName>
              <Name>{user.name}</Name>
              <Email>Email</Email>
              <FullEmail>{user.email}</FullEmail>
              <Joined>Joined</Joined>
              <Date>{String(user.createdAt).substr(0, 10)}</Date>
              <LinkDiv>
                <Link
                  to="/orders"
                  style={{
                    marginRight: 15,
                    fontSize: 20,
                    backgroundColor: "#07c4ca",
                    padding: "10px",
                    textDecoration: "none",
                  }}
                >
                  My Orders
                </Link>
                <Link
                  to="/password/update"
                  style={{
                    fontSize: 20,
                    backgroundColor: "#07c4ca",
                    padding: "10px",
                    textDecoration: "none",
                  }}
                >
                  Change Password
                </Link>
              </LinkDiv>
            </SecondDiv>
          </Container>
        </>
      )}
    </>
  );
};

export default Profile;
