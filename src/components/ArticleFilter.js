import React, { Component } from "react";

class SectionSelector extends Component {
  render() {
    return (
      <div className="app-filter">
        <label>NY Times Section</label>
        <select onChange={e => this.props.changeSection(e.target.value)}>
          <option>Home</option>
          <option>Opinion</option>
          <option>World</option>
          <option>National</option>
          <option>Politics</option>
          <option>Upshot</option>
          <option>NY Region</option>
          <option>Business</option>
          <option>Technology</option>
          <option>Science</option>
          <option>Health</option>
          <option>Sports</option>
          <option>Arts</option>
          <option>Books</option>
          <option>Movies</option>
          <option>Theater</option>
          <option>Sunday Review</option>
          <option>Fashion</option>
          <option>T Magazine</option>
          <option>Food</option>
          <option>Travel</option>
          <option>Magazine</option>
          <option>Real Estate</option>
          <option>Automobiles</option>
          <option>Obituaries</option>
          <option>Insider</option>
        </select>
        <label>Filter By Title</label>
        <input
          onChange={e => this.props.filterTitle(e.target.value)}
          type="text"
          ref={this.props.filterRef}
          placeholder="i.e World Cup"
        />
      </div>
    );
  }
}

export default SectionSelector;
