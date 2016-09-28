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
          <Col xsHidden md={3} className="portrait" />
          <Col xs={12} md={8} className="bio">
            <p className="infoPanelHeader">
            Welcome!
            </p>
            <p>
            You've reached the site of Matthew William Bresnan - programmer, engineer{", "}
              <strike>ninja</strike>

            {" developer."} Check out my <a href="/blog">blog </a>!
            </p>
          </Col>
        </Col>
        <Col xs={12} className="homePanel">
          <Col xs={12} md={8} className="aboutme" >
            <p className="infoPanelHeader">
            Who am I?
            </p>
            <p>
            Like most residents of Sillicon Valley, I live and die by the compiler. Software is my business - and my passion.
            I'm currently building consumer-focused mobile applications for
            <a href="https://www.linkedin.com/company/walmartecommerce"> @Walmart Labs</a>
            . In my spare time I work on enhancing my knowledge of tech through study and practice.

            Check out my work on my <a href="https://www.github.com/mbresnan1701"> Github </a> or keep up with me and my work on
            <a href="https://www.github.com/mbresnan1701"> Twitter </a>!
            </p>
          </Col>
          <Col xsHidden md={3} className="codepic" />
        </Col>
        <Col xs={12} className="homePanel lastPanel">
          <Col xsHidden md={3} className="portrait" />
          <Col xs={12} md={8} className="bio">
            <p className="infoPanelHeader">
            Shameless Self-Plug
            </p>
            <p>
            My money's in that office, right? If she start giving me some bullshit about it ain't there, and we got to go someplace else and get it, I'm gonna shoot you in the head then and there. Then I'm gonna shoot that bitch in the kneecaps, find out where my goddamn money is. She gonna tell me too. Hey, look at me when I'm talking to you, motherfucker. You listen: we go in there, and that nigga Winston or anybody else is in there, you the first motherfucker to get shot. You understand?
            </p>
          </Col>
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
