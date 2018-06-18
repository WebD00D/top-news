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
          console.log(data);
          this.setState({
            articlesMasterSet: data.results,
            articlesFilteredSet: data.results,
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

    let orderedList = _.sortBy(filtered, ["published_date"]);

    this.setState({
      articlesFilteredSet: orderedList
    });
  }

  render() {
    let results = Object.keys(this.state.articlesFilteredSet).map(key => {
      return <Result key={key} data={this.state.articlesFilteredSet[key]} />;
    });

    return (
      <div className="app">
        <AppHeader />
        {this.state.section}
        <ArticleFilter
          changeSection={section => this._handleSectionChange(section)}
          filterTitle={filter => this._handleFiltering(filter)}
          filterRef={el => (this.filterElement = el)}
        />
        <div className="app-results">{results}</div>
      </div>
    );
  }
}

export default App;
