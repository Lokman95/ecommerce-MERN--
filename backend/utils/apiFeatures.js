class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  search() {
    // search filter by keyword
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    // filter by category
    const queryCopy = { ...this.queryString };
    const removeFields = ["keyword", "page", "limit"];
    removeFields.forEach((param) => delete queryCopy[param]);

    //Filter by price and ratings

    let queryString = JSON.stringify(queryCopy);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }
  pagination(productPerPage) {
    const currentPage = Number(this.queryString.page) || 1;

    const skip = productPerPage * (currentPage - 1);

    this.query = this.query.limit(productPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures;
