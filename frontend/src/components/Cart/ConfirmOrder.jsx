import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import MetaData from "../MetaData";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

const OrderContainer = styled.div`
  //height: 100vw;
  background-color: white;
  display: grid;
  grid-template-columns: 6fr 3fr;
`;
const FirstWrapper = styled.div``;
const ShippingAreaDiv = styled.div`
  padding: 5vmax;
  padding-bottom: 0%;
`;
const ShippingAreaContainer = styled.div`
  margin: 2vmax;
`;

const NameDiv = styled.div`
  display: flex;
  font-size: 20px;
  margin: 8px;
`;
const Name = styled.p`
  font-weight: 700;
  margin-right: 2vmax;
`;

const PhoneDiv = styled.div`
  display: flex;
  font-size: 20px;
  margin: 8px;
`;
const Phone = styled.p`
  font-weight: 700;
  margin-right: 2vmax;
`;

const AddressDiv = styled.div`
  display: flex;
  font-size: 20px;
  margin: 8px;
`;
const Address = styled.p`
  font-weight: 700;
  margin-right: 2vmax;
`;

const CartWrapper = styled.div`
  padding: 5vmax;
`;
const CartContainer = styled.div`
  align-items: center;
  justify-content: space-between;
`;
const Product = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Image = styled.img`
  height: 80px;
  width: 70px;
  padding: 1vmax;
`;
const Summary = styled.div`
  flex: 1;
  width: 80%;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  margin-right: 50px;
  margin-top: 80px;
`;
const SummaryTitle = styled.h1`
  font-weight: 200;
`;
const SummaryItem = styled.div`
  margin: 20px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "700"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
  cursor: pointer;
  :hover {
    background-color: #0ddf0d;
    transition: 0.5s all ease;
    transform: scale(1.03);
  }
`;

const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 10;

  const tax = subtotal * 0.05;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    history.push("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title="Confirm Order" />
      <OrderContainer>
        <FirstWrapper>
          <ShippingAreaDiv>
            <Typography
              style={{
                fontWeight: "700",
                fontSize: "24px",
                marginBottom: "20px",
              }}
            >
              Shipping Info
            </Typography>
            <ShippingAreaContainer>
              <NameDiv>
                <Name>Name:</Name>
                <span>{user.name}</span>
              </NameDiv>
              <PhoneDiv>
                <Phone>Phone:</Phone>
                <span>{shippingInfo.phoneNo}</span>
              </PhoneDiv>
              <AddressDiv>
                <Address>Address:</Address>
                <span>{address}</span>
              </AddressDiv>
            </ShippingAreaContainer>
          </ShippingAreaDiv>
          <CartWrapper>
            <Typography
              style={{
                fontWeight: "700",
                fontSize: "24px",
                marginBottom: "20px",
              }}
            >
              Your Cart Items:
            </Typography>
            <CartContainer>
              {cartItems &&
                cartItems.map((item) => (
                  <Product key={item.product}>
                    <Image src={item.image} alt="Product" />
                    <Link
                      to={`/product/${item.product}`}
                      style={{ width: "200px" }}
                    >
                      {item.name}
                    </Link>
                    <span>
                      {item.quantity} X ₹{item.price} ={" "}
                      <b>₹{item.price * item.quantity}</b>
                    </span>
                  </Product>
                ))}
            </CartContainer>
          </CartWrapper>
        </FirstWrapper>

        <Summary>
          <SummaryTitle>ORDER SUMMARY</SummaryTitle>
          <SummaryItem>
            <SummaryItemText>Subtotal</SummaryItemText>
            <SummaryItemPrice style={{ fontSize: 20, fontWeight: "bold" }}>
              ${subtotal}
            </SummaryItemPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText>VAT</SummaryItemText>
            <SummaryItemPrice>${tax}</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem>
            <SummaryItemText>Estimated Shipping</SummaryItemText>
            <SummaryItemPrice>${shippingCharges}</SummaryItemPrice>
          </SummaryItem>
          <SummaryItem type="total">
            <SummaryItemText>Total</SummaryItemText>
            <SummaryItemPrice>${totalPrice}</SummaryItemPrice>
          </SummaryItem>
          <Button onClick={proceedToPayment}>PAY NOW</Button>
        </Summary>
      </OrderContainer>
    </Fragment>
  );
};

export default ConfirmOrder;
