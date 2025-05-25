import React from 'react';
import { Button } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="text-white pt-4 mt-auto">
      <div className="container">
        <div className="row align-items-start">
          {/* About Section */}
          <div className="col-12 col-md-8 mb-md-0 text-center text-md-start">
            <h5 className="text-center text-md-start" style={{
              fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
              fontWeight: 600,
              lineHeight: 1.4
            }}>
              ScanOtak: Diagnosa Skizofrenia Melalui Sinyal <br className="d-none d-md-block" />
              <span className='fst-italic'>Electroencephalography</span> (EEG) Menggunakan<br className="d-none d-md-block" />
              <span className='fst-italic'> Deep Learning</span>
            </h5>
            <Button
              variant="primary"
              className="btn-sec rounded-pill px-4 py-2 mt-3 mt-md-4 mx-auto d-block d-md-inline"
              style={{ 
                fontSize: 'clamp(0.9rem, 1.5vw, 1rem)', 
                fontWeight: 600, 
                backgroundColor: "#D1F8EF", 
                color:"#3674B5",
              }}
              href="/detection"
            >
              Mulai Diagnosa
            </Button>
          </div>

          {/* Quick Links */}
          <div className="col-12 col-md-4 text-md-start mt-4 mt-md-0 text-center text-md-start mx-auto">
            <h5 style={{
              fontSize: "clamp(1.1rem, 2vw, 1.25rem)",
              fontWeight: 600,
            }}>Quick Menu</h5>
            <ul className="list-unstyled">
              <li className="mb-1"><a href="/" className="text-white text-decoration-underline">Beranda</a></li>
              <li className="mb-1"><a href="#background" className="text-white text-decoration-underline">Latar Belakang</a></li>
              <li className="mb-1"><a href="#features" className="text-white text-decoration-underline">Fitur</a></li>
              <li className="mb-1"><a href="#about" className="text-white text-decoration-underline">Tentang Kami</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center mt-3 w-100" style={{backgroundColor: "#578FCA"}}>
        <p className="mb-0 py-2" style={{
          fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
        }}>
          &copy; {new Date().getFullYear()} ScanOtak. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
