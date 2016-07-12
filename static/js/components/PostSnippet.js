import React from 'react';
import { Panel, Row, Col } from 'react-bootstrap';

class PostSnippet extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Col lg={8} lgOffset={2} md={10} mdOffset={1}>
        <Panel>
          <div className="post-preview">
            <h2 className="post-title">
              <a href={'/blog/' + this.props.post.fields.url}>
                  {this.props.post.fields.title}
              </a>
            </h2>
            <h3 className="post-subtitle">
              {this.props.post.fields.subtitle}
            </h3>
            <p className="post-meta">
              {this.props.post.fields.datestr || this.props.post.fields.date}
            </p>
          </div>
        </Panel>
      </Col>
    );
  }

}

module.exports = PostSnippet;
