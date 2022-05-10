import React from "react";
import axios from "axios";

class DescApi extends React.Component {
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
    this.getDesc();
  }

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

  render() {
    return <div>{this.state.description}</div>;
  }
}

export default DescApi;
