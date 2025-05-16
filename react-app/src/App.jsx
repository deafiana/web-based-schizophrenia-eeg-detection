import React, { useState } from "react"
import "./assets/styles.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { Navbar, Nav, Container, Button } from "react-bootstrap"
import logo from "./assets/img/logo.png"
import icon from "./assets/img/icon.png"

function App() {
  return(
    <div className="app">
      <Navbar expand="lg" fixed="top" className='custom-navbar'>
        <Container>
          <Navbar.Brand href="#">
            <img src={logo} width="65" height="65" alt="Logo"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="ms-auto">
              <Nav.Link href="#">Beranda</Nav.Link>
              <Nav.Link href="#">Latar Belakang</Nav.Link>
              <Nav.Link href="#">Fitur</Nav.Link>
              <Nav.Link href="#">Tentang Kami</Nav.Link>
              <Button className="custom-button">Mulai Diagnosa</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container className="form">

      </Container>
    </div>
  )
}

export default App
