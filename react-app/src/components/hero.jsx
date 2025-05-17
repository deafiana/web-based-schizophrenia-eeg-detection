import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import icon from "../assets/img/icon.png"

function HeroSection() {
    return (
    <section
      className="w-100 d-flex align-items-center justify-content-center"
      style={{
        background: 'linear-gradient(to bottom, white, #F3F7F9)',
        width: '100%',
        minHeight: 'calc(100vh - 150px)',
        padding: '2rem 1rem'
      }}
    >
      <Row className="align-items-center w-100 justify-content-center">
        <Col xs={12} md={6} className="order-2 order-md-1 mb-4 mb-md-0">
          <h1 className="fw-bold" style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            marginTop: '1rem',
            paddingRight: 'clamp(1rem, 10vw, 12rem)',
            paddingLeft: 'clamp(1rem, 10vw, 12rem)'
          }}>
            Sistem Diagnosa Skizofrenia Melalui Sinyal{' '}
            <span className="fst-italic" style={{color: "#3674B5"}}>Electroencephalography</span>{' '}
            <span className="fst-italic" style={{color: "#3674B5"}}>(EEG)</span> Menggunakan{' '}
            <span className="fst-italic" style={{color: "#3674B5"}}>Deep Learning</span>
          </h1>
          <p className="text-muted mt-4" style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            paddingRight: 'clamp(1rem, 10vw, 12rem)',
            paddingLeft: 'clamp(1rem, 10vw, 12rem)'
          }}>
            Dengan <span className="fst-italic">deep learning</span>, diagnosa skizofrenia lebih
            mudah dan efisien melalui rekaman sinyal EEG pasien.
          </p>
          <div className="mt-4" style={{
            paddingLeft: 'clamp(1rem, 10vw, 12rem)'
          }}>
            <Button
              variant="primary"
              className="rounded-pill px-5 py-2"
              style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', fontWeight: 600, backgroundColor: "#3674B5", border: "none"}}
              href='/detection'
            >
              Mulai
            </Button>
          </div>
        </Col>
        <Col xs={12} md={6} className="order-1 order-md-2 d-flex justify-content-center">
          <img
            src={icon}
            alt="Illustration of a woman sitting hugging her knees with shadow faces around her representing schizophrenia"
            className="img-fluid"
            style={{
              maxWidth: '100%',
              height: 'auto',
              maxHeight: '350px'
            }}
          />
        </Col>
      </Row>
    </section>
  );
};

export default HeroSection;