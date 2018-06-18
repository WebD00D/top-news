import React, { Component } from "react";

class Result extends Component {
  render() {

    let data = this.props.data;

    return (
      <div className="result">
  
        <div className="result__meta">
          <div>{data.title}</div>
          <div>{data.abstract}</div>
          <div>{data.published_date}</div>
          <a target="_blank" href={data.url}>Read the Full Article</a>
        </div>
      </div>
    );
  }
}

export default Result;
