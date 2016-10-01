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
      url: '/blog/api/dates',
    })
    .done(() => {
      this.setState({
        dates: JSON.parse(getDates.responseText),
      });
    });
  }

  handleClick(month, year) {
    this.props.dateview(month, year);
  }

  renderDates() {
    return this.state.dates.map((date) => {
      if (date.count > 0) {
        return (
          <Col sm={10} smOffset={1} key={date.datestr}>
            <Button
              onClick={this.handleClick.bind(this, date.month, date.year)}
              bsStyle="link"
              className="tag-date-list-item"
            >
              {date.datestr} ({date.count})
            </Button>
          </Col>
        );
      }
    });
  }

  render() {
    return (
      <div>
        <Row>
          <Col sm={12}>
            {this.renderDates()}
          </Col>
        </Row>
      </div>
    );
  }
}

module.exports = DateRanges;
