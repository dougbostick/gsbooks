import React from "react";
import request from "superagent";
import axios from "axios";

class Api extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      thumbnail: "",
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

  render() {
    // const description = request
    //   .get("https://www.googleapis.com/books/v1/volumes")
    //   .query({ q: this.props.book.name })
    //   .then(async (data) => {
    //     this.setState({
    //       description: data.body.items[0].volumeInfo.description,
    //     });
    //   });

    // const description = axios
    //   .get("https://www.googleapis.com/books/v1/volumes")
    //   .query({ q: this.props.book.name })
    //   .then(async (data) => {
    //     this.setState({
    //       description: data.body.items[0].volumeInfo.description,
    //     });
    //   });
    // const thumbnail = request
    //   .get(
    //     `https://www.googleapis.com/books/v1/volumes?q=` +
    //       this.props.book.name +
    //       `&key=AIzaSyDegu-sLFTt0RtMrOIUtiOttWlBa0AdIXA`
    //   )
    //   // .query({ q: this.props.book.name })
    //   .then(async (data) => {
    //     await this.setState({
    //       thumbnail: data.body.items[0].volumeInfo.imageLinks.thumbnail,
    //     });
    //   });
    // console.log(description);
    // console.log("api props", props);
    return (
      <div>
        <img src={this.state.thumbnail} />
      </div>
    );
  }
}

export default Api;
