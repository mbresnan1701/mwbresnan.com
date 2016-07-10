import React from 'react';
import { Col, Row } from 'react-bootstrap';

class BlogTags extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      tags: [],
      tagslist: [],
    };
  }
  componentWillMount() {
    const getAll = $.ajax({
      method: 'GET',
      url: '/blog/api/allposts',
    })
    .done(() => {
      this.setState({
        posts: JSON.parse(getAll.responseText).posts,
        tags: JSON.parse(getAll.responseText).tags,
      });
      this.buildTagsObj();
    });
  }

  buildTagsObj() {
    let newTagObj = {};
    for (let indvTagObj in this.state.tags) {
      for (let i = 0; i < this.state.tags[indvTagObj].length; i++) {
        if (newTagObj[this.state.tags[indvTagObj][i].fields.name]) {
          newTagObj[this.state.tags[indvTagObj][i].fields.name] += 1;
        } else {
          newTagObj[this.state.tags[indvTagObj][i].fields.name] = 1;
        }
      }
    }
    let tagList = [];
    for (let tagItem in newTagObj) {
      tagList.push({ item: tagItem, cnt: newTagObj[tagItem] });
    }
    tagList = tagList.sort((a, b) => {
      let nameA = a.item.toUpperCase(); // ignore upper and lowercase
      let nameB = b.item.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    });

    this.setState({
      tagslist: tagList,
    });
  }

  renderTags() {
    return this.state.tagslist.map((tag) => {
      return (
        <div key={tag.item}>
          <a href="#">
            {tag.item} ({tag.cnt})
          </a>
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
