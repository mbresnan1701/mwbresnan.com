import React from 'react';
import { Navbar,
         Nav,
         NavItem,
         NavDropdown,
         MenuItem,
         Col } from 'react-bootstrap';

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className={"navbarContainer"}>
        <Navbar className={"navbar-custom myNavBar"} fluid staticTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#">M.W. Bresnan</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <NavItem eventKey={1} href="#">Home</NavItem>
              <NavItem eventKey={2} href="#">Blog</NavItem>
              <NavItem eventKey={3} href="#">Contact</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>

    );
  }

}

module.exports = NavBar;
