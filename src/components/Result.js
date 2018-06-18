import React, { Component } from "react";
import Moment from "react-moment";
import "moment-timezone";

class Result extends Component {
  render() {
    const data = this.props.data;
    return (
      <div className="result">
        <div className="result__meta">
          <div className="result__title">
            <b>{data.title}</b>
          </div>
          <div className="result__date">
            Published{" "}
            <Moment tz="America/New_York" format="MM/DD/YYYY h:mma z">
              {data.published_date}
            </Moment>
          </div>
          <div className="result__abstract">{data.abstract}</div>
          <a className="result__link" target="_blank" href={data.url}>
            Read full article
          </a>
        </div>
      </div>
    );
  }
}

export default Result;
