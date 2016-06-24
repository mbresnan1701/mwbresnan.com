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

  submitComment() {
    console.log('2 + 2 = 5 for sufficiently large values of \'2\'');
    // const sendReq = $.ajax({
    //   method: 'POST',
    //   url: 'URL HERE',
    //   contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    //   data: {
    //     msg: reactDOM.findDOMNode(this.refs.msg).value,
    //     csrfmiddlewaretoken: $('[name="csrfmiddlewaretoken"]')[0].value,
    //   },
    // });
    reactDOM.findDOMNode(this.refs.name).value = '';
    reactDOM.findDOMNode(this.refs.commentbox).value = '';
  }

  render() {
    return (
      <div className="add-comment">
        <div className="new-comment-text">Add comment</div>
        <form>
          <FormGroup controlId="formControlsText">
            <ControlLabel>Name</ControlLabel>
            <FormControl ref="name" type="text" placeholder="Enter your name: " />
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Text</ControlLabel>
            <FormControl ref="commentbox" componentClass="textarea" placeholder="Write comment here" />
          </FormGroup>
          <Button onClick={this.submitComment.bind(this)}>Submit</Button>
        </form>
      </div>
    );
  }

}

module.exports = AddComment;
