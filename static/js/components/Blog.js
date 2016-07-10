import React from 'react';
import { Panel, Well, Button, Col, Row } from 'react-bootstrap';
import PostListItem from './PostListItem.js';
import DateRanges from './DateRanges.js';
import BlogTags from './BlogTags.js';

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
    this.getInitData();
  }

  getInitData() {
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
        console.log(this.state)
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

  getTagPosts(tag) {
    const getPosts = $.ajax({
      method: 'GET',
      url: '/blog/api/tags/' + tag,
    })
    .done(() => {
      this.setState({
        posts: JSON.parse(getPosts.responseText).posts,
        tags: JSON.parse(getPosts.responseText).tags,
      });
      console.log(this.state)
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
        <Row>
          <Col xsHidden sm={4}>
            <Panel>
              <a href="#">
                Most Recent
              </a>
              <br />
              By Date:
              <Well>
                <DateRanges />
              </Well>
              By Tag:
              <Well>
                <BlogTags />
              </Well>
            </Panel>
          </Col>
          <Col xs={10} sm={8}>
            <Panel>
            {this.renderPosts()}
            </Panel>
            {this.renderMoreButton()}
          </Col>
        </Row>
      </div>
    );
  }

}

module.exports = Blog;
