import React from 'react';
import { Row, Col } from 'react-bootstrap';
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
        </div>
      );
    });
  }

  render() {
    return (
      <Row>
        <Col lg={8} lgOffset={2} md={10} mdOffset={1}>
          <h3>Latest Blog Entries:</h3>
        </Col>
        {this.renderRecent()}
        <Col lg={8} lgOffset={2} md={10} mdOffset={1}>
          <a href="/blog">More Blog Entries</a>
        </Col>
      </Row>
    );
  }

}

module.exports = Home;
