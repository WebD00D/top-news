import React, { Component } from "react";

import _ from "lodash";

import AppHeader from "./components/AppHeader";
import ArticleFilter from "./components/ArticleFilter";
import Result from "./components/Result";

class App extends Component {
  constructor(props) {
    super(props);

    this._handleSectionChange = this._handleSectionChange.bind(this);
    this._handleFiltering = this._handleFiltering.bind(this);
    this._handleDataFetch = this._handleDataFetch.bind(this);

    this.state = {
      articlesMasterSet: [],
      articlesFilteredSet: [],
      section: "home"
    };
  }

  componentDidMount() {
    this._handleDataFetch(this.state.section);
  }

  _handleDataFetch(section) {
    var url = `https://api.nytimes.com/svc/topstories/v2/${
      section
    }.json?api-key=82c1636e3f76444eb50b3d13b0b82bd2`;

    fetch(url)
      .then(function(res) {
        return res.json();
      })
      .then(
        function(data) {
          let limit10 = [];
          for (var i = 0; i < 10; i++) {
            limit10.push(data.results[i]);
          }

          this.setState({
            articlesMasterSet: _.reverse(_.sortBy(limit10, ["published_date"])),
            articlesFilteredSet: _.reverse(
              _.sortBy(limit10, ["published_date"])
            ),
            section
          });
        }.bind(this)
      );
  }

  _handleSectionChange(section) {
    this._handleDataFetch(section.replace(/ /g, "").toLowerCase());
    this.filterElement.value = "";
  }

  _handleFiltering(filterValue) {
    let articles = [...this.state.articlesMasterSet];
    let filtered = _.filter(articles, function(item) {
      let title = item.title.toUpperCase();
      return title.indexOf(filterValue.toUpperCase().trim()) > -1;
    });

    let orderedList = _.reverse(_.sortBy(filtered, ["published_date"]));

    this.setState({
      articlesFilteredSet: orderedList
    });
  }

  render() {
    let results = Object.keys(this.state.articlesFilteredSet).map(key => {
      return <Result key={key} data={this.state.articlesFilteredSet[key]} />;
    });

    let resultCount = this.state.articlesFilteredSet.length;

    return (
      <div className="app">
        <div>
        <AppHeader />
        <ArticleFilter
          changeSection={section => this._handleSectionChange(section)}
          filterTitle={filter => this._handleFiltering(filter)}
          filterRef={el => (this.filterElement = el)}
        />
        <div className="result-count">Results: {resultCount} / 10</div>
        <div className="app-results">{results}</div>
        </div>
      </div>
    );
  }
}

export default App;
