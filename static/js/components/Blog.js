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
      special: false,
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
      // this.setState({
      //   localposts: this.state.posts.length,
      // });
      // const getCount = $.ajax({
      //   method: 'GET',
      //   url: '/blog/api/postcount',
      // })
      // .done(() => {
      //   this.setState({
      //     totalposts: parseInt(getCount.responseText),
      //   });
        // console.log(this.state)
      // });
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
    console.log("Hit getTagPosts")
    console.log(tag)

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

  // getDatePosts(date) {
  //   const getPosts = $.ajax({
  //     method: 'GET',
  //     url: '/blog/api/archive/' + date,
  //   })
  //   .done(() => {
  //     this.setState({
  //       posts: JSON.parse(getPosts.responseText).posts,
  //       tags: JSON.parse(getPosts.responseText).tags,
          // special: true,

  //     });
  //     console.log(this.state)
  //   });
  // }

  setSpecial() {
    this.setState({
      special: !this.state.special,
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

  //UPDATE
  renderMoreButton() {
    if (true) {
      return (
        <Button onClick={this.getMorePosts.bind(this)}>Load older</Button>
      );
    } else {
      return (
        <div></div>
      );
    }
  }

                  // invertspecial={this.setSpecial.bind(this)}
                  // tagview={this.getTagPosts.bind(this)}

  render() {
    if(this.state.posts && this.state.tags) {
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
                  <BlogTags
                    posts={this.state.posts}
                    tags={this.state.tags}
                  />
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
