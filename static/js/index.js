import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router, Route, IndexRoute } from 'react-router';
import App from './components/App.js';
import Home from './components/Home.js';
import Blog from './components/Blog.js';
import BlogDetail from './components/BlogDetail.js';
import Contact from './components/Contact.js';


render((
  <Router history={browserHistory}>
    <Route path="/" component={App} >
      <IndexRoute component={Home} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:urlstr" component={BlogDetail} />
      <Route path="/contact" component={Contact} />
    </Route>

    <Route path="/about" />

  </Router>
), document.getElementById('app'));
