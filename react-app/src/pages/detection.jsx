import React, { useState } from "react"
import { Container, Spinner, Modal, Button } from "react-bootstrap"
import "../assets/styles.css"
import "bootstrap/dist/css/bootstrap.min.css"
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { FaQuestionCircle } from "react-icons/fa";
import Footer from '../components/footer'
import CustomFileInput from '../components/CustomFileInput';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Detection() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showChannelHelp, setShowChannelHelp] = useState(false);
  const [showDiagnosisHelp, setShowDiagnosisHelp] = useState(false);
  const [result, setResult] = useState({
    schizophrenia_percentage: null,
    healthy_percentage: null
  });
  const [chartData, setChartData] = useState({
    labels: ['Schizophrenia', 'Normal'],
    datasets: [
      {
        label: 'Prediction',
        data: [50, 50],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCloseAlert = () => setShowAlert(false);
  const handleCloseChannelHelp = () => setShowChannelHelp(false);
  const handleCloseDiagnosisHelp = () => setShowDiagnosisHelp(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    if (!file) {
      setAlertMessage("Mohon masukkan file rekaman EEG.");
      setShowAlert(true);
      return;
    }
    console.log("File selected:", file.name);

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    console.log("FormData created with file");

    try {
      const response = await fetch("https://localhost/predict", {
        method: "POST",
        body: formData,
      });
      
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log("Received result:", result);

      setChartData({
        labels: ['Schizophrenia', 'Normal'],
        datasets: [
          {
            label: 'Prediction',
            data: [result.schizophrenia_percentage, result.healthy_percentage],
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
            ],
            borderWidth: 1,
          },
        ],
      });

      setResult({
        schizophrenia_percentage: result.schizophrenia_percentage,
        healthy_percentage: result.healthy_percentage
      });
    } catch (error) {
      console.error("Error during form submission:", error);
      setAlertMessage("Terjadi kesalahan saat mengirim file. Silakan coba lagi.");
      setShowAlert(true);
    } finally {
      setLoading(false);
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      }
    },
  };

  const PieChart = () => {
    return <Pie data={chartData} options={options} />;
  };

  return(
    <div>
    <div className="detection mb-5">
      <div className="container mt-4 mt-md-5">
        <div className="row g-4">
          <div className="col-12 col-md-6">
            <Container className="form d-flex flex-column justify-content-between h-100" style={{
              padding: '1.5rem',
              borderRadius: '10px',
            }}>
              <form onSubmit={handleSubmit} className="d-flex flex-column" style={{flex: 1}}>
                <div style={{flex: 1}}>
                  <h3 className="heading-form" style={{
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                    marginBottom: '1.5rem'
                  }}>
                    Diagnosa Skizofrenia Menggunakan <span className="fst-italic">Deep Learning</span>
                    <FaQuestionCircle 
                      className="question-icon" 
                      onClick={() => setShowDiagnosisHelp(true)}
                      style={{ cursor: 'pointer' }}
                    />
                  </h3>

                  <label className="label-form" style={{
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                    marginBottom: '0.5rem'
                  }}>
                    Nama Pasien
                  </label>
                  <input 
                    className="input-form" 
                    type="text" 
                    placeholder="Masukkan nama pasien" 
                    name='name'
                    disabled={loading}
                    style={{
                      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                      padding: '0.75rem',
                      marginBottom: '1rem'
                    }}
                  />

                  <label className="label-form" style={{
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                    marginBottom: '0.5rem'
                  }}>
                    Jumlah Channel (lihat pada panduan penggunaan)
                    <FaQuestionCircle 
                      className="question-icon" 
                      onClick={() => setShowChannelHelp(true)}
                      style={{ cursor: 'pointer' }}
                    />
                  </label>
                  <div className="radio-group" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    marginBottom: '1rem'
                  }}>
                    <label className="radio-label" style={{
                      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                    }}>
                      <input 
                        type="radio" 
                        name='channels' 
                        value="32"
                        disabled={loading}
                        style={{
                          width: '18px',
                          height: '18px',
                          marginRight: '0.5rem'
                        }}
                      />
                      <span>32 Channels</span>
                      <span className="channel-desc" style={{
                        fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)',
                        color: '#666',
                        marginLeft: '0.5rem'
                      }}>(dengan PG1 & PG2)</span>
                    </label>
                    <label className="radio-label" style={{
                      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                    }}>
                      <input 
                        type="radio" 
                        name='channels' 
                        value="25"
                        disabled={loading}
                        style={{
                          width: '18px',
                          height: '18px',
                          marginRight: '0.5rem'
                        }}
                      />
                      <span>25 Channels</span>
                      <span className="channel-desc" style={{
                        fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)',
                        color: '#666',
                        marginLeft: '0.5rem'
                      }}>(dengan ECG)</span>
                    </label>
                  </div>

                  <label className="label-form" style={{
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                    marginBottom: '0.5rem'
                  }}>
                    Input File Hasil Rekaman EEG Pasien
                  </label>
                  <CustomFileInput onFileChange={setFile} disabled={loading} />

                  <label className="label-form" style={{
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                    marginBottom: '0.5rem',
                    marginTop: '1rem'
                  }}>
                    Waktu diagnosa
                  </label>
                  <input
                    className="input-form input-date"
                    type="date"
                    name="diagnosa-date"
                    placeholder="dd/mm/yyyy"
                    style={{ 
                      width: '100%',
                      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                      padding: '0.75rem'
                    }}
                    disabled={loading}
                  />
                </div>
                <button 
                  className="btn-diagnosa mt-4" 
                  style={{
                    width: '100%',
                    maxWidth: '200px',
                    alignSelf: 'center',
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                    padding: '0.75rem 1.5rem'
                  }} 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Memproses...' : 'Diagnosa'}
                </button>
              </form>
            </Container>
          </div>

          <div className="col-12 col-md-6">
            <Container className="result d-flex flex-column justify-content-center h-100" style={{
              padding: '1.5rem',
              borderRadius: '10px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h5 className="text-center fw-bold mb-4" style={{ 
                color: '#3674B5',
                fontSize: 'clamp(1.1rem, 2vw, 1.25rem)'
              }}>Hasil Klasifikasi</h5>
              {loading ? (
                <div className="d-flex flex-column align-items-center justify-content-center" style={{ 
                  height: 'clamp(300px, 50vw, 400px)'
                }}>
                  <Spinner animation="border" role="status" variant="primary" style={{ 
                    width: 'clamp(2rem, 4vw, 3rem)', 
                    height: 'clamp(2rem, 4vw, 3rem)' 
                  }}>
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  <p className="mt-3 text-center" style={{ 
                    color: '#3674B5',
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                  }}>Memproses data EEG...</p>
                </div>
              ) : (
                <>
                  <div style={{ 
                    width: '100%', 
                    height: 'clamp(300px, 50vw, 400px)', 
                    margin: '0 auto', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <PieChart />
                  </div>
                  <div className="row mt-4 mb-3 mx-2">
                    <div className="col">
                      <h6 className='text-center fw-bold' style={{ 
                        color: '#3674B5',
                        fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                      }}>
                        Schizophrenia: {result.schizophrenia_percentage ? `${result.schizophrenia_percentage}%` : 'N/A'}
                      </h6>
                    </div>
                    <div className="col">
                      <h6 className='text-center fw-bold' style={{ 
                        color: '#3674B5',
                        fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                      }}>
                        Normal: {result.healthy_percentage ? `${result.healthy_percentage}%` : 'N/A'}
                      </h6>
                    </div>
                  </div>
                </>
              )}
              <p className='disclaimer mx-2 mt-3' style={{
                fontSize: 'clamp(0.8rem, 1.2vw, 0.9rem)',
                textAlign: 'center'
              }}>
                Hasil ini merupakan analisis awal berbasis EEG dan deep learning. 
                Silakan lakukan evaluasi klinis lebih lanjut dan konsultasikan dengan tim medis sebelum menetapkan 
                diagnosis akhir.
              </p>
            </Container>
          </div>
        </div>
      </div>
    </div>
    <Footer />

    <Modal show={showAlert} onHide={handleCloseAlert} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.25rem)'
        }}>PERINGATAN</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{
        fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
      }}>
        {alertMessage}
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="primary" 
          onClick={handleCloseAlert}
          style={{
            fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
            padding: '0.5rem 1.5rem'
          }}
        >
          OK
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={showChannelHelp} onHide={handleCloseChannelHelp} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.25rem)'
        }}>PANDUAN JUMLAH CHANNEL</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{
        fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
      }}>
        <p>Pilih jumlah channel sesuai dengan jenis rekaman EEG yang digunakan:</p>
        <ul>
          <li><strong>32 Channels:</strong> Digunakan untuk </li>
          <li><strong>25 Channels:</strong> Digunakan untuk </li>
        </ul>
        <p>Pastikan memilih jumlah channel yang sesuai dengan file yang akan diunggah.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="primary" 
          onClick={handleCloseChannelHelp}
          style={{
            fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
            padding: '0.5rem 1.5rem'
          }}
        >
          Mengerti
        </Button>
      </Modal.Footer>
    </Modal>

    <Modal show={showDiagnosisHelp} onHide={handleCloseDiagnosisHelp} centered>
      <Modal.Header closeButton>
        <Modal.Title style={{
          fontSize: 'clamp(1.1rem, 2vw, 1.25rem)'
        }}>PENJELASAN DIAGNOSA</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{
        fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
      }}>
        <p>Sistem ini menggunakan teknologi <em>Deep Learning</em> untuk menganalisis rekaman EEG dan memberikan prediksi awal terkait kemungkinan skizofrenia.</p>
        <p>Proses diagnosa meliputi:</p>
        <ol>
          <li>Pengunggahan file rekaman EEG</li>
          <li>Analisis sinyal EEG menggunakan model deep learning</li>
          <li>Penghitungan probabilitas hasil diagnosa</li>
        </ol>
        <p>Hasil yang ditampilkan berupa persentase probabilitas untuk setiap kategori (Skizofrenia dan Normal).</p>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          variant="primary" 
          onClick={handleCloseDiagnosisHelp}
          style={{
            fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
            padding: '0.5rem 1.5rem'
          }}
        >
          Mengerti
        </Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}
