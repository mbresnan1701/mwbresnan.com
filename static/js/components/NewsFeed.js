import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

class NewsFeed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stories: [],
    };
  }

  componentWillMount() {
    const getTop = $.ajax({
      method: 'GET',
      url: 'https://hacker-news.firebaseio.com/v0/topstories.json',
    })
    .done(() => {
      const topIds = JSON.parse(getTop.responseText).slice(0, 5);
      let loadedStories = [];
      for (let i = 0; i < topIds.length; i++) {
        const getStory = $.ajax({
          method: 'GET',
          url: 'https://hacker-news.firebaseio.com/v0/item/' + topIds[i] + '.json',
        })
        .done(() => {
          loadedStories.push(JSON.parse(getStory.responseText));
        });
      }
      this.setState({
        stories: loadedStories,
      });
      console.log(this.state);
    });
  }


  // renderDates() {
  //   return this.state.dates.map((date) => {
  //     if (date.count > 0) {
  //       return (
  //         <Button
  //           onClick={this.handleClick.bind(this, date.month, date.year)}
  //           key={date.datestr}
  //           bsStyle="link"
  //           className="tag-date-list-item"
  //         >
  //           {date.datestr} ({date.count})
  //         </Button>
  //       );
  //     }
  //   });
  // }

  render() {
    return (
      <div>
      </div>
    );
  }
}

module.exports = NewsFeed;
