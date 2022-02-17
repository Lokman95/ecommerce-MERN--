import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../redux/actions/productAction";
import MetaDta from "../../components/MetaData";
import Sidebar from "../../components/Admin/Sidebar";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import InfoIcon from "@mui/icons-material/Info";
import { ADMIN_PRODUCT_UPDATE_RESET } from "../../redux/const/productConst";
import styled from "styled-components";
import { useAlert } from "react-alert";

const MainContainer = styled.div`
  display: flex;
  width: 100%;
  box-sizing: border-box;
  height: 100vh;
  background-color: #1221cf6a;
`;
const ProductContainer = styled.div`
  margin-left: 300px;
  width: 500px;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 70%;
  margin: auto;
  padding: 2vmax;
`;
const Heading = styled.h1`
  padding: 20px;
`;
const InputContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 15px;
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
const TextArea = styled.textarea`
  padding: 2vmax 4vmax;
  width: 100%;
  border: 1px solid #1f1e1e;
  outline: none;
  border-radius: 5px;
`;
const Select = styled.select`
  padding: 1vmax 4vmax;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #1f1e1e;
  outline: none;
  border-radius: 5px;
`;
const AvatarDiv = styled.div`
  display: flex;
  flex-direction: row;
`;
const Avatar = styled.img`
  width: 40px;
  height: 30px;
  border-radius: 10px;
  margin-top: 10px;
  margin-right: 5px;
`;
const InputFileContainer = styled.div`
  padding: 1vmax 4vmax;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #1f1e1e;
  outline: none;
  border-radius: 5px;
  margin-top: 10px;
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

const UpdateProduct = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, product } = useSelector((state) => state.productDetails);
  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.product);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

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

  const productId = match.params.id;

  useEffect(() => {
    if (product && product._id !== productId) {
      dispatch(getProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setStock(product.Stock);
      setOldImages(product.images);
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Product Updated");
      history.push("/admin/products");
      dispatch({ type: ADMIN_PRODUCT_UPDATE_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    history,
    isUpdated,
    productId,
    product,
    updateError,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(productId, myForm));
  };
  const updateProductImage = (e) => {
    const files = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  return (
    <>
      <MetaDta title="Update Product" />
      <MainContainer>
        <Sidebar />
        <ProductContainer>
          <Form
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <Heading>Update Product</Heading>
            <InputContainer>
              <SpellcheckIcon />
              <Input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputContainer>
            <InputContainer>
              <AttachMoneyIcon />
              <Input
                type="number"
                placeholder="Price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </InputContainer>

            <InputContainer>
              <InfoIcon />
              <TextArea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></TextArea>
            </InputContainer>

            <InputContainer>
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </InputContainer>

            <InputContainer>
              <Inventory2Icon />
              <Input
                placeholder="Stock"
                type="number"
                required
                value={Stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </InputContainer>

            <InputFileContainer>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImage}
                multiple
              />
            </InputFileContainer>

            <AvatarDiv>
              {oldImages &&
                oldImages.map((image, index) => (
                  <Avatar
                    key={index}
                    src={image.url}
                    alt="Old Product Preview"
                  />
                ))}
            </AvatarDiv>

            <AvatarDiv>
              {imagesPreview.map((image, index) => (
                <Avatar key={index} src={image} alt="Product Preview" />
              ))}
            </AvatarDiv>
            <ButtonContainer type="submit" disabled={loading ? true : false}>
              Update
            </ButtonContainer>
          </Form>
        </ProductContainer>
      </MainContainer>
    </>
  );
};

export default UpdateProduct;
