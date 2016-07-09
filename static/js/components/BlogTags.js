import React from 'react';
import { Col, Row } from 'react-bootstrap';

class Blog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      tags: [],
    };
  }
  componentWillMount() {
    const getAll = $.ajax({
      method: 'GET',
      url: '/blog/api/allposts',
    })
    .done(() => {
      this.setState({
        posts: JSON.parse(getAll.responseText).posts,
        tags: JSON.parse(getAll.responseText).tags,
      });
      console.log(this.state);
    });
  }

  render() {
    return (
      <div>
        THIS IS THE TAGS LIST
      </div>
    );
  }

}

module.exports = Blog;
