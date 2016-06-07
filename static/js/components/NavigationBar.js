import React from 'react';
import NavLink from './NavLink';
import $ from 'jquery';
import { Navbar, Nav, NavDropdown, MenuItem, NavItem} from 'react-bootstrap';


// This is the only spot I'm using jquery. It's so the navigationbar
// dropdown hides when you click anywhere. If you can do this another way
// and get rid of jquery, the site will load much lot faster!
$(document).on('click', '.navbar-toggle', function(event) {
  $(this).parent().parent().find('.dropdown').addClass('open');
  $("#wrapper").toggleClass("toggled");

})
$(document).click(function (event) {
  var clickover = $(event.target);
  var _opened = $(".navbar-collapse").hasClass("navbar-collapse collapse in");
  if (_opened === true && !clickover.hasClass("navbar-toggle")) {
      $("button.navbar-toggle").click();
  }
});


class NavigationBar extends React.Component {

  constructor (props) {
    super (props);
    this.state = {

    };
  }


  // renderMenuItems() {
  //   return (
  //     <Nav><Navbar.Text><NavLink to="/">
  //       Blog
  //     </NavLink></Navbar.Text></Nav>
  //   )
  // }

  navbarToggleDisplay() {

      return(
        <Nav pullRight>
            <MenuItem header><a href='/'>Home</a></MenuItem>
            <MenuItem header><a href='/'>Blog</a></MenuItem>
        </Nav>
      )
  }

  // <NavLink to="/" onlyActiveOnIndex>
  //   <img className="image" src={`../assets/${logo}`} />
  // </NavLink>

  render() {
    // var logo = showInverse ? 'logo-dark.png' : 'logo.png'
    return (
      <Navbar fixedTop inverse={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <NavLink to="/" onlyActiveOnIndex>
              M.W. Bresnan
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle animation={false} />
        </Navbar.Header>
        <Navbar.Collapse>
          {this.navbarToggleDisplay()}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

module.exports = NavigationBar;
