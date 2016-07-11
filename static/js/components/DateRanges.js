import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

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
    });
  }

  renderDates() {
    return this.state.dates.map((date) => {
      if (date.count > 0) {
        return (
          <div key={date.datestr}>
            <Button bsStyle="link" className="tag-date-list-item" >
              {date.datestr} ({date.count})
            </Button>
          </div>
        );
      }
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
