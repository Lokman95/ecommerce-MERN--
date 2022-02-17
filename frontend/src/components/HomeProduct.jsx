import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Rating } from "@material-ui/lab";
import { mobile } from "../responsive";

const Info = styled.div`
  //opacity: 0;
  height: 40%;
  width: 100%;
  top: 0;
  left: 0;
  position: relative;
  display: flex;
  //z-index: 2;
  background-color: white;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  //cursor: pointer;
  flex-direction: column;

  .icomEmpty {
    color: red;
    size: 5px;
  }
  & > p {
    ${mobile({ fontSize: "2px" })}
  }
  & > span:nth-child(2) {
    ${mobile({ fontSize: "1px" })}
  }
`;

const BtnDiv = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // margin-top: 5px;
  //position: relative;
  display: none;
`;
const Button = styled.button`
  padding: 15px;
  ${mobile({ padding: "10px" })}
`;
const Image = styled.img`
  height: 60%;
  width: 180px;
  position: relative;
  ${mobile({ width: "110px", height: "30%" })}
`;
const Description = styled.p`
  ${mobile({ fontSize: "1px" })}
`;

const Container = styled.div`
  //flex: 1;
  margin: 8px;
  width: 200px;
  height: 300px;
  ${mobile({ width: 110, height: 180, margin: "9px" })}
  display: flex;
  flex-direction: column;
  text-decoration: none;
  align-items: center;
  justify-content: center;
  background-color: #07c4ca;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  position: relative;
  border-radius: 10px;
  &:hover {
    background-color: #050505;
    transition: all 0.5s ease;
    transform: scale(1.05);
  }
  &:hover ${Image} {
    transition: all 0.5s ease;
    opacity: 0.5;
  }
  &:hover ${Info} {
    transition: all 0.5s ease;
    opacity: 0.05;
  }
  &:hover ${BtnDiv} {
    transition: all 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: absolute;
  }
`;

const HomeProduct = ({ product }) => {
  const options = {
    value: product.ratings,
    size: "small",
    readOnly: true,
    precision: 0.5,
  };

  return (
    <Container>
      <Image src={product.images[0].url} alt={product.name} />
      <Info>
        <Description
          style={{
            fontSize: 15,
            color: "black",
            width: "100%",
            textAlign: "center",
            padding: 5,
            fontWeight: 500,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.name}
        </Description>
        <Rating {...options} iconEmpty={{ color: "red", size: "5px" }} />

        <span
          style={{
            margin: 5,
            color: "black",
            fontWeight: 700,
            fontSize: 20,
          }}
        >
          {`Price: $${product.price}`}
        </span>
      </Info>
      <BtnDiv>
        <Link to={`/product/${product._id}`} style={{ textDecoration: "none" }}>
          <Button
            style={{
              cursor: "pointer",
              color: "white",
              fontWeight: 700,
              backgroundColor: "#07c4ca",
              outline: "none",
              border: "none",
              //borderRadius: 3,
              width: 200,
            }}
          >
            View Details
          </Button>
        </Link>
      </BtnDiv>
    </Container>
  );
};

export default HomeProduct;
