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
    // const getAll = $.ajax({
    //   method: 'GET',
    //   url: '/blog/api/allposts',
    // })
    // .done(() => {
    //   this.setState({
    //     posts: JSON.parse(getAll.responseText).posts,
    //     tags: JSON.parse(getAll.responseText).tags,
    //   });
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
    console.log('BTO')
    console.log(this.props.tags)
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
    console.log(tagList)
    return tagList;
  }
            // onClick={this.props.tagview(tag.item)}

  renderTags() {
    return this.state.tagslist.map((tag) => {
      return (
        <div key={tag.item}>
          <Button
            bsStyle="link"
            className="tag-date-list-item"
          >
            {tag.item} ({tag.cnt})
          </Button>
        </div>
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
        <div>loading...</div>
      );
    }
  }

}

module.exports = BlogTags;
