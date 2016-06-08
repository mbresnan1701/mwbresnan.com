import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link, IndexRoute, transition } from 'react-router'
import App from './components/App.js'
import Home from './components/Home.js'

      // <Route path='/blog' component={Blog} />

render((
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={Home} />
    </Route>

  </Router>
), document.getElementById('app'));