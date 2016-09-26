import React from 'react';
import { Grid, Col } from 'react-bootstrap';
import { NavBar } from './NavBar.js';
import { Footer } from './Footer.js';

class App extends React.Component {

  render() {

    return (
      <Grid id="appRoot" fluid>
        <NavBar />
        <Col xs={12} id="main">
          {this.props.children}
        </Col>
        <Footer />
      </Grid>
    );
  }
}

module.exports = App;
