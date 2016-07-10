import React from 'react';
import { Col, Row } from 'react-bootstrap';
import BlogMenu from './BlogMenu.js';

class DateRanges extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dates: [],
    };
  }
  componentWillMount() {
    const getAll = $.ajax({
      method: 'GET',
      url: '/blog/api/archive/dates',
    })
    .done(() => {
      this.setState({
        posts: JSON.parse(getAll.responseText).posts,
        tags: JSON.parse(getAll.responseText).tags,
      });
      console.log(this.state);
      this.buildTagsObj();
    });
  }

  renderTags() {
    return this.state.tagslist.map((tag) => {
      return (
        <div key={tag.item}>
          <a href="#">
            {tag.item} ({tag.cnt})
          </a>
        </div>
      );
    });
  }

  render() {
    if(this.state.tagslist) {
      return (
        <div>
          <Col xs={6} xsOffset={3} sm={2} smOffset={5}>
            <BlogMenu />
          </Col>
          <br />
          <br />
          All Tags:
          {this.renderTags()}
        </div>
      );
    } else {
      return (
        <div>loading...</div>
      );
    }
  }

}

module.exports = DateRanges;
