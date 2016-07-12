import React from 'react';
import { Row, Col } from 'react-bootstrap';

class NewsEntry extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log(this.props)
    return (
      <div>
        {this.props.story.title}
      </div>
    );
  }

}

module.exports = NewsEntry;
