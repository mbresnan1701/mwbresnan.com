import React from 'react';
import { Panel, Row, Col, Image } from 'react-bootstrap';
import PostSnippet from './PostSnippet.js';
import NewsFeed from './NewsFeed.js';
import QuoteBox from './QuoteBox.js';
import NavBar from './NavBar.js';
import Footer from './Footer.js';

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

  renderHomePanels() {
    return (
      <div >
        <Col xs={12} className="homePanel">
          <Col xsHidden md={4} className="portrait" />
          <Col xs={12} md={7} className="bio" />
        </Col>
        <Col xs={12} className="homePanel">
          <Col xs={12} md={7} className="aboutme" />
          <Col xsHidden md={4} className="codepic" />
        </Col>
        <Col xs={12} className="homePanel lastPanel">
          dldflsdfs
        </Col>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Col xs={12} className="homePanels">
          {this.renderHomePanels()}

        </Col>

      </div>
    );
  }

}

module.exports = Home;
