class APIFilters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr
  }

  filter() {
    const queryCopy = {...this.queryStr};

    // Removing fields from the query
    const removeFields = ['sort', 'fields', 'q', 'limit', 'page'];
    removeFields.forEach(el => delete queryCopy[el])

    //  Advance filter using: lt, lte, gt, gte
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)

    this.query = this.query.find(this.queryStr);
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ')
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort('-postingData')
    }

    return this
  }

  // fix dtat show ?feilds=nameFeilds
  limitFields() {
    if (this.queryStr.fields) {
      const feilds = this.queryStr.feilds.split(',').join(' ');
      this.query = this.query.select(this.feilds);
    } else {
      this.query =this.query.select('-__v');
    }

    return this;
  }

  searchByQuery() {
    if (this.queryStr.q) {
      const qu = this.queryStr.q.split('-').join(' ')
      this.query = this.query.find({$text: {$search: "\""+ qu +"\""}});
    }

    return this;
  }

  pagination() {
    const page = parseInt(this.queryStr.page, 10) || 1;
    const limit = parseInt(this.queryStr.limit, 10) || 10;
    const skipResults = (page - 1) * limit;

    this.query = this.query.skip(skipResults).limit(limit);

    return this;
  }
}

module.exports = APIFilters;