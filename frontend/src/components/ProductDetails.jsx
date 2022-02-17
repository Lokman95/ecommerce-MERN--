import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import {
  getProductDetails,
  clearErrors,
  addReview,
} from "../redux/actions/productAction";
import Carousel from "react-material-ui-carousel";
import ReviewCard from "./ReviewCard";

import Loader from "./Loader";
import { addToCart } from "../redux/actions/cartAction";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { REVIEW_RESET } from "../redux/const/productConst";

const Container = styled.div`
  background-color: #f8f1f1;
`;

const Wrapper = styled.div`
  padding: 20px;
  display: flex;
  ${mobile({ padding: "10px", flexDirection: "column" })}
`;

const ImgContainer = styled.div`
  //display: flex;
  flex: 1;
  width: 200px;
  height: 500px;
  max-width: 100%;
  padding: 20px;
  background-color: #07c4ca;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  box-sizing: border-box;
  ${mobile({ width: "400px", height: "100" })}/* justify-content: center;
  align-items: center;
  display: flex; */
`;

const Image = styled.img`
  width: 70%;
  height: 62vh;
  margin-left: 50px;
  object-fit: contain;
  ${mobile({ height: "40vh" })}
`;

const InfoContainer = styled.div`
  flex: 2;
  padding: 0px 50px;
  margin-left: 40px;
  ${mobile({ padding: "10px", marginLeft: "2px" })}
`;

const Title = styled.h1`
  font-weight: 200;
  ${mobile({ fontSize: "20px" })}
`;

const Desc = styled.p`
  margin: 20px 0px;
`;
const Span = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Price = styled.span`
  font-weight: 200;
  font-size: 35px;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  margin-top: 25px;
  justify-content: space-between;
  ${mobile({ width: "100%" })}
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
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

const Button = styled.button`
  padding: 15px;
  border: 2px solid teal;
  background-color: #0bbe04;
  color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #07c4ca;
    transition: 0.4s ease-in-out all;
    transform: scale(1.1);
    color: black;
  }
`;

const ReviewButton = styled.div`
  & > button {
    background-color: #0bbe04;
    color: white;
    padding: 10px;
    border: 2px solid teal;
    cursor: pointer;
    text-transform: uppercase;
    &:hover {
      background-color: #07c4ca;
      transition: 0.4s ease-in-out all;
      transform: scale(1.1);
      color: black;
    }
  }
`;
const Reviews = styled.div`
  //flex-direction: column;
  margin-bottom: 25px;
  display: flex;
  overflow-y: hidden;
`;

const DetailsContainer = styled.div`
  margin-top: 25px;
  .greenColor {
    color: green;
  }
  .redColor {
    color: red;
  }
`;
const ProductDesc = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 20px;
  margin-top: 10px;
  margin-bottom: 15px;
  font-weight: 700;
  & > p {
    font-size: 16px;
    align-items: center;
    justify-content: center;
    display: flex;
    margin-left: 5px;
    font-weight: 400;
  }
`;
const ReviewHeading = styled.h1`
  color: black;
  font-weight: 500;
  text-align: center;
  border-bottom: 1px solid #928f8f;
  padding: 1vmax;
  width: 20vmax;
  margin: auto;
`;

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.addReview
  );

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const addToCartHandler = () => {
    dispatch(addToCart(match.params.id, quantity));
    alert.success("Product added to cart");
  };
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const submitReview = () => {
    const myForm = new FormData();
    myForm.set("productId", match.params.id);
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    dispatch(addReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Review added successfully");
      dispatch({ type: REVIEW_RESET });
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, reviewError, success, alert]);

  const options = {
    value: product.ratings,
    size: "large",
    readOnly: true,
    precision: 0.5,
  };

  const handleIncrementQuantity = () => {
    if (product.Stock <= quantity) return;
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };
  const handleDeccrementQuantity = () => {
    const newQuantity = quantity - 1;
    quantity > 1 && setQuantity(newQuantity);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Container>
            <Wrapper>
              <ImgContainer>
                <Carousel>
                  {product.images &&
                    product.images.map((image, index) => (
                      <Image
                        src={image.url}
                        key={image.url}
                        alt={`${index} Slide`}
                      />
                    ))}
                </Carousel>
              </ImgContainer>
              <InfoContainer>
                <Title>{product.name}</Title>
                <Desc>Id: {product._id}</Desc>
                <Reviews>
                  <Rating {...options} />
                  <Span>({product.numOfReviews} Reviews)</Span>
                </Reviews>
                <Price>Price: ${product.price}</Price>
                <AddContainer>
                  <AmountContainer>
                    <Remove
                      onClick={handleDeccrementQuantity}
                      style={{ cursor: "pointer" }}
                    />
                    <Amount>{quantity}</Amount>
                    <Add
                      onClick={handleIncrementQuantity}
                      style={{ cursor: "pointer" }}
                    />
                  </AmountContainer>
                  <Button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    ADD TO CART
                  </Button>
                </AddContainer>
                <DetailsContainer>
                  <p>
                    Status:{""}
                    <b
                      className={product.Stock < 1 ? "redColor" : "greenColor"}
                    >
                      {product.Stock < 1 ? "Out of Stock" : "In Stock"}
                    </b>
                  </p>
                  <ProductDesc>
                    Description: <p>{product.description}</p>
                  </ProductDesc>
                  <ReviewButton>
                    <button onClick={submitReviewToggle}>Submit Review</button>
                  </ReviewButton>
                  <div style={{ marginTop: 15 }}>
                    <h4>
                      <span style={{ color: "red" }}> 🤚🏻</span> We promise to
                      never sell your data.
                    </h4>
                    <br />
                    <h4>
                      <span style={{ color: "magenta" }}> 🤚🏻</span> 2-4 business
                      days to process your order.
                    </h4>
                    <br />
                    <h4>
                      <span style={{ color: "blue" }}> 🤚🏻</span> We promise to
                      deliver your order in a timely manner.
                    </h4>
                    <br />
                    <h4>
                      <span style={{ color: "black" }}> 🤚🏻</span> We take atmost
                      1.5 weeks to deliver your order.
                    </h4>
                  </div>
                </DetailsContainer>
              </InfoContainer>
            </Wrapper>
          </Container>
          <ReviewHeading>Reviews</ReviewHeading>
          <Dialog
            aria-labelledby="customized-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent>
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="textarea"
                cols="30"
                rows="8"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={submitReviewToggle}>
                Cancel
              </Button>
              <Button color="primary" onClick={submitReview}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <Reviews>
              {product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)}
            </Reviews>
          ) : (
            <p style={{ fontSize: 18, textAlign: "center", padding: 10 }}>
              No Reviews
            </p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
