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
      <Container className="cover">
        <div className="title">
          <h2>
            Sistem Diagnosa Skizofrenia Melalui Sinyal 
            <span>
            Electroencephalography (EEG)
            </span> 
            Menggunakan 
            <span>
            Deep Learning
            </span>
          </h2>
          <h5>
            Dengan deep learning, diagnosa skizofrenia lebih mudah dan efisien melalui rekaman sinyal EEG pasien.
          </h5>
          <div>
            <button>Mulai</button>
          </div>
        </div>
        <div className="logo">
          <img src={icon} width="600" height="600" alt="Logo"/>
        </div>
      </Container>
    </div>
  )
}

export default App
