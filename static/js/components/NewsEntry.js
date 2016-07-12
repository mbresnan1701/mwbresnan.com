import React from 'react';
import { Row, Col } from 'react-bootstrap';

class NewsEntry extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <a className="newslink" href={this.props.story.url}>
          {this.props.story.title}
        </a>
      </div>
    );
  }

}

module.exports = NewsEntry;
