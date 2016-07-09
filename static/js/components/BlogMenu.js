import React from 'react';
import { Row, Col } from 'react-bootstrap';

class BlogMenu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <div className="blog-menu">
          <a className="blog-menu-item" href="/blog">
            Main
          </a>
          |
          <a className="blog-menu-item" href="/tags">
            Tags
          </a>
        </div>
    );
  }

}

module.exports = BlogMenu;
