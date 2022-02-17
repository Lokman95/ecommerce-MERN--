import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../../components/MetaData";
import styled from "styled-components";
import Loader from "../../components/Loader";
import { UPDATE_ORDER_RESET } from "../../redux/const/orderConst";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import Sidebar from "../Admin/Sidebar";

import { Button } from "@material-ui/core";

import {
  updateOrder,
  clearErrors,
  getOrderDetails,
} from "../../redux/actions/orderAction";

const Container = styled.div`
  display: flex;
`;
const OrderContainer = styled.div`
  margin: 1vmax 0;
  padding: 1vmax;
  background-color: white;
  display: flex;
`;
const ConfirmOrder = styled.div``;
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-evenly;
`;
const ConfirmshippingArea = styled.div`
  width: 400px;
  flex-direction: column;
`;
const OrderDetailsContainer = styled.div``;
const Info = styled.div`
  display: flex;
`;
const Span = styled.span`
  display: flex;
  padding: 0.5vmax;
`;
const Name = styled.p`
  padding: 0.5vmax;
`;
const Address = styled.p`
  padding: 0.5vmax;
`;
const Phone = styled.p`
  padding: 0.5vmax;
`;

const ConfirmCartItems = styled.div`
  margin-top: -160px;
`;
const CartItemsContainer = styled.div``;
const ProductDive = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Image = styled.img`
  width: 100px;
  height: 100px;
  padding: 10px;
  margin-left: 50px;
`;
const SpanPrice = styled.span`
  display: flex;
  width: 400px;
`;
const FormDiv = styled.div``;
const Form = styled.form`
  margin-left: 350px;
`;
const SelectDiv = styled.div``;
const Select = styled.select`
  padding: 1vmax 4vmax;
  margin: 2rem 0;
  width: 400px;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.267);
  border-radius: 4px;
  font: 300 0.9vmax cursive;
  outline: none;
`;
const Option = styled.option``;

const UpdateOrder = ({ match }) => {
  const { order, error, loading } = useSelector(
    (state) => state.myOrderDetails
  );
  const { eroor: updateError, isUpdated } = useSelector(
    (state) => state.updateOrders
  );

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("status", status);
    dispatch(updateOrder(match.params.id, myForm));
  };
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
    if (updateError) {
      dispatch(clearErrors());
    }
    if (isUpdated) {
      dispatch({ type: UPDATE_ORDER_RESET });
    }
    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, error, updateError, isUpdated, match.params.id]);

  return (
    <Fragment>
      <MetaData title="Update Order" />

      <Container>
        <Sidebar />
        <OrderContainer>
          {loading ? (
            <Loader />
          ) : (
            <ConfirmOrder
              style={{
                display: order.orderStatus === "Delivered" ? "block" : "grid",
              }}
            >
              <Wrapper>
                <ConfirmshippingArea>
                  <Typography
                    style={{
                      padding: 10,
                      fontSize: 25,
                      fontWeight: "bold",
                    }}
                  >
                    Shipping Info
                  </Typography>
                  <OrderDetailsContainer>
                    <Info>
                      <Name>Name:</Name>
                      <Span>{order.user && order.user.name}</Span>
                    </Info>
                    <Info>
                      <Phone>Phone:</Phone>
                      <Span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </Span>
                    </Info>
                    <Info>
                      <Address>Address:</Address>
                      <Span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </Span>
                    </Info>
                  </OrderDetailsContainer>

                  <Typography
                    style={{
                      padding: 5,
                      fontSize: 25,
                      fontWeight: "bold",
                    }}
                  >
                    Payment
                  </Typography>
                  <OrderDetailsContainer>
                    <Info>
                      <p
                        style={{
                          padding: 5,
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === "succeeded"
                          ? "PAID"
                          : "NOT PAID"}
                      </p>
                    </Info>

                    <Info>
                      <p
                        style={{
                          padding: 5,
                          fontSize: 20,
                          fontWeight: "bold",
                        }}
                      >
                        Amount:
                      </p>
                      <Span>${order.totalPrice && order.totalPrice}</Span>
                    </Info>
                  </OrderDetailsContainer>

                  <Typography
                    style={{
                      padding: 5,
                      fontSize: 25,
                      fontWeight: "bold",
                    }}
                  >
                    Order Status
                  </Typography>
                  <OrderDetailsContainer>
                    <Info>
                      <p
                        style={{
                          padding: 5,
                          fontSize: 15,
                          fontWeight: "bold",
                        }}
                        className={
                          order.orderStatus && order.orderStatus === "Delivered"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        {order.orderStatus && order.orderStatus}
                      </p>
                    </Info>
                  </OrderDetailsContainer>
                </ConfirmshippingArea>

                <ConfirmCartItems>
                  <Typography
                    style={{
                      marginLeft: 220,
                      padding: 5,
                      fontSize: 25,
                      fontWeight: "bold",
                    }}
                  >
                    My Cart Items:
                  </Typography>
                  <CartItemsContainer>
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <ProductDive key={item.product}>
                          <Image src={item.image} alt="Product" />
                          <Link
                            to={`/product/${item.product}`}
                            style={{
                              padding: 30,
                              display: "flex",
                            }}
                          >
                            {item.name}
                          </Link>
                          <SpanPrice>
                            {item.quantity} X ${item.price} =
                            <b>${item.price * item.quantity}</b>
                          </SpanPrice>
                        </ProductDive>
                      ))}
                  </CartItemsContainer>
                </ConfirmCartItems>
              </Wrapper>

              <FormDiv
                style={{
                  display: order.orderStatus === "Delivered" ? "none" : "block",
                }}
              >
                <Form onSubmit={updateOrderSubmitHandler}>
                  <h1
                    style={{
                      marginLeft: 80,
                    }}
                  >
                    Update Order
                  </h1>

                  <SelectDiv>
                    <Select onChange={(e) => setStatus(e.target.value)}>
                      <Option value="">Choose Order Status</Option>
                      {order.orderStatus === "Processing" && (
                        <Option value="Shipped">Shipped</Option>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <Option value="Delivered">Delivered</Option>
                      )}
                    </Select>
                  </SelectDiv>

                  <Button
                    style={{
                      width: 200,
                      height: 40,
                      marginLeft: 80,
                      backgroundColor: "#ffc107",
                      color: "white",
                    }}
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Update
                  </Button>
                </Form>
              </FormDiv>
            </ConfirmOrder>
          )}
        </OrderContainer>
      </Container>
    </Fragment>
  );
};

export default UpdateOrder;
