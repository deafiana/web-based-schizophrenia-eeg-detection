import { Navbar, Nav, Container, Button } from "react-bootstrap"
import icon from ""

function ANavbar(){
    return(
        <div className="app">
            <Navbar expand="lg" fixed="top" className='custom-navbar'>
                <Container>
                <Navbar.Brand href="#">
                    <img src={icon} width="65" height="65" alt="Logo"/>
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
        </div>
    )
}

export default ANavbar