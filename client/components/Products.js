import React, { Component } from "react";
import axios from "axios";

export default class Products extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
    };
  }

  async componentDidMount() {
    const response = await axios.get("/api/products");
    const products = response.data;
    console.log(products);
    this.setState({ products });
  }

  render() {
    console.log(this.state);
    const books = this.state.products.map((book) => {
      return <li key={book.id}>{book.name}</li>;
    });
    return (
      <div>
        Products:
        {books}
      </div>
    );
  }
}
