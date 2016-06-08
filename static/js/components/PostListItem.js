import React from 'react';
import { Col } from 'react-bootstrap';

class PostListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Col lg={8} lgOffset={2} md={10} mdOffset={1}>
        <div className="post-preview">
          <a href={'/blog/' + this.props.post.pk}>
            <h2 className="post-title">
              {this.props.post.fields.title}
            </h2>
          </a>

          <h3 className="post-subtitle">
            {this.props.post.fields.subtitle}
          </h3>
          <p className="post-meta">
            {this.props.post.fields.datestr || this.props.post.fields.date}
          </p>
        </div>
        <hr />

      </Col>
    );
  }

}

module.exports = PostListItem;
