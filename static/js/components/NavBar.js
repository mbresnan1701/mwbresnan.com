import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export const NavBar = () => (
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
          <NavItem eventKey={1} href="/">Home</NavItem>
          <NavItem eventKey={2} href="/blog">Blog</NavItem>
          <NavItem eventKey={3} href="/contact">Contact</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
);
