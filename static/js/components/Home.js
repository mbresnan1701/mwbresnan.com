import React from 'react';
import { Panel, Row, Col } from 'react-bootstrap';
import PostListItem from './PostListItem.js';
import NewsFeed from './NewsFeed.js';
import QuoteBox from './QuoteBox.js';

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      tags: [],
    };
  }

  componentWillMount() {
    const getRecent = $.ajax({
      method: 'GET',
      url: '/blog/api/recent',
    })
    .done(() => {
      const data = JSON.parse(getRecent.responseText);
      this.setState({
        posts: data.posts,
        tags: data.tags,
      });
    });
  }

  renderRecent() {
    return this.state.posts.map((post) => {
      return (
        <div key={post.pk}>
          <PostListItem post={post} tags={this.state.tags[post.pk]} />
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <div>
          {this.renderRecent()}
        </div>
        <Col lg={8} lgOffset={2} md={10} mdOffset={1}>
          <a className="morebloglink" href="/blog">More Blog Entries</a>
          <Panel header={"From The Web"}>
            <NewsFeed />
          </Panel>
          <Panel header={"Quote"}>
            <QuoteBox />
          </Panel>

        </Col>

      </div>
    );
  }

}

module.exports = Home;
