import React from 'react';
import { Panel, Col, Row } from 'react-bootstrap';

class QuoteBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      quote: null,
    };
  }

  componentWillMount() {
    const getQuote = $.ajax({
      method: 'GET',
      url: '/blog/api/quote',
    })
    .done(() => {
      this.setState({
        quote: JSON.parse(getQuote.responseText),
      });
      console.log(this.state);
    });
  }

  render() {
    if (this.state.quote) {
      return (
        <div>
          <div className="quote-text">
            {this.state.quote[0].fields.quote}
          </div>
          <div className="quote-author">
            {this.state.quote[0].fields.author}
          </div>
        </div>
      );
    } else {
      return (
        <div>LOADING GIF HERE</div>
      );
    }
  }
}

module.exports = QuoteBox;
