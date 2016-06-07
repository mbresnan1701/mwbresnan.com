import React from 'react'
import NavigationBar from './NavigationBar.js'
import { Grid } from 'react-bootstrap';

class App extends React.Component {

  render() {
    return (
      <Grid>
        <NavigationBar />
        <div id="main">
          {this.props.children}
        </div>
      </Grid>
    );
  }
}

module.exports = App;