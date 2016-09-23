import React from 'react';
import { Panel, Row, Col } from 'react-bootstrap';
import TagGroup from './TagGroup.js';

class PostListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
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
            <p className="post-description">
              {this.props.post.fields.description}
              <a href={'/blog/' + this.props.post.fields.url}>
                {'\t'} Read More...
              </a>
            </p>
            <Row>
              <TagGroup tagview={this.props.tagview} tags={this.props.tags} />
            </Row>
          </div>
        </Panel>
      </div>
    );
  }

}

module.exports = PostListItem;
