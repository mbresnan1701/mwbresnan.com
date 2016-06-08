import React from 'react';
import { Row } from 'react-bootstrap';
import PostSummary from './PostSummary.js';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    };
  }

  componentWillMount() {
    const getRecent = $.ajax({
      method: 'GET',
      url: '/blog/api/recent',
    })
    .done(() => {
      this.setState({
        posts: JSON.parse(getRecent.responseText),
      });
    });
  }

  renderRecent() {
    return this.state.posts.map((post) => {
      return (
        <div key={post.pk}>
          <PostSummary post={post} />
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

module.exports = Home;
