import React from 'react';
import { Grid, Col } from 'react-bootstrap';

class App extends React.Component {

  render() {
    return (
      <Grid id="appRoot" fluid>
        <div id="main">
          {this.props.children}
        </div>
      </Grid>
    );
  }
}

module.exports = App;
