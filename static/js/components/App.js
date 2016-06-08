import React from 'react'
import { Grid } from 'react-bootstrap';

class App extends React.Component {

  render() {
    return (
      <Grid>
        <div id="main">
          {this.props.children}
        </div>
      </Grid>
    );
  }
}

module.exports = App;