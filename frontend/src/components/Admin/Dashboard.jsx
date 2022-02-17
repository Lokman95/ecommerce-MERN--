import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductAdmin } from "../../redux/actions/productAction";
import { getAllOrders } from "../../redux/actions/orderAction";
import styled from "styled-components";
import { getAllUsers } from "../../redux/actions/userAction";

const Container = styled.div`
  width: 100vw;
  max-width: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr;
  position: absolute;
`;
const Wrapper = styled.div`
  background-color: #f3f0f0;
  width: 100%;
`;
const Summary = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Total = styled.div`
  width: 100%;
  height: 160px;
  display: flex;
  color: #070236;
  font-size: 30px;
  align-items: center;
  justify-content: center;
  background-color: #412cb6;
  & > p {
    font-size: 50 px;
    font-weight: 700;
    margin-left: 5px;
  }
  &:hover {
    background-color: #01013a;
    color: #ffffff;
    transition: 0.6s all ease;
    //transform: scale(1.01);
  }
`;
const SummaryBox = styled.div`
  display: flex;
  margin-left: 25px;
`;
const Stock = styled.div`
  display: flex;
  margin-left: 180px;
`;
const StyledLink = styled(Link)`
  width: 320px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #412cb6;
  margin-right: 25px;
  margin-top: 12px;
  color: #07022f;
  font-size: 20px;
  text-decoration: inherit;
  & > p {
    font-size: 40px;
    font-weight: 700;
    margin-left: 5px;
  }
  &:hover {
    background-color: #01013a;
    color: #ffffff;
    transition: 0.6s all ease;
    transform: scale(1.15);
  }
`;

const Dashboard = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock++;
      }
    });
  useEffect(() => {
    dispatch(getProductAdmin());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  return (
    <Container>
      <Sidebar />
      <Wrapper>
        <Total>
          Total Earn <p>${(0, totalAmount)}</p>
        </Total>
        <Summary>
          <SummaryBox>
            <StyledLink to="/admin/products">
              Product <p>{products && products.length}</p>
            </StyledLink>
            <StyledLink to="/admin/orders">
              Orders <p>{orders && orders.length}</p>
            </StyledLink>
            <StyledLink to="/admin/users">
              Users <p>{users && users.length}</p>
            </StyledLink>
          </SummaryBox>
        </Summary>
        <Stock>
          <StyledLink to="#">
            InStock <p>{products.length - outOfStock}</p>
          </StyledLink>
          <StyledLink to="#">
            OutOfStock <p>{outOfStock}</p>
          </StyledLink>
        </Stock>
      </Wrapper>
    </Container>
  );
};

export default Dashboard;
