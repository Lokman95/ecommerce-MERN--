const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const tryCatchAsyncErrors = require("../middleware/tryCatchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("cloudinary");

// Create Product --Admin
exports.createProduct = tryCatchAsyncErrors(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  const imagesLink = [];
  for (let i = 0; i < images.length; i++) {
    const image = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });
    imagesLink.push({
      public_id: image.public_id,
      url: image.secure_url,
    });
  }

  req.body.images = imagesLink;
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// Get All Products --User
exports.getAllProducts = tryCatchAsyncErrors(async (req, res) => {
  const productPerPage = 12;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search() //Search filter
    .filter() //Category filter
    .pagination(productPerPage); //Pagination

  const products = await apiFeature.query;

  res.status(200).json({
    message: "get all products",
    success: true,
    products,
    productsCount,
    productPerPage,
  });
});

// Get All Products --Admin
exports.getAllAdminProducts = tryCatchAsyncErrors(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    message: "get all products",
    success: true,
    products,
  });
});

//Get Single Product Details --Admin
exports.getSingleProduct = tryCatchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }
  res.status(200).json({
    message: "get single product Details",
    success: true,
    product,
  });
});

// Update Product --Admin
exports.updateProduct = tryCatchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }
  //Images
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }
  if (images !== undefined) {
    //Delete Image From Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }
    //Upload New Images
    const imagesLink = [];
    for (let i = 0; i < images.length; i++) {
      const image = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });
      imagesLink.push({
        public_id: image.public_id,
        url: image.secure_url,
      });
    }
    req.body.images = imagesLink;
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    message: "Product updated",
    success: true,
    product,
  });
});

// Delete Product --Admin
exports.deleteProduct = tryCatchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }
  //Delete Image From Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({
    message: "Product deleted",
    success: true,
  });
});

// Create New Review or Update the review
exports.createProductReview = tryCatchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
exports.getProductReviews = tryCatchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
exports.deleteReview = tryCatchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  const ratings = avg / reviews.length;

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
