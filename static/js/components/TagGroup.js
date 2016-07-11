import React from 'react';
import { Button, Col } from 'react-bootstrap';

class TagGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleClick(tag) {
    this.props.tagview(tag);
  }

  renderTags() {
    return this.props.tags.map((tag) => {
      return (
          <div key={tag.fields.name}>
            <a
              onClick={this.handleClick.bind(this, tag.fields.name)}
            >
              <div className="tag">
                {tag.fields.name}
              </div>
            </a>
          </div>
      );
    });
  }

  render() {
    return (
      <Col xs={12}>
        <div className="tag-group">
          Tags:
          <br />
          {this.renderTags()}
        </div>
      </Col>
    );
  }

}

module.exports = TagGroup;
