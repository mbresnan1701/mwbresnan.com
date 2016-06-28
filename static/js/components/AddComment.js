import React from 'react';
import reactDOM from 'react-dom';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

class AddComment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      lastCommentTime: null,
    };
  }

  getCookie(name) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) return parts.pop().split(';').shift();
    else return;
  }

  submitComment() {
    const sendReq = $.ajax({
      method: 'POST',
      url: 'api/comments/add/',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: {
        name: reactDOM.findDOMNode(this.refs.name).value || 'Anonymous',
        text: reactDOM.findDOMNode(this.refs.commenttext).value,
        csrfmiddlewaretoken: this.getCookie('csrftoken'),
      },
    })
    .then(() => {
      reactDOM.findDOMNode(this.refs.name).value = '';
      reactDOM.findDOMNode(this.refs.commenttext).value = '';
      this.props.refcom();
    });
  }

  render() {
    return (
      <div className="add-comment">
        <h4 className="post-title">Post a Comment</h4>
        <form>
          <FormGroup controlId="formControlsText">
            <ControlLabel>Name</ControlLabel>
            <FormControl ref="name" type="text" placeholder="Enter your name: " />
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Text</ControlLabel>
            <FormControl ref="commenttext" componentClass="textarea" placeholder="Write comment here" />
          </FormGroup>
          <Button onClick={this.submitComment.bind(this)}>Submit</Button>
        </form>
      </div>
    );
  }

}

module.exports = AddComment;
