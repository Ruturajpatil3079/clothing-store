import React, { useState } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import inventorymanagement from '../assets/inventory-management.png'

function Navbarcomponent() {

  return (
    <>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark">
        <Container>
          <img style={{width:'40px'}} src={inventorymanagement} alt="system-logo" />
          <Navbar.Brand className='navbrand' href="#home">
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
