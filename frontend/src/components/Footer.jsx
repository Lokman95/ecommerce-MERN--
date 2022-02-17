import { Facebook, Instagram, LinkedIn, Twitter } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  background-color: #f1f0ec;
  z-index: -999;
  margin-top: auto;
  //margin: 20px;
  ${mobile({
    flexDirection: "column",
  })}
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1`
  margin: 20px 0px;
  color: black;
`;
const Description = styled.p`
  font-size: 15px;
  letter-spacing: 1px;
  color: black;
`;
const SocialContainer = styled.div`
  display: flex;
`;
const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #fdfdfd;
  justify-content: center;
  align-items: center;
  display: flex;
  color: #14b9a3;
  margin: 10px;
  cursor: pointer;
`;

const Center = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  color: black;
  ${mobile({
    display: "none",
  })}
`;

const Title = styled.h2`
  margin-bottom: 20px;
  color: black;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const ContactItem = styled.div`
  margin-bottom: 20px;
  color: black;
  font-weight: 500;
  letter-spacing: 1px;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Eshop</Logo>
        <Description>
          We are a team of designers and developers that create high quality
          Products.
        </Description>
        <SocialContainer>
          <SocialIcon>
            <a href="https://www.facebook.com/LokmanNhosen/">
              <Facebook />
            </a>
          </SocialIcon>
          <SocialIcon>
            <Instagram />
          </SocialIcon>
          <SocialIcon>
            <Twitter />
          </SocialIcon>
          <SocialIcon>
            <LinkedIn />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <h1>Eshop</h1>
        <h3
          style={{
            marginTop: "20px",
          }}
        >
          Download Our App from app store
        </h3>
        <img
          style={{
            marginTop: "10px",
            width: "100px",
            height: "100px",
          }}
          src="/qrcode.png"
          alt="logo"
        />
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>Dhaka, Ramna 1202, Bangladesh</ContactItem>
        <ContactItem>Phone: 01764927800</ContactItem>
        <ContactItem>mdlokmanhosen2013@gmail.com</ContactItem>
        <p>&copy; Copyright 2022 Eshop</p>
      </Right>
    </Container>
  );
};

export default Footer;
