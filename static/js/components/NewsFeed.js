import React from 'react';
import { Panel, Col, Row } from 'react-bootstrap';
import NewsEntry from './NewsEntry.js';

const numEntries = 5;

class NewsFeed extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      stories: null,
    };
  }

  componentWillMount() {
    const getTop = $.ajax({
      method: 'GET',
      url: 'https://hacker-news.firebaseio.com/v0/topstories.json',
    })
    .done(() => {
      const topIds = JSON.parse(getTop.responseText).slice(0, numEntries);
      const loadedStories = [];
      for (let i = 0; i < topIds.length; i++) {
        const getStory = $.ajax({
          method: 'GET',
          url: 'https://hacker-news.firebaseio.com/v0/item/' + topIds[i] + '.json',
        })
        .done(() => {
          loadedStories.push(JSON.parse(getStory.responseText));
        });
      }
      const check = setInterval(() => {
        if (this.checkAllStoriesLoaded(loadedStories)) {
          this.setState({
            stories: loadedStories,
          });
          clearInterval(check);
        }
      }, 10);
    });
  }

  checkAllStoriesLoaded(arr) {
    return arr.length === numEntries;
  }

  renderStories() {
    return this.state.stories.map((story) => {
      return (
        <NewsEntry key={story.id} story={story} />
      );
    });
  }

  render() {
    if (this.state.stories) {
      return (
        <Col xs={10} xsOffset={1} className="newsfeed">
          <Panel header={"From The Web"}>
            {this.renderStories()}
            <div>
              Items courtesy of HackerNews
            </div>
          </Panel>
        </Col>
      );
    } else {
      return (
        <div>LOADING GIF HERE</div>
      );
    }
  }
}

module.exports = NewsFeed;
