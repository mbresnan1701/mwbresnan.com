import React from 'react';
import { Row } from 'react-bootstrap';
import PostListItem from './PostListItem.js';

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
    });
  }

          // <div dangerouslySetInnerHTML={{ __html: post.fields.text }}>

  renderPosts() {
    return this.state.posts.map((post) => {
      return (
        <div key={post.pk}>
          <PostListItem post={post} />
          <hr />
        </div>
      );
    });
  }

  render() {
    return (
      <Row>
        {this.renderPosts()}
      </Row>
    );
  }

}

module.exports = Blog;
