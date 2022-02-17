import React, { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";

const Container = styled.div`
  background-olor: #8080801b;
  width: 99vw;
  height: 55vh;
  display: flex;
`;
const SearchContainer = styled.form`
  //border: 0.5px solid #858282;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 25px;
  width: 500px;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${mobile({ width: "410px", marginLeft: "5px" })}
`;
const Input = styled.input`
  border: none;
  padding: 5px 22px;
  width: 500px;
  height: 45px;
  color: black;
  background-color: #dbd7d7;
  outline: none;
  border-radius: 5px;
  ${mobile({ width: "180px", paddingLeft: "15px" })}
`;
const Button = styled.input`
  color: "#312e2e";
  font-size: 14px;
  padding: 20px;
  width: 150px;
  border-radius: 5px;
  outline: none;
  border: none;
  cursor: pointer;
  ${mobile({ width: "30px" })}
`;

/* End Left Side */

const SearchScreen = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push(`/products`);
    }
  };
  return (
    <Container>
      <SearchContainer onSubmit={searchHandler}>
        <Input
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search Product"
          type="text"
        />
        <Button type="submit" value="Search" />
      </SearchContainer>
    </Container>
  );
};

export default SearchScreen;
