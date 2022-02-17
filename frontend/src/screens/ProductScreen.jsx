import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../redux/actions/productAction";
import Loader from "../components/Loader";
import HomeProduct from "../components/HomeProduct";
import styled from "styled-components";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { mobile } from "../responsive";

const categories = [
  "Computer Accesories",
  "Mobile Accesories",
  "Electronics",
  "Mobile",
  "Laptop",
  "Camera",
  "Home Appliances",
  "Grocery",
  "Cosmetics",
  "Watch",
  "Bekary",
];

const Heading = styled.h1`
  margin: 1vmax auto;
  width: 12vw;
  font-size: 22px;
  text-align: center;
  border-bottom: 1px solid #e5e5e5;
  padding: 10px;
  ${mobile({ fontSize: "15px" })}
`;
const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 6vmax;
  .pagination {
    display: flex;
    justify-content: center;
    padding: 0;
  }
  .page-item {
    background-color: "white";
    list-style: none;
    border: 1px solid #222121;
    padding: 1vmax 1.5vmax;
    transition: all 0.3s;
    cursor: pointer;
  }
  .page-link {
    text-decoration: none;
    font: 300 0.7vmax;
  }
  .page-item:hover {
    background-color: #aaa7a7;
  }
  .page-item:hover .page-link {
    color: #363535;
  }
  .pageItemActive {
    background-color: #12f11d;
  }
  .pageLinkActive {
    color: #ffffff;
  }
`;
const FilterContainer = styled.div`
  width: 15vmax;
  position: absolute;
  top: 12vmax;
  left: 8vmax;
  ${mobile({ width: "12vmax", marginTop: "60px", marginLeft: "-28px" })}
`;
const CategoryContainer = styled.ul`
  margin-top: 15px;
  list-style-type: none;
  overflow: hidden;
  display: flex;
  justify-content: center;
  background-color: #07c4ca;
`;
const List = styled.li`
  padding: 15px;
  margin: 2px;
  // background-color: #f3dc0bb9;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  :hover {
    background-color: white;
    transition: all 0.5s;
    transform: scale(1.1);
  }
`;
const FieldSet = styled.fieldset`
  width: 15vmax;
  padding: 4px;
  position: absolute;
  top: 11vmax;
  right: 7vmax;
  border: 1px solid #36353534;
  ${mobile({ width: "12vmax", marginTop: "40px", marginRight: "-30px" })}
`;

const ProductScreen = ({ match }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 5000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const { products, loading, productsCount, productPerPage } = useSelector(
    (state) => state.products
  );
  const keyword = match.params.keyword;

  const setCurrentPageNo = (page) => {
    setCurrentPage(page);
  };
  const handlePrice = (event, newValue) => {
    setPrice(newValue);
  };

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <CategoryContainer>
            {categories.map((category) => (
              <List key={category} onClick={() => setCategory(category)}>
                {category}
              </List>
            ))}
          </CategoryContainer>
          <Heading>ALL PRODUCTS</Heading>
          <Container>
            {products &&
              products.map((product) => (
                <HomeProduct key={product._id} product={product} />
              ))}
          </Container>
          <FilterContainer>
            <Typography style={{ marginLeft: "20px" }}>Price</Typography>
            <Slider
              value={price}
              onChange={handlePrice}
              disableSwap
              valueLabelDisplay="on"
              max={5000}
              min={0}
            />
          </FilterContainer>
          <FieldSet>
            <Typography component="legend" style={{ marginLeft: "20px" }}>
              Ratings Above
            </Typography>
            <Slider
              value={ratings}
              onChange={(event, newRating) => {
                setRatings(newRating);
              }}
              aria-labelledby="continuous-slider"
              min={0}
              max={5}
              valueLabelDisplay="on"
            />
          </FieldSet>
          {productPerPage < productsCount && (
            <PaginationContainer>
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={productPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Previous"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </PaginationContainer>
          )}
        </>
      )}
    </>
  );
};

export default ProductScreen;
