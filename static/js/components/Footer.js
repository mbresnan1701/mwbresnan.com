import React from 'react';
import { Col, Row } from 'react-bootstrap';

class Footer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Col xs={12} className="footer">
        <Row>
          <Col md={10} mdOffset={1} lg={8} lgOffset={2}>
            <ul className="list-inline text-center">
              <li>
                <a href="https://www.github.com/mbresnan1701">
                  <span className="fa-stack fa-lg">
                    <i className="fa fa-circle fa-stack-2x "></i>
                    <i className="fa fa-github fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/mwbresnan">
                  <span className="fa-stack fa-lg">
                    <i className="fa fa-circle fa-stack-2x "></i>
                    <i className="fa fa-linkedin fa-stack-1x fa-inverse "></i>
                  </span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span className="fa-stack fa-lg">
                    <i className="fa fa-circle fa-stack-2x "></i>
                    <i className="fa fa-twitter fa-stack-1x fa-inverse"></i>
                  </span>
                </a>
              </li>
            </ul>
            <p className="copyright text-muted">Copyright &copy; mwbresnan.com 2016</p>
          </Col>
        </Row>
      </Col>

    );
  }

}

module.exports = Footer;
