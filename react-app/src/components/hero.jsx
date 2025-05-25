import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import icon from "../assets/img/icon.png"

function HeroSection() {
    return (
    <section
      className="w-100 d-flex align-items-center justify-content-center container-fluid"
      style={{
        background: 'linear-gradient(to bottom, white, #F3F7F9)',
        width: '100%',
        minHeight: 'calc(100vh - 150px)',
        padding: '2rem 1rem'
      }}
    >
      <Row className="container">
        <Col xs={12} md={7} className="order-2 order-md-1 my-auto">
          <h1 className="fw-bold" style={{
            fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
          }}>
            <span style={{color: "#3674B5"}}>Scak Otak:</span> Diagnosa Skizofrenia Melalui Sinyal {' '}
            <span className="fst-italic" style={{color: "#3674B5"}}>Electroencephalography</span>{' '}
            <span className="fst-italic" style={{color: "#3674B5"}}>(EEG)</span> Menggunakan{' '}
            <span className="fst-italic" style={{color: "#3674B5"}}>Deep Learning</span>
          </h1>
          <p className="text-muted mt-4" style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
          }}>
            Dengan <span className="fst-italic">deep learning</span>, diagnosa skizofrenia lebih
            mudah dan <br/> efisien melalui rekaman sinyal EEG pasien.
          </p>
          <div className="mt-2" style={{
          }}>
            <Button
              variant="primary"
              className="rounded-pill px-5 py-2"
              style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', fontWeight: 600, backgroundColor: "#3674B5", border: "none"}}
              href='/#background'
            >
              Mulai
            </Button>
          </div>
        </Col>
        <Col xs={12} md={5} className="order-1 order-md-2 d-flex my-auto justify-content-center">
          <img
            src={icon}
            alt="Illustration of a woman sitting hugging her knees with shadow faces around her representing schizophrenia"
            className="img-fluid"
            style={{
              maxWidth: '100%',
              height: 'auto',
              maxHeight: '450px'
            }}
          />
        </Col>
      </Row>
    </section>
  );
};

export default HeroSection;