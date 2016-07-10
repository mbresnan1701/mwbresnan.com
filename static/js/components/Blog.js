import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import PostListItem from './PostListItem.js';
import BlogMenu from './BlogMenu.js';

class Blog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      tags: [],
      totalposts: 0,
      localposts: 0,
    };
  }

  componentWillMount() {
    const getRecent = $.ajax({
      method: 'GET',
      url: '/blog/api/blogstart',
    })
    .done(() => {
      this.setState({
        posts: JSON.parse(getRecent.responseText).posts,
        tags: JSON.parse(getRecent.responseText).tags,
      });
      this.setState({
        localposts: this.state.posts.length,
      });
      const getCount = $.ajax({
        method: 'GET',
        url: '/blog/api/postcount',
      })
      .done(() => {
        this.setState({
          totalposts: parseInt(getCount.responseText),
        });
      });
    });
  }

  getMorePosts() {
    const localTotalDiff = this.state.totalposts - this.state.localposts;
    const getMore = $.ajax({
      method: 'GET',
      url: '/blog/api/nextposts/?count=' + this.state.localposts,
    })
    .done(() => {
      const moreData = JSON.parse(getMore.responseText);
      this.setState({
        localposts: this.state.localposts += moreData.posts.length,
        posts: this.state.posts.concat(moreData.posts),
        tags: this.state.tags.concat(moreData.tags),
      });
    });
  }

  renderPosts() {
    return this.state.posts.map((post) => {
      return (
        <div key={post.pk}>
          <PostListItem post={post} tags={this.state.tags[post.pk]} />
        </div>

      );
    });
  }

  renderMoreButton() {
    if (this.state.localposts < this.state.totalposts) {
      return (
        <Button onClick={this.getMorePosts.bind(this)}>Load older</Button>
      );
    } else {
      return (
        <div></div>
      );
    }
  }

  render() {
    return (
      <div>
        <Col xs={10} xsOffset={1} sm={8} smOffset={2} md={6} mdOffset={4}>
          <BlogMenu />
        </Col>
        <br />
        <br />
        <br />
        {this.renderPosts()}
        <Col lg={8} lgOffset={2} md={10} mdOffset={1}>
          {this.renderMoreButton()}
        </Col>
      </div>
    );
  }

}

module.exports = Blog;
