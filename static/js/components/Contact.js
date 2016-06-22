import React from 'react';
import { Row, Col, FormGroup } from 'react-bootstrap';

class Blog extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    return (
      <Row>
        <Col lg={8} lgOffset={2} md={10} mdOffset={1}>

          <form name="sentMessage" id="contactForm" noValidate>
            <Row className="control-group">
              <FormGroup xs={12} className="floating-label-form-group controls">
                <label>Name</label>
                <input type="text" className="form-control" placeholder="Name" id="name" required data-validation-required-message="Please enter your name." />
                <p className="help-block text-danger"></p>
              </FormGroup>
            </Row>
            <Row className="control-group">
              <FormGroup xs={12} className="floating-label-form-group controls">
                <label>Email Address</label>
                <input type="email" className="form-control" placeholder="Email Address" id="email" required data-validation-required-message="Please enter your email address." />
                <p className="help-block text-danger"></p>
              </FormGroup>
            </Row>
            <Row className="control-group">
              <FormGroup xs={12} className="floating-label-form-group controls">
                <label>Phone Number</label>
                <input type="tel" className="form-control" placeholder="Phone Number" id="phone" required data-validation-required-message="Please enter your phone number." />
                <p className="help-block text-danger"></p>
              </FormGroup>
            </Row>
            <Row className="control-group">
              <FormGroup xs={12} className="floating-label-form-group controls">
                <label>Message</label>
                <textarea rows="5" className="form-control" placeholder="Message" id="message" required data-validation-required-message="Please enter a message."></textarea>
                <p className="help-block text-danger"></p>
              </FormGroup>
            </Row>
            <br />
            <div id="success"></div>
            <Row>
              <FormGroup xs={12}>
                <button type="submit" className="btn btn-default">Send</button>
              </FormGroup>
            </Row>
          </form>
        </Col>
      </Row>
    );
  }

}

module.exports = Blog;
