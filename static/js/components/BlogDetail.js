import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Comment from './Comment.js';
import AddComment from './AddComment.js';
import ReactDisqusThread from 'react-disqus-thread';

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
      url: '/blog/api/single/' + this.props.params.urlstr,
    })
    .done(() => {
      this.setState({
        post: JSON.parse(getPost.responseText)[0],
      });
      // this.getComments();
    });
  }

  // getComments() {
  //   const getComments = $.ajax({
  //     method: 'GET',
  //     url: 'api/comments',
  //   })
  //   .done(() => {
  //     this.setState({
  //       comments: JSON.parse(getComments.responseText),
  //     });
  //   });
  // }

  // renderComments() {
  //   return this.state.comments.map((comment) => {
  //     return (
  //       <Comment key={comment.pk} comment={comment.fields} />
  //     );
  //   });
  // }

  // <div className="comments">
  //   <h3 className="post-title">Comments</h3>
  //   {commentSec}
  // </div>
  // <AddComment refcom={this.getComments.bind(this)} />
  handleNewComment(comment) {
    console.log(comment.text);
  }

  render() {
    // const commentSec = this.state.comments.length > 0 ? this.renderComments() : <div> No comments yet. Be the first!</div>;
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
            <Col lg={6} lgOffset={2} md={8} mdOffset={1}>
              <ReactDisqusThread
                shortname="mwbresnan.disqus.com"
                identifier={this.state.post.fields.url}
                title={this.state.post.fields.title + ': ' + this.state.post.fields.subtitle}
                url="http://127.0.0.1:8000"
                category_id="123456"
                onNewComment={this.handleNewComment}
              />
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
