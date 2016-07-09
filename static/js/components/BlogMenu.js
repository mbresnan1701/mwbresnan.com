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
          <a className="blog-menu-item" href="#">
            Main
          </a>
          |
          <a className="blog-menu-item" href="#">
            Tags
          </a>
        </div>
    );
  }

}

module.exports = BlogMenu;
