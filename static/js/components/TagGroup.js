import React from 'react';
import { Row, Col } from 'react-bootstrap';

class TagGroup extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderTags() {
    return this.props.tags.map((tag) => {
      return (
        <div key={tag.pk}>
          <a href="#">
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
