import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@material-ui/data-grid";
import { clearErrors, allReviews } from "../../redux/actions/productAction";
import MetaData from "../../components/MetaData";
import Sidebar from "./Sidebar";

import styled from "styled-components";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";

const Container = styled.div`
  display: flex;
`;
const AllProducts = styled.div`
  width: 80vw;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100px;
  width: 300px;
  background-color: #226cb275;
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(95, 94, 94, 0.637),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  margin: 20px;
  margin-left: 380px;
  padding: 40px;
`;
const Heading = styled.h1`
  padding: 5px;
`;
const InputContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 5px;
  align-items: center;
  & > svg {
    position: absolute;
    transform: translateX(1vmax);
  }
`;
const Input = styled.input`
  padding: 1vmax 4vmax;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #1f1e1e;
  outline: none;
  border-radius: 5px;
`;
const ButtonContainer = styled.button`
  border: none;
  background-color: tomato;
  padding: 1vmax 3vmax;
  width: 100%;
  box-sizing: border-box;
  outline: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 14px;
  :hover {
    background-color: #e03214;
    transition: all 0.5s;
  }
`;

const UpdateReviews = ({ history }) => {
  const dispatch = useDispatch();

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(allReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(allReviews(productId));
    }
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error, history, productId]);
  const columns = [
    { field: "id", headerName: "Review ID", minWith: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWith: 200,
      flex: 0.5,
    },
    {
      field: "comment",
      headerName: "Comment",
      minWith: 350,
      flex: 1,
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWith: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },
  ];

  const rows = [];
  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (
    <>
      <MetaData title="All Reviews" description="All Reviews" />
      <Container>
        <Sidebar />
        <AllProducts>
          <Form onSubmit={productReviewsSubmitHandler}>
            <Heading>All Reviews</Heading>
            <InputContainer>
              <SpellcheckIcon />
              <Input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </InputContainer>

            <ButtonContainer
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Submit
            </ButtonContainer>
          </Form>
          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              autoHeight
            />
          ) : (
            <h1 style={{ paddingLeft: 500 }}>No Reviews</h1>
          )}
        </AllProducts>
      </Container>
    </>
  );
};

export default UpdateReviews;
