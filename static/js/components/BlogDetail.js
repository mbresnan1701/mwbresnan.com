import React from 'react';
import { Row, Col } from 'react-bootstrap';

class BlogDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      post: null,
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
    });
  }

          // <div dangerouslySetInnerHTML={{ __html: post.fields.text }}>

  render() {
    if (this.state.post) {
      return (
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
              <br />
              <div dangerouslySetInnerHTML={{ __html: this.state.post.fields.text }}>
              </div>
            </div>
          </Col>
        </Row>
      );
    } else {
      return (
        <div></div>
      );
    }
  }
}

module.exports = BlogDetail;
