import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa'; // Use FaUser for user icon

function Navbarcomponent() {

  return (
    <>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">
            Cloths Management System
          </Navbar.Brand>
          <Nav.Link href="#dashboard" className="text-white">
            &gt; Dashboard
          </Nav.Link>
          <Nav className="ms-auto">
            <Nav.Link href="#refresh" className="text-white">
              <FaUser />
            </Nav.Link>
          </Nav>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>
    </>
  );
}

export default Navbarcomponent;
