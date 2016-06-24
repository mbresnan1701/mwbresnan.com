import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Comment from './Comment.js';
import AddComment from './AddComment.js';

class BlogDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      post: null,
      comments: [],
    };
  }

  componentWillMount() {
    const getPost = $.ajax({
      method: 'GET',
      url: '/blog/api/single/' + this.props.params.id,
    })
    .done(() => {
      this.setState({
        post: JSON.parse(getPost.responseText)[0],
      });
      this.getComments();
    });
  }

  getComments() {
    const getComments = $.ajax({
      method: 'GET',
      url: 'api/comments',
    })
    .done(() => {
      this.setState({
        comments: JSON.parse(getComments.responseText),
      });
    });
  }

  renderComments() {
    return this.state.comments.map((comment) => {
      return (
        <Comment comment={comment.fields} />
      );
    });
  }
  render() {
    if (this.state.post) {
      return (
        <div>
          <Row>
            <Col lg={8} lgOffset={2} md={10} mdOffset={1}>
              <div className="post-preview">
                <h2 className="post-title">
                  {this.state.post.fields.title}
                </h2>
                <h3 className="post-subtitle">
                  {this.state.post.fields.subtitle}
                </h3>
                <p className="post-meta">
                  {this.state.post.fields.datestr || this.state.post.fields.date}
                </p>
                <hr />
                <div dangerouslySetInnerHTML={{ __html: this.state.post.fields.text }}>
                </div>
              </div>
              <hr />

            </Col>
          </Row>
          <Row>
            <Col lg={8} lgOffset={2} md={10} mdOffset={1}>
              <div className="comments">
                <h3 className="post-title">Comments:</h3>
                {this.renderComments()}
              </div>
              <hr />
              <AddComment refcom={this.getComments.bind(this)} />
            </Col>
          </Row>
        </div>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

module.exports = BlogDetail;
