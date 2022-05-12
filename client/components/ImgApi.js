import React from "react";
import axios from "axios";

class ImgApi extends React.Component {
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
    this.getThumb();
  }

  getThumb = async () => {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=` +
        this.props.book.name +
        `&key=AIzaSyDegu-sLFTt0RtMrOIUtiOttWlBa0AdIXA`
    );
    console.log("res", res);
    this.setState({
      thumbnail: res.data.items[0].volumeInfo.imageLinks.thumbnail,
    });
  };

  getDesc = async () => {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=` +
        this.props.book.name +
        `&key=AIzaSyDegu-sLFTt0RtMrOIUtiOttWlBa0AdIXA`
    );
    console.log("res", res);
    this.setState({
      description: res.data.items[0].volumeInfo.description,
    });
  };

  getAuth = async () => {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=` +
        this.props.book.name +
        `&key=AIzaSyDegu-sLFTt0RtMrOIUtiOttWlBa0AdIXA`
    );
    console.log("res", res);
    this.setState({
      description: res.data.items[0].volumeInfo.authors[0],
    });
  };

  getISBN = async () => {
    const res = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=` +
        this.props.book.name +
        `&key=AIzaSyDegu-sLFTt0RtMrOIUtiOttWlBa0AdIXA`
    );
    console.log("res", res);
    this.setState({
      description: res.data.items[0].volumeInfo.industryIdentifiers.type,
    });
  };

  render() {
    return (
      <div>
        <img src={this.state.thumbnail} />
      </div>
    );
  }
}

export default ImgApi;
