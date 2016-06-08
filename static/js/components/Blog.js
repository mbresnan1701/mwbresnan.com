import React from 'react';
import { Row } from 'react-bootstrap';
// import PostSummary from './PostSummary.js';

class Blog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentWillMount() {
    const getRecent = $.ajax({
      method: 'GET',
      url: '/blog/api/all',
    })
    .done(() => {
      this.setState({
        posts: JSON.parse(getRecent.responseText),
      });
      console.log(this.state.posts);
    });
  }


  renderRecent() {
    return this.state.posts.map((post) => {
      return (
        <div key={post.pk}>
          <div dangerouslySetInnerHTML={{ __html: post.fields.text }}>
          </div>
          <hr />
        </div>
      );
    });
  }

  render() {
    return (
      <Row>
        {this.renderRecent()}
      </Row>
    );
  }

}

module.exports = Blog;
