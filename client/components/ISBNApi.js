import React from "react";
import axios from "axios";

class ISBNApi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      thumbnail: "",
      author: "",
      ISBN: "",
    };
  }

  componentDidMount() {
    this.getISBN();
  }

  getISBN = async () => {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=` +
        this.props.book.name +
        `&key=AIzaSyDegu-sLFTt0RtMrOIUtiOttWlBa0AdIXA`
    );
    console.log("res", res);
    this.setState({
      ISBN: res.data.items[0].volumeInfo.industryIdentifiers[0].identifier,
    });
  };

  render() {
    return <div>{this.state.ISBN}</div>;
  }
}

export default ISBNApi;
