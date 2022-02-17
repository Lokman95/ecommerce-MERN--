import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;
const Heading = styled.h1``;

const OrderSuccess = () => {
  return (
    <Container>
      <Heading>Your Order Placed SuccesFully</Heading>
      <h2 style={{ color: "red" }}>We Will Contact You Soon!</h2>
      <Link
        to="orders"
        style={{
          color: "inherit",
          textDecoration: "inherit",
          padding: 10,
          backgroundColor: "green",
        }}
      >
        View Orders
      </Link>
    </Container>
  );
};

export default OrderSuccess;
