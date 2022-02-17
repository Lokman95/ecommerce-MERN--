import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import styled from "styled-components";
import { getOrderDetails, clearErrors } from "../../redux/actions/orderAction";
import Loader from "../Loader";

const OrderContainer = styled.div`
  background-color: white;
  display: flex;
`;
const FirstWrapper = styled.div`
  display: flex;
  padding: 5vmax;
`;
const ShippingAreaDiv = styled.div`
  padding: 5vmax;
  padding-bottom: 0%;
  flex: 1;
`;
const PaymentAreaDiv = styled.div`
  padding: 5vmax;
  padding-bottom: 0%;
  flex: 1;
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
const Payment = styled.span``;
const CartWrapper = styled.div`
  padding: 5vmax;
`;
const CartContainer = styled.div`
  flex-direction: column;
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
  padding-right: 5vmax;
`;

const MyOrderDetails = ({ match }) => {
  const dispatch = useDispatch();
  const { order, loading, error } = useSelector(
    (state) => state.myOrderDetails
  );
  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, error, match.params.id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="My Order Details" />
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
                  OrderId #{order && order._id}
                </Typography>
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
                    <span>{order.user && order.user.name}</span>
                  </NameDiv>
                  <PhoneDiv>
                    <Phone>Phone:</Phone>
                    <span>
                      {order.shippingInfo && order.shippingInfo.phoneNo}
                    </span>
                  </PhoneDiv>
                  <AddressDiv>
                    <Address>Address:</Address>
                    <span>
                      {order.shippingInfo &&
                        `${order.shippingInfo.address},${order.shippingInfo.city},${order.shippingInfo.state},${order.shippingInfo.pinCode},${order.shippingInfo.country}`}
                    </span>
                  </AddressDiv>
                </ShippingAreaContainer>
              </ShippingAreaDiv>
              <PaymentAreaDiv>
                <Typography
                  style={{
                    fontWeight: "700",
                    fontSize: "24px",
                    marginBottom: "20px",
                  }}
                >
                  Payment:
                </Typography>
                <Payment>
                  {order.paymentInfo && order.paymentInfo.status === "succeeded"
                    ? "PAID"
                    : "NOT PAID"}
                </Payment>
                <Typography
                  style={{
                    fontWeight: "500",
                    fontSize: "15px",
                  }}
                >
                  Amount:
                </Typography>
                <Payment>${order.totalPrice && order.totalPrice}</Payment>
                <Typography
                  style={{
                    fontWeight: "700",
                    fontSize: "24px",
                    marginBottom: "20px",
                  }}
                >
                  Order Status:
                </Typography>
                <Payment>{order.orderStatus && order.orderStatus}</Payment>
              </PaymentAreaDiv>
            </FirstWrapper>
          </OrderContainer>
          <CartWrapper>
            <Typography
              style={{
                fontWeight: "700",
                fontSize: "24px",
                marginBottom: "20px",
              }}
            >
              Order Items:
            </Typography>
            <CartContainer>
              {order.orderItems &&
                order.orderItems.map((item) => (
                  <Product key={item.product}>
                    <Image src={item.image} alt="Product" />
                    <Link
                      to={`/product/${item.product}`}
                      style={{ paddingRight: "5vmax" }}
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
        </Fragment>
      )}
    </Fragment>
  );
};

export default MyOrderDetails;
