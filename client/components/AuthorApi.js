import React from "react";
import axios from "axios";

class AuthorApi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      thumbnail: "",
      author: "",
      ISBN: 0,
    };
  }

  componentDidMount() {
    this.getAuth();
  }

  getAuth = async () => {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=` +
        this.props.book.name +
        `&key=AIzaSyDegu-sLFTt0RtMrOIUtiOttWlBa0AdIXA`
    );
    console.log("res", res);
    this.setState({
      author: res.data.items[0].volumeInfo.authors[0],
    });
  };

  render() {
    return <div>{this.state.author}</div>;
  }
}

export default AuthorApi;
