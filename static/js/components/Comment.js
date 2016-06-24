import React from 'react';
import { Well, Col } from 'react-bootstrap';

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
        <Well className="comment-well">
          <span className="comment-msg">{data.text}</span>
        </Well>
      </div>

    );
  }

}

module.exports = Comment;
