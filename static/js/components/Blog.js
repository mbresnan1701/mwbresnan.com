import React from 'react';
import { Panel, Well, Button, Col, Row } from 'react-bootstrap';
import PostListItem from './PostListItem.js';
import DateRanges from './DateRanges.js';
import BlogTags from './BlogTags.js';
import NewsFeed from './NewsFeed.js';

class Blog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      tags: [],
      localposts: 5,
    };
  }

  componentWillMount() {
    this.getInitData();
  }

  getInitData() {
    const getAll = $.ajax({
      method: 'GET',
      url: '/blog/api/allposts',
    })
    .done(() => {
      this.setState({
        posts: JSON.parse(getAll.responseText).posts,
        tags: JSON.parse(getAll.responseText).tags,
      });
      this.resetLocalPostCount();
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
        posts: JSON.parse(getPosts.responseText),
      });
      this.resetLocalPostCount();
    });
  }

  getDatePosts(month, year) {
    const getPosts = $.ajax({
      method: 'GET',
      url: '/blog/api/dates/' + year + '/' + month,
    })
    .done(() => {
      this.setState({
        posts: JSON.parse(getPosts.responseText),
      });
      this.resetLocalPostCount();
    });
  }

  renderPosts() {
    return this.state.posts.map((post, i) => {
      if (i < this.state.localposts) {
        return (
          <div key={post.pk}>
            <PostListItem
              tagview={this.getTagPosts.bind(this)}
              post={post}
              tags={this.state.tags[post.pk]}
            />
          </div>
        );
      }
    });
  }

  updateLocalPostCount() {
    if (this.state.localposts + 5 > this.state.localposts) {
      this.setState({
        localposts: this.state.posts.length,
      });
    } else {
      this.setState({
        localposts: this.state.localposts += 5,
      });
    }
  }

  resetLocalPostCount() {
    this.setState({
      localposts: 5,
    });
  }

  renderMoreButton() {
    if (this.state.posts.length > this.state.localposts) {
      return (
        <Button onClick={this.updateLocalPostCount.bind(this)}>Load older</Button>
      );
    } else {
      return (
        <div></div>
      );
    }
  }


  render() {
    if (this.state.posts && this.state.tags) {
      return (
        <div>
          <Row>
            <Col xsHidden sm={4} smOffset={1}>
              <Panel>
                <Button bsStyle="link" onClick={this.getInitData.bind(this)}>
                  All Posts
                </Button>
                <br />
                By Date:
                <Well className="customWell">
                    <DateRanges
                      dateview={this.getDatePosts.bind(this)}
                    />
                </Well>
                By Tag:
                <Well>
                  <BlogTags
                    posts={this.state.posts}
                    tags={this.state.tags}
                    tagview={this.getTagPosts.bind(this)}
                  />
                </Well>
              </Panel>
            </Col>
            <Col xs={10} xsOffset={1} sm={6} smOffset={0}>
              {this.renderPosts()}
              {this.renderMoreButton()}
            </Col>
          </Row>
          <NewsFeed />
        </div>
      );
    } else {
      return (
        <div>
          LOADING GIF HERE!!!
        </div>
      );
    }

  }

}

module.exports = Blog;
