import React from 'react';
import { Button, Col, Row } from 'react-bootstrap';

class BlogTags extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tagslist: [],
      gotlist: false,
    };
  }

  componentDidUpdate() {
    if (this.state.gotlist === false) {
      this.setState({
        tagslist: this.buildTagsObj(),
        gotlist: true,
      });
      this.render();
    }
  }

  buildTagsObj() {
    const newTagObj = {};
    for (let indvTagObj in this.props.tags) {
      for (let i = 0; i < this.props.tags[indvTagObj].length; i++) {
        if (newTagObj[this.props.tags[indvTagObj][i].fields.name]) {
          newTagObj[this.props.tags[indvTagObj][i].fields.name] += 1;
        } else {
          newTagObj[this.props.tags[indvTagObj][i].fields.name] = 1;
        }
      }
    }
    let tagList = [];
    for (let tagItem in newTagObj) {
      tagList.push({ item: tagItem, cnt: newTagObj[tagItem] });
    }
    tagList = tagList.sort((a, b) => {
      const nameA = a.item.toUpperCase();
      const nameB = b.item.toUpperCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    });
    return tagList;
  }

  handleClick(name) {
    this.props.tagview(name);
  }

  renderTags() {
    return this.state.tagslist.map((tag) => {
      return (
        <Button
          onClick={this.handleClick.bind(this, tag.item)}
          bsStyle="link"
          key={tag.item}
          className="tag-date-list-item"
        >
          {tag.item} ({tag.cnt})
        </Button>
      );
    });
  }

  render() {
    if(this.state.tagslist) {
      return (
        <div>
          {this.renderTags()}
        </div>
      );
    } else {
      return (
        <div>LOADING GIF HERE...</div>
      );
    }
  }

}

module.exports = BlogTags;
