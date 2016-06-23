import React from 'react';
import { Col } from 'react-bootstrap';

class Comment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const data = JSON.parse(this.props.comment);
    return (
      <Col lg={8} lgOffset={2} md={10} mdOffset={1}>
        <div className="comment">
          <div className="comment-name">{data.name}</div>
          <div className="comment-name">{data.date}</div>
          <div className="comment-name">{data.msg}</div>
        </div>
        <hr />

      </Col>
    );
  }

}

module.exports = Comment;
