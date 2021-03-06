import React from 'react';
import { Row, Panel, Col, FormGroup, FormControl, Button } from 'react-bootstrap';
import reactDOM from 'react-dom';

class Contact extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      submitMsg: '',
    };
  }

  getCookie(name) {
    const value = '; ' + document.cookie;
    const parts = value.split('; ' + name + '=');
    if (parts.length === 2) return parts.pop().split(';').shift();
    else return;
  }

  clearForm() {
    reactDOM.findDOMNode(this.refs.name).value = '';
    reactDOM.findDOMNode(this.refs.email).value = '';
    reactDOM.findDOMNode(this.refs.phnum).value = '';
    reactDOM.findDOMNode(this.refs.msg).value = '';
  }

  submitForm() {
    const sendReq = $.ajax({
      method: 'POST',
      url: '/contact/send',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: {
        name: reactDOM.findDOMNode(this.refs.name).value,
        email: reactDOM.findDOMNode(this.refs.email).value,
        phnum: reactDOM.findDOMNode(this.refs.phnum).value,
        msg: reactDOM.findDOMNode(this.refs.msg).value,
        csrfmiddlewaretoken: this.getCookie('csrftoken'),
      },
    });
    this.clearForm();
    if (sendReq.statusCode === 200) {
      this.setState({ submitMsg: 'Message Sent' });
    } else if (sendReq.statusCode === 503) {
      this.setState({ submitMsg: 'Mail server too busy. Try again later.' });
    } else {
      this.setState({ submitMsg: 'An unknown error has occured' });
    }
  }

  render() {
    return (
      <div className="contactme">
        <Col xs={10} xsOffset={1}>
          <Panel>
            <form name="sentMessage" id="contactForm" noValidate>
              <Row className="control-group">
                <FormGroup xs={12} className="floating-label-form-group controls">
                  <label>Name</label>
                  <FormControl ref="name" type="text" placeholder="Name" id="name" required data-validation-required-message="Please enter your name." />
                  <p className="help-block text-danger"></p>
                </FormGroup>
              </Row>
              <Row className="control-group">
                <FormGroup xs={12} className="floating-label-form-group controls">
                  <label>Email Address</label>
                  <FormControl ref="email" type="email" placeholder="Email Address" id="email" required data-validation-required-message="Please enter your email address." />
                  <p className="help-block text-danger"></p>
                </FormGroup>
              </Row>
              <Row className="control-group">
                <FormGroup xs={12} className="floating-label-form-group controls">
                  <label>Phone Number</label>
                  <FormControl ref="phnum" type="tel" placeholder="Phone Number" id="phone" required data-validation-required-message="Please enter your phone number." />
                  <p className="help-block text-danger"></p>
                </FormGroup>
              </Row>
              <Row className="control-group">
                <FormGroup xs={12} className="floating-label-form-group controls">
                  <label>Message</label>
                  <FormControl ref="msg" rows="5" placeholder="Message" id="message" required data-validation-required-message="Please enter a message."></FormControl>
                  <p className="help-block text-danger"></p>
                </FormGroup>
              </Row>
              <br />
              <div id="success"></div>
              <Row>
                <FormGroup xs={12}>
                  <Button onClick={this.submitForm.bind(this)}>Send</Button>
                </FormGroup>
              </Row>
            </form>
          </Panel>
        </Col>
      </div>
    );
  }

}

module.exports = Contact;
