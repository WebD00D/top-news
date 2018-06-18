import React, { Component } from "react";

class Result extends Component {
  render() {

    let data = this.props.data;

    return (
      <div className="result">

        <div className="result__meta">
          <div className="result__title"><b>{data.title}</b></div>
            <div className="result__date">Published on {data.published_date}</div>

          <div className="result__abstract">{data.abstract}</div>
          <a className="result__link" target="_blank" href={data.url}>Read full article</a>
        </div>
      </div>
    );
  }
}

export default Result;
