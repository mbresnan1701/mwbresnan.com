import React from 'react';
import { Panel, Row, Col } from 'react-bootstrap';
import PostSnippet from './PostSnippet.js';
import NewsFeed from './NewsFeed.js';
import QuoteBox from './QuoteBox.js';
import NavBar from './NavBar.js';

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
          <PostSnippet post={post} tags={this.state.tags[post.pk]} />
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <NavBar />
        <div>
          {this.renderRecent()}
        </div>
        <Col lg={8} lgOffset={2} md={10} mdOffset={1}>
          <a className="morebloglink" href="/blog">More Blog Entries</a>

          <Panel header={"Quote"}>
            <QuoteBox />
          </Panel>

        </Col>

      </div>
    );
  }

}

module.exports = Home;
