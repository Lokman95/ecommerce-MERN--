import React from "react";
import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cartAction";

const CartContainer = styled.div`
  padding: 20px;
`;
const Header = styled.div`
  background-color: firebrick;
  width: 90%;
  color: white;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 4fr 1fr 1fr;
  margin: auto;
  & > h3 {
    margin: 15px;
  }
  & > h3:last-child {
    text-align: end;
  }
`;
const ItemContainer = styled.div`
  width: 90%;
  margin-top: 10px;
  margin-left: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Image = styled.img`
  width: 10vmax;
  padding: 8px;
`;
const LinkDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  padding: 8px;
  & > a {
    text-decoration: none;
    color: black;
  }
  & > p {
    color: red;
    font-size: 15px;
    cursor: pointer;
    background-color: #9fa19f;
    padding: 5px;
    width: 50px;
  }
  & > span {
    margin: 8px 0px;
  }
`;
const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  margin-right: 130px;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 5px;
`;
const Total = styled.p`
  display: flex;
  width: 15%;
  font: 18px "Roboto", sans-serif;
  justify-content: end;
  align-items: center;
  float: right;
`;
const Summary = styled.div`
  flex: 1;
  width: 90%;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
  margin-left: 50px;
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
  width: 20%;
  padding: 10px;
  align-self: center;
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
const NoProduct = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
  flex-direction: column;
`;

const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const handleIncrementQuantity = (id, quantity, stock) => {
    const newQuantity = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addToCart(id, newQuantity));
  };

  const handleDecrementQuantity = (id, quantity) => {
    const newQuantity = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addToCart(id, newQuantity));
  };
  const deleteCartItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const chackoutHandler = () => {
    history.push("/login?link=shipping");
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <NoProduct>
          <h1>No Product in your Cart</h1>
          <Link to="/products">
            <button
              style={{
                padding: 8,
                backgroundColor: "green",
                color: "white",
                cursor: "pointer",
                fontSize: 18,
              }}
            >
              Go to Product
            </button>
          </Link>
        </NoProduct>
      ) : (
        <>
          <CartContainer>
            <Header>
              <h3>Product</h3>
              <h3>Quantity</h3>
              <h3>Total</h3>
            </Header>
            {cartItems &&
              cartItems.map((item) => (
                <ItemContainer>
                  <Image src={item.image} alt="lok" />
                  <LinkDiv>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>{`Price: $${item.price}`}</span>
                    <p onClick={() => deleteCartItem(item.product)}>Remove</p>
                  </LinkDiv>
                  <AmountContainer>
                    <Remove
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleDecrementQuantity(item.product, item.quantity)
                      }
                    />
                    <Amount>{item.quantity}</Amount>
                    <Add
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        handleIncrementQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        )
                      }
                    />
                  </AmountContainer>
                  <Total>{`$${item.price * item.quantity}`}</Total>
                </ItemContainer>
              ))}
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>
              <SummaryItem>
                <SummaryItemText>Subtotal</SummaryItemText>
                <SummaryItemPrice style={{ fontSize: 20, fontWeight: "bold" }}>
                  {`$${cartItems.reduce(
                    (obj, item) => obj + item.price * item.quantity,
                    0
                  )}`}
                </SummaryItemPrice>
              </SummaryItem>

              <SummaryItem type="total">
                <SummaryItemText>Total</SummaryItemText>
                <SummaryItemPrice>
                  {`$${cartItems.reduce(
                    (obj, item) => obj + item.price * item.quantity,
                    0
                  )}`}
                </SummaryItemPrice>
              </SummaryItem>
              <Button onClick={chackoutHandler}>CHECKOUT NOW</Button>
            </Summary>
          </CartContainer>
        </>
      )}
    </>
  );
};

export default Cart;
