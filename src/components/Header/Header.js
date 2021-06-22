import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

// These are the links we want to show when we are signed in
const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#movies">Movies</Nav.Link>
    <Nav.Link href="#create-movie">Create Movie</Nav.Link>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </Fragment>
)

// These are the links we want to show when we are signed out
const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

// We will always show these links
const alwaysOptions = (
  <Fragment>
    {/* Always include a link to the home page.
      Note: these links are bootstrap links and have a different format than react rout links */}
    <Nav.Link href="#/">Home</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  // bg is the background color
  // variant - by default links ar black, crazy thing is seting it to dark makes the links light
  //            because our background is 'dark'
  // expand - when crossing the 'md' breakpoint, expand the hamburger menu into nav links
  <Navbar bg="primary" variant="dark" expand="md">
    {/* This is our navbar's title (brand).
      If it's clicked on go to the home page
     */}
    <Navbar.Brand href="#">
      Alayés Movie client 🎥
    </Navbar.Brand>
    {/* The navbar toggle is the hamburger button that switches between showing our navigation links or not */}
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    {/* The Collapse section includes our navigation links. on smaller screens you can collapse it, by clicking on the toggel component */}
    <Navbar.Collapse id="basic-navbar-nav">
      {/* A Nav  component usually constain Nav.Links inside of it.
        ml-auto: stands for margin-left: auto;
        this automatically sets the avaiable margin to the left, which pushes the links to the right side of the screen */}
      <Nav className="ml-auto">
        {/* If we have a user, render a welcome message, otherwise show nothing
          navbar-text gives the same styling as the white links
          mr-2 adds margin to the right of the message, so it isnt crammed into the links.

          This uses short circuiting:
          if user is false, no value on the right hand side of '&&' will make it return true. so just declare it false

          If user is true, then we have to evaluate the right hand side to see if this line of code is true. JSX is a truthy value. so then it will input whatever the JSX demands
            */}
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        {/* This will always show no matter what */}
        { alwaysOptions }
        {/* If we are signed in show the links for authenticatedOptions
          else show the unauthenticatedOptions */}
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
