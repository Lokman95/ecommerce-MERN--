import { ArrowLeftOutlined, ArrowRightOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
//import { sliderItem } from "../data";
import { mobile } from "../responsive";
import HomeProduct from "./HomeProduct";
import MetaData from "./MetaData";
import Pagination from "react-js-pagination";
import { getProduct } from "../redux/actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "./Loader";
//import Slider from "@material-ui/core/Slider";
//import Typography from "@material-ui/core/Typography";
const BannerContainer = styled.div`
  width: 100%;
  height: 60vh;
  display: flex;
  position: relative;
  overflow: hidden;
  ${mobile({ width: 410, height: 150 })}
`;
const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #f5f79a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(props) => props.direction === "left" && "10px"};
  right: ${(props) => props.direction === "right" && "10px"};
  cursor: pointer;
  opacity: 0.5;
  z-index: 2;
  ${mobile({ width: 30, height: 30 })}
`;
const Wrapper = styled.div`
  height: 100%;
  display: flex;
  transition: all 1.5s ease;
  transform: translateX(${(props) => props.slide * -100}vw);
  ${mobile({ width: 410, height: 150 })}
`;
const Slide = styled.div`
  display: flex;
  width: 100vw;
  height: 80vh;
  align-items: center;
  background-color: ${(props) => props.bg};
  ${mobile({ width: 410, height: 150 })}
`;
const ImgContainer = styled.div`
  flex: 1;
  height: 100%;
  //padding-left: 115px;
  background-color: #07c4ca;
  ${mobile({ paddingLeft: 80, paddingTop: 120 })}
`;
const Image = styled.img`
  height: 80%;
  ${mobile({ height: "60%" })}
`;

const InfoContainer = styled.div`
  padding: 20px;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding-top: 200px;
  background-color: #07c4ca;
  ${mobile({ padding: 0, height: 150, width: 410 })}
`;
const Title = styled.h1`
  font-size: 40px;
  ${mobile({ fontSize: "12px", margin: 10 })}
`;
const Description = styled.p`
  margin: 30px 0px;
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 3px;
  ${mobile({
    fontSize: "10px",
    margin: 2,

    letterSpacing: 0.1,
    fontWeight: "normal",
  })}
`;
const Button = styled.button`
  padding: 10px;
  font-size: 20px;
  background-color: #07c4ca;
  cursor: pointer;
  ${mobile({ padding: 5, fontSize: 10, marginLeft: 15, marginTop: 20 })}
`;
const ProductContainer = styled.div`
  display: flex;
  margin: 2vmax auto;
  width: 98vw;
  flex-wrap: wrap;
  justify-content: center;
`;

const CategoryContainer = styled.div`
  list-style-type: none;
  overflow: hidden;
  display: flex;
  justify-content: center;
  //background-color: #39e939b5;
  flex-wrap: wrap;
`;

const List = styled.li`
  padding: 12px;
  margin-left: 2px;

  //background-color: #f3dc0bb9;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  font-weight: 600;
  flex-wrap: wrap;
  cursor: pointer;
  :hover {
    color: #07c4ca;
    transition: all 0.5s;
    transform: scale(1.1);
  }
  ${mobile({ fontSize: "10px" })}
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
    background-color: #07c4ca;
  }
  .pageLinkActive {
    color: #ffffff;
  }
`;
const sliderItem = [
  {
    id: 1,
    img: "FirstSlide.png",
    title: "BEST DEALS FOR SMARTPHONES",
    desc: " DON'T COMPOMISE ON QUALITY ! GET FLAT 30% OFF FOR NEW ARRIVALS .",
    bg: "#FFFFFF",
  },
  {
    id: 2,
    img: "second.png",
    title: "HIGH CONFIGURATION",
    desc: "DON'T COMPOMISE ON CONFIGUARATIONS ! WE SELL BEST COMPUTER IN COUNTRY .",
    bg: "#FFFFFF",
  },
  {
    id: 3,
    img: "https://www.pngall.com/wp-content/uploads/4/Grocery-PNG-Free-Download.png",
    title: "ORGANIC GROCERY",
    desc: "WE SALE ORGANIC! GET FLAT 30% OFF FOR ALL ARRIVALS .",
    bg: "#FFFFFF",
  },
];
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

const Home = ({ match }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [price] = useState([0, 5000]);
  const [category, setCategory] = useState("");

  const { products, loading, productsCount, productPerPage } = useSelector(
    (state) => state.products
  );

  const keyword = match.params.keyword;

  const setCurrentPageNo = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price, category));
  }, [dispatch, keyword, currentPage, price, category]);

  const [slide, setSlide] = React.useState(0);
  const handleClick = (direction) => {
    if (direction === "left") {
      setSlide(slide > 0 ? slide - 1 : 2);
    } else {
      setSlide(slide < 2 ? slide + 1 : 0);
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Eshop" />
          <BannerContainer>
            <Arrow direction="left" onClick={() => handleClick("left")}>
              <ArrowLeftOutlined />
            </Arrow>
            <Wrapper slide={slide}>
              {sliderItem.map((item) => (
                <Slide bg={item.bg}>
                  <ImgContainer>
                    <Image src={item.img} />
                  </ImgContainer>
                  <InfoContainer>
                    <Title>{item.title}</Title>
                    <Description>{item.desc}</Description>
                    <a href="#product">
                      <Button>SHOP NOW</Button>
                    </a>
                  </InfoContainer>
                </Slide>
              ))}
            </Wrapper>
            <Arrow direction="right" onClick={() => handleClick("right")}>
              <ArrowRightOutlined />
            </Arrow>
          </BannerContainer>

          <CategoryContainer>
            {categories.map((category) => (
              <List key={category} onClick={() => setCategory(category)}>
                <p>{category}</p>
              </List>
            ))}
          </CategoryContainer>

          <ProductContainer id="product">
            {products &&
              products.map((product) => (
                <HomeProduct key={product._id} product={product} />
              ))}
          </ProductContainer>

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

export default Home;
