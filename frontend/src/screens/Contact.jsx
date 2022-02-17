import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  display: flex;
  background-color: #908383;
  position: fixed;
`;

const Button = styled.button`
  text-decoration: none;
  font: 200 2vmax "Roboto";
  cursor: pointer;
  padding: 2vmax;
`;
const MailBtn = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  position: absolute;
  top: 40%;
  left: 30%;
  text-decoration: none;
`;

const Contact = () => {
  return (
    <Container>
      <MailBtn href="mailto:mdlokmanhosen2013@gmail.com">
        <Button>
          Contact: mdlokmanhosen2013@gmail.com
          <h5>Phone: 01764927800</h5>
        </Button>
      </MailBtn>
    </Container>
  );
};

export default Contact;
