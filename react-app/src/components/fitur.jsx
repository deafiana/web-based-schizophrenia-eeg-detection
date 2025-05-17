import React from 'react';
import brainwaveIcon from '../assets/img/brainwave.png';
import timeIcon from '../assets/img/time.png';
import freeIcon from '../assets/img/free.png';
import lockIcon from '../assets/img/lock.png';

const Fitur = () => {
  return (
    <section id="features" className="py-5" style={{backgroundColor: "#F3F7F9"}}>
      <div className="container">
        <h2 className="mb-4" style={{
          color: "#3674B5", 
          fontWeight: 700,
          fontSize: 'clamp(1.5rem, 3vw, 2rem)',
        }}>
          Diagnosa Skizofrenia lebih cepat<br className="d-none d-md-block"></br>
          menggunakan <span style={{
            backgroundColor:"#3674B5", 
            color:"white", 
            borderRadius:"5px", 
            padding:"2px 5px", 
            display:"inline-block", 
            lineHeight:"1.2"
          }}>Deep Learning.</span>
        </h2>
        <p style={{
          fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
          margin: '0 auto 2rem'
        }}>
          Deep learning merevolusi analisis medis dengan mengekstrak fitur kompleks dan mengenali pola rumit. Algoritma ini ideal untuk analisis data multidimensional dan sequence, termasuk sinyal EEG.
        </p>
        <div className="row row-cols-1 row-cols-md-2 g-4">
            <div className="col">
              <div className="d-flex align-items-center mb-4">
                <div className="rounded-circle d-flex align-items-center justify-content-center" style={{
                  width: "clamp(80px, 10vw, 100px)", 
                  height: "clamp(80px, 10vw, 100px)", 
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)", 
                  backgroundColor: "#D1F8EF", 
                  aspectRatio: "1/1",
                  flexShrink: 0
                }}>
                  <img src={freeIcon} alt="Free" style={{
                    width: "clamp(40px, 5vw, 50px)", 
                    height: "clamp(40px, 5vw, 50px)", 
                    objectFit: "contain"
                  }} />
                </div>
                <div className="ms-3">
                  <h5 className="mb-1" style={{
                    color: "#3674B5", 
                    fontWeight: 700,
                    fontSize: 'clamp(1rem, 1.5vw, 1.25rem)'
                  }}>Gratis</h5>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex align-items-center mb-4">
                <div className="rounded-circle d-flex align-items-center justify-content-center" style={{
                  width: "clamp(80px, 10vw, 100px)", 
                  height: "clamp(80px, 10vw, 100px)", 
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)", 
                  backgroundColor: "#D1F8EF", 
                  aspectRatio: "1/1",
                  flexShrink: 0
                }}>
                  <img src={timeIcon} alt="Time" style={{
                    width: "clamp(40px, 5vw, 50px)", 
                    height: "clamp(40px, 5vw, 50px)", 
                    objectFit: "contain"
                  }} />
                </div>
                <div className="ms-3">
                  <h5 className="mb-1" style={{
                    color: "#3674B5", 
                    fontWeight: 700,
                    fontSize: 'clamp(1rem, 1.5vw, 1.25rem)'
                  }}>Memberikan hasil diagnosa awal skizofrenia dalam 5 menit</h5>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex align-items-center mb-4">
                <div className="rounded-circle d-flex align-items-center justify-content-center" style={{
                  width: "clamp(80px, 10vw, 100px)", 
                  height: "clamp(80px, 10vw, 100px)", 
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)", 
                  backgroundColor: "#D1F8EF", 
                  aspectRatio: "1/1",
                  flexShrink: 0
                }}>
                  <img src={brainwaveIcon} alt="Brainwave" style={{
                    width: "clamp(40px, 5vw, 50px)", 
                    height: "clamp(40px, 5vw, 50px)", 
                    objectFit: "contain"
                  }} />
                </div>
                <div className="ms-3">
                  <h5 className="mb-1" style={{
                    color: "#3674B5", 
                    fontWeight: 700,
                    fontSize: 'clamp(1rem, 1.5vw, 1.25rem)'
                  }}>Hanya menggunakan sinyal EEG</h5>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="d-flex align-items-center mb-4">
                <div className="rounded-circle d-flex align-items-center justify-content-center" style={{
                  width: "clamp(80px, 10vw, 100px)", 
                  height: "clamp(80px, 10vw, 100px)", 
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)", 
                  backgroundColor: "#D1F8EF", 
                  aspectRatio: "1/1",
                  flexShrink: 0
                }}>
                  <img src={lockIcon} alt="Lock" style={{
                    width: "clamp(40px, 5vw, 50px)", 
                    height: "clamp(40px, 5vw, 50px)", 
                    objectFit: "contain"
                  }} />
                </div>
                <div className="ms-3">
                  <h5 className="mb-1" style={{
                    color: "#3674B5", 
                    fontWeight: 700,
                    fontSize: 'clamp(1rem, 1.5vw, 1.25rem)'
                  }}>Pribadi dan Rahasia</h5>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Fitur;

