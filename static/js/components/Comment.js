import React from 'react';
import { Col } from 'react-bootstrap';

class Comment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const data = this.props.comment;
    return (
        <div className="comment">
          <span className="comment-name">{data.name} </span><span className="comment-date">{data.datestr}</span>
          <br />
          <span className="comment-msg">{data.text}</span>
          <hr />
        </div>

    );
  }

}

module.exports = Comment;
