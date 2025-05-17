import React from 'react';
import startNow from '../assets/img/start-now.png';
import { Button } from 'react-bootstrap';

const Mulai = () => {
    return (
        <section id="mulai" className="py-5" style={{backgroundColor: "#D1F8EF"}}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
                        <img src={startNow} alt="Start Now" style={{
                            maxWidth: '100%',
                            height: 'auto',
                            maxHeight: '400px'
                        }} />
                    </div>
                    <div className="col-12 col-md-6 text-center text-md-start">
                        <h3 style={{
                            color: "#3674B5", 
                            fontWeight: 700,
                            fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                            marginBottom: '1.5rem'
                        }}>
                            Mulai Diagnosa Skizofrenia dengan Sinyal <span className='fst-italic'>
                            Electroencephalography </span> (EEG)
                        </h3>
                        <Button
                            variant="primary"
                            className="rounded-pill px-5 py-2"
                            style={{ 
                                fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)', 
                                fontWeight: 600, 
                                backgroundColor: "#3674B5", 
                                border: "none"
                            }}
                            href='/detection'
                        >
                            Diagnosa Sekarang
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Mulai;