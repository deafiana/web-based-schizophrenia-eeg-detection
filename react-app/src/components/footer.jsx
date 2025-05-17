import React from 'react';
import { Button } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="text-white pt-4 mt-auto">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-12 col-md-9 mb-4 mb-md-0">
            <h5 style={{
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              
              textAlign: 'left'
            }}>
              Sistem Diagnosa Skizofrenia Melalui Sinyal <br className="d-none d-md-block" />
              <span className='fst-italic'>Electroencephalography</span> (EEG) Menggunakan<br className="d-none d-md-block" />
              <span className='fst-italic'> Deep Learning</span>
            </h5>
            <Button
              variant="primary"
              className="btn-sec rounded-pill px-4 py-2 mt-3"
              style={{ 
                fontSize: 'clamp(0.9rem, 1.5vw, 1rem)', 
                fontWeight: 600, 
                backgroundColor: "#D1F8EF", 
                color:"#3674B5" 
              }}
              href="/detection"
            >
              Mulai Diagnosa
            </Button>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-3 text-center text-md-start">
            <h5 style={{
              fontSize: "clamp(1.1rem, 2vw, 1.25rem)",
              marginBottom: '1rem'
            }}>Quick Menu</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><a href="/" className="text-white text-decoration-underline">Beranda</a></li>
              <li className="mb-2"><a href="#background" className="text-white text-decoration-underline">Latar Belakang</a></li>
              <li className="mb-2"><a href="#features" className="text-white text-decoration-underline">Fitur</a></li>
              <li className="mb-2"><a href="#about" className="text-white text-decoration-underline">Tentang Kami</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center mt-3 w-100" style={{backgroundColor: "#578FCA"}}>
        <p className="mb-0 py-2 fst-italic" style={{
          fontWeight: "bold",
          fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
        }}>
          Dea Luthfina Azzahra, {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
