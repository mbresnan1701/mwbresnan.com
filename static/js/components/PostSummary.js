import React from 'react';
import { Col } from 'react-bootstrap';

class PostSummary extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Col lg={8} lgOffset={2} md={10} mdOffset={1}>
        <div className="post-preview">
          <a href="ADD LINK HERE">
            <h2 className="post-title">
              {this.props.post.fields.title}
            </h2>
            <h3 className="post-subtitle">
              {this.props.post.fields.subtitle}
            </h3>
            <p class="post-meta">
              {this.props.post.fields.datestr || this.props.post.fields.date}
            </p>
          </a>
        </div>
      </Col>
    );
  }

}

module.exports = PostSummary;
