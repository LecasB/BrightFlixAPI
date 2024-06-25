class APIFilters {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = { ...queryStr }; // Create a copy of queryStr
  }

  filter() {
    // Removing fields from the query string
    const removeFields = ["sort"];
    removeFields.forEach((el) => delete this.queryStr[el]); // Delete from the copy

    this.query = this.query.find(this.queryStr);
    return this;
  }

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(",").join(" ");
      this.query = this.query.sort(sortBy);
    } else {
      // Default sort by most recent
      this.query = this.query.sort("created");
    }
    return this;
  }
}

module.exports = APIFilters;
