import { Navbar, Nav, Container, Button } from "react-bootstrap"
import icon from "../assets/img/logo.png"

function Navigation(){
    return(
        <div className="app">
            <Navbar expand="lg" className='custom-navbar'>
                <Container>
                <Navbar.Brand href="/">
                    <div className="container">
                    <div className="row">
                        <div className="d-flex align-items-center">
                        <img src={icon} width="65" height="65" alt="Logo" className="me-2" />
                        <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#3674B5'}}>ScanOtak</span>
                        </div>
                    </div>
                    </div>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarNav" />
                <Navbar.Collapse id="navbarNav">
                    <Nav className="ms-auto">
                    <Nav.Link href="/">Beranda</Nav.Link>
                    <Nav.Link href="/#background">Latar Belakang</Nav.Link>
                    <Nav.Link href="/#features">Fitur</Nav.Link>
                    <Nav.Link href="/#about">Tentang Kami</Nav.Link>
                    <Button
                    variant="primary"
                    className="rounded-pill px-4 py-2"
                    style={{ fontWeight: 600, backgroundColor: "#3674B5", border: "none"}}
                    href='/detection'
                >Mulai Diagnosa</Button>
                    </Nav>
                </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Navigation