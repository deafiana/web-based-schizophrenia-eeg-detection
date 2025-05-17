import React from 'react';
import dokterIcon from '../assets/img/dokter.png';

const About = () => {
  return (
    <section id="about" className="py-5" style={{backgroundColor: "#eaf7eb"}}>
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-8 mb-4 mb-md-0">
                    <h1 style={{
                        color: "#3674B5", 
                        fontWeight: 700,
                        fontSize: 'clamp(1.5rem, 3vw, 2rem)'
                    }}>
                    Tentang Kami
                    </h1>
                    <br></br>
                    <p style={{fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'}}>
                    Website ini dikembangkan sebagai bagian dari penelitian skripsi Dea Luthfina Azzahra untuk memenuhi syarat kelulusan akademiknya.</p> 

                    <p style={{fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'}}>Proyek ini merupakan hasil kolaborasi antara <span style={{color: "#3674B5", fontWeight:700}}>PNJ</span> dan <span style={{color: "#3674B5", fontWeight:700}}>IMERI UI</span>, dengan dukungan penuh dari para ahli di berbagai bidang. Ibu <span style={{color: "#3674B5", fontWeight:700}}>Mera Kartika Delimayanti, Ph.D.</span>, memberikan bimbingan dalam aspek teknik, sementara <span style={{color: "#3674B5", fontWeight:700}}>Dr. dr. Khamelia Malik, Sp.KJ</span> berkontribusi dalam bidang psikiatri. Selain itu, Ibu <span style={{color: "#3674B5", fontWeight:700}}>Hazrina Fauhan</span> berperan penting dalam menjembatani kerja sama yang memungkinkan proyek ini terwujud.</p>

                    <p style={{fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'}}>Kombinasi keahlian dari berbagai disiplin ilmu ini menjadi fondasi utama dalam pengembangan website <span style={{color: "#3674B5", fontWeight:700}}>Sistem Diagnosa Skizofrenia Melalui Sinyal Electroencephalography (EEG) Menggunakan Deep Learning</span>, yang bertujuan untuk menghadirkan solusi inovatif dalam dunia medis.
                    </p>
                </div>
                <div className="col-12 col-md-4 text-center">
                    <img src={dokterIcon} alt="Dokter" style={{
                        width: "100%", 
                        height: "auto", 
                        maxWidth: "500px", 
                        objectFit: "contain"
                    }} />
                </div>
            </div>
        </div>
    </section>
  );
};

export default About;
