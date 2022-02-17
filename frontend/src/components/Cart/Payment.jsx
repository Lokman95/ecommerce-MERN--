import React, { Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../MetaData";
import { Typography } from "@material-ui/core";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";

import CreditCardIcon from "@material-ui/icons/CreditCard";
import EventIcon from "@material-ui/icons/Event";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { createOrder, clearErrors } from "../../redux/actions/orderAction";
import styled from "styled-components";

const PaymentContainer = styled.div`
  display: flex;

  align-items: center;
  background-color: rgb(255, 255, 255);
  height: 65vh;
  margin: 2vmax;
`;
const PaymentForm = styled.form`
  width: 22%;
  height: 100%;
  margin-left: 500px;
  & > p {
    font: 400 2vmax "Roboto";
    color: rgba(0, 0, 0, 0.753);
    border-bottom: 1px solid rgba(0, 0, 0, 0.13);
    padding: 1vmax 0;
    text-align: center;
    width: 50%;
    margin: auto;
  }
`;
const InputDiv = styled.div`
  display: flex;
  align-items: center;
  margin: 2vmax 0;
  width: 100%;
  .paymentInput {
    padding: 1vmax 4vmax;
    padding-right: 1vmax;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.267);
    border-radius: 4px;
    outline: none;
  }
  & > svg {
    position: absolute;
    transform: translateX(1vmax);
    font-size: 1.6vmax;
    color: rgba(0, 0, 0, 0.623);
  }
`;
const Input = styled.input`
  border: none;
  background-color: tomato;
  color: white;
  font: 300 0.9vmax "Roboto";
  width: 100%;
  padding: 0.8vmax;
  cursor: pointer;
  transition: all 0.5s;
  outline: none;
`;

const Payment = ({ history }) => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();
  //const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  };

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    payBtn.current.disabled = true;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/payment/process",
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.state,
              postal_code: shippingInfo.pinCode,
              country: shippingInfo.country,
            },
          },
        },
      });

      if (result.error) {
        payBtn.current.disabled = false;

        //alert.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(createOrder(order));
          history.push("/success");
        } else {
          //alert.error("There's some issue while processing payment ");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      //alert.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (error) {
      //alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <Fragment>
      <MetaData title="Payment" />
      <PaymentContainer>
        <PaymentForm onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <InputDiv>
            <CreditCardIcon />
            <CardNumberElement className="paymentInput" />
          </InputDiv>
          <InputDiv>
            <EventIcon />
            <CardExpiryElement className="paymentInput" />
          </InputDiv>
          <InputDiv>
            <VpnKeyIcon />
            <CardCvcElement className="paymentInput" />
          </InputDiv>

          <Input
            type="submit"
            value={`Pay - $ ${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </PaymentForm>
      </PaymentContainer>
    </Fragment>
  );
};

export default Payment;
