import React from 'react';
import { Col, Row } from 'react-bootstrap';

class DateRanges extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dates: [],
    };
  }
  componentWillMount() {
    const getDates = $.ajax({
      method: 'GET',
      url: '/blog/api/archive/dates',
    })
    .done(() => {
      this.setState({
        dates: JSON.parse(getDates.responseText),
      });
      console.log(this.state);
    });
  }

  renderDates() {
    return this.state.dates.map((date) => {
      return (
        <div key={date}>
          <a href="#">
            {date.datestr} ({date.count})
          </a>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        {this.renderDates()}
      </div>
    );
  }
}

module.exports = DateRanges;
