class apiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("createdAt");
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  search() {
    let query;
    if (this.queryString.keyword) {
      query = {
        content: { $regex: this.queryString.keyword, $options: "i" },
      };
    }
    this.mongooseQuery = this.mongooseQuery.find(query);
    this.filteredQuery = query;
    return this;
  }

  paginate(docsCount) {
    const page = +this.queryString.page || 1;
    const limit = +this.queryString.limit || 1;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;

    const pagination = {};
    pagination.currentPage = page;
    pagination.limit = limit;
    pagination.numOfPages = Math.ceil(docsCount / limit);

    //Next page
    if (endIndex < docsCount) {
      pagination.nextPage = page + 1;
    }

    // previous page
    if (skip > 0) {
      pagination.prevPage = page - 1;
    }
    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;
    return this;
  }
}

module.exports = apiFeatures;
