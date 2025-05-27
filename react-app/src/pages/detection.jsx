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
import { Doughnut } from 'react-chartjs-2';
import { FaQuestionCircle } from "react-icons/fa";
import Footer from '../components/footer'
import CustomFileInput from '../components/CustomFileInput';
import icon from "../assets/img/logo.png"
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Detection() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showChannelHelp, setShowChannelHelp] = useState(false);
  const [showDiagnosisHelp, setShowDiagnosisHelp] = useState(false);
  const [nameValue, setNameValue] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [result, setResult] = useState({
    schizophrenia_percentage: null,
    healthy_percentage: null
  });
  const [chartData, setChartData] = useState({
    labels: ['Skizofrenia', 'Sehat'],
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
  
  const printRef = React.useRef(null);
  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element){
      return;
    }

    const canvas = await html2canvas(element, {
      scale: 2
    });
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "px",
      format: "a4"
    });

    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth)/imgProperties.width;

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('examplepdf.pdf');
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
      const response = await fetch("https://web-based-schizophrenia-eeg-detection-1057358766262.europe-west1.run.app/predict", {
        method: "POST",
        body: formData,
      });
      
      const result = await response.json();

      console.log("Response status:", response.status);

      // If response is not OK, show the error from the JSON
      if (!response.ok) {
        const errorMessage = result.error || "Terjadi kesalahan saat mengirim file. Silakan coba lagi.";
        setAlertMessage(errorMessage);
        setShowAlert(true);

        e.target.reset();     // Clear form fields
        setFile(null);        // Clear file from state
        return; // Stop execution
      }

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

      // set name and value
      const nameValue = e.target.elements.nama.value;
      setNameValue(nameValue);

      const dateValue = e.target.elements.date.value;
      setDateValue(formatDate(dateValue));

    } catch (error) {
      console.error("Error during form submission:", error);
      setAlertMessage("Terjadi kesalahan saat mengirim file. Silakan coba lagi.");
      setShowAlert(true);

      e.target.reset();
      setFile(null);
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

  const DoughnutChart = () => {
    return <Doughnut data={chartData} options={options}  />;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Invalid Date';
    const dateObj = new Date(dateStr);
    return dateObj.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return(
    <div>
    <link rel="icon" type="image/x-icon" href={icon}></link>
    <title> ScanOtak | Diagnosa Pasien</title>
    <div className="detection mb-5">
      <div className="container mt-4 mt-md-5">
        <div className="row g-4">
          <div className="col-12 col-md-7">
            <Container className="form d-flex flex-column justify-content-between h-100" style={{
              borderRadius: '10px',
            }}>
              <form onSubmit={handleSubmit} className="d-flex flex-column" style={{flex: 1}}>
                <div style={{flex: 1}}>
                  <h3 className="heading-form" style={{
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
                    marginBottom: '0.5rem'
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
                    Nama Pasien<span style={{color:'red'}}>*</span>
                  </label>
                  <input 
                    className="input-form" 
                    type="text" 
                    placeholder="Masukkan Nama Pasien..." 
                    name='nama'
                    disabled={loading}
                    required
                    id="nama"
                    style={{
                      fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                      padding: '0.5rem',
                      marginBottom: '0.5rem'
                    }}
                  />

                  <label className="label-form" style={{
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                    marginBottom: '0.5rem'
                  }}>
                    Usia <span style={{color:'red'}}>*</span>
                  </label>
                  <input 
                    className="input-form" 
                    type="number" 
                    placeholder="Masukkan Usia Pasien..." 
                    name='usia'
                    disabled={loading}
                    required
                    id="usia"
                    style={{
                      fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                      padding: '0.5rem',
                      marginBottom: '0.5rem'
                    }}
                  />

                  <label className="label-form" style={{
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                    marginBottom: '0.5rem'
                  }}>
                    Jenis Kelamin <span style={{color:'red'}}>*</span>
                  </label>
                  {/* radio buttton */}
                  <div className="radio-group" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '2rem',
                    marginBottom: '0.5rem'
                  }}>
                    <label className="radio-label-g" style={{
                      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                    }}>
                      <input 
                        type="radio" 
                        name='gender'
                        required 
                        value="Laki-laki"
                        disabled={loading}
                        style={{
                          width: '18px',
                          height: '18px',
                          marginRight: '0.5rem'
                        }}
                      />Laki-laki
                    </label>
                    <label className="radio-label-g" style={{
                      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                    }}>
                      <input 
                        type="radio" 
                        name='gender' 
                        value="Perempuan"
                        disabled={loading}
                        style={{
                          width: '18px',
                          height: '18px',
                          marginRight: '0.5rem'
                        }}
                      />Perempuan
                    </label>
                  </div>

                  <label className="label-form" style={{
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                    marginBottom: '0.5rem'
                  }}>
                    Jumlah Channel <span style={{color:'red'}}>*</span>
                    <FaQuestionCircle 
                      className="question-icon" 
                      onClick={() => setShowChannelHelp(true)}
                      style={{ cursor: 'pointer' }}
                    />
                  </label>

                  {/* radio buttton */}
                  <div className="radio-group" style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '2rem',
                    marginBottom: '0.5rem'
                  }}>
                    <label className="radio-label" style={{
                      fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                    }}>
                      <input 
                        type="radio" 
                        name='channels'
                        required 
                        value="32"
                        disabled={loading}
                        style={{
                          width: '18px',
                          height: '18px',
                          marginRight: '0.5rem'
                        }}
                      />
                      <span>32 Channels (dengan PG1 & PG2)</span>
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
                      <span>25 Channels (dengan ECG)</span>
                    </label>
                  </div>

                  <label className="label-form" style={{
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                    marginBottom: '0.5rem'
                  }}>
                    Input File Hasil Rekaman EEG Pasien <span style={{color:'red'}}>*</span>
                  </label>
                  <CustomFileInput onFileChange={setFile} disabled={loading} />

                  <label className="label-form" style={{
                    fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                    marginBottom: '0.5rem',
                    marginTop: '0.5rem'
                  }}>
                    Waktu diagnosa <span style={{color:'red'}}>*</span>
                  </label>
                  <input
                    className="input-form input-date"
                    type="date"
                    id="date"
                    name="diagnosa-date"
                    placeholder="dd/mm/yyyy"
                    required
                    style={{ 
                      width: '100%',
                      fontSize: 'clamp(0.8rem, 1.5vw, 0.9rem)',
                      padding: '0.5rem'
                    }}
                    disabled={loading}
                  />
                </div>

                {/* button */}
                <button 
                  className="btn-diagnosa mt-2" 
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

          <div className="col-12 col-md-5">
            <Container ref={printRef} className="result d-flex flex-column justify-content-start h-80" style={{
              padding: '1.5rem',
              borderRadius: '10px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <h5 className="text-center fw-bold" style={{ 
                color: '#3674B5',
                fontSize: 'clamp(0.7rem, 2vw, 1.2rem)'
              }}>Hasil Diagnosa</h5>
              <h6 className='text-center fw-bold'style={{ 
                color: '#3674B5',
                fontSize: 'clamp(0.9rem, 2vw, 1.3rem)'
              }}>{nameValue ? nameValue : "Silahkan isi form terlebih dahulu."}</h6>
              <h6 className='text-center fw-bold'style={{ 
                color: '#3674B5',
                fontSize: 'clamp(0.6rem, 2vw, 1.1rem)'
              }}>{dateValue}</h6>
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
                {/* doughnut chart */}
                  <div style={{ 
                    width: '100%', 
                    height: 'clamp(300px, 50vw, 400px)', 
                    margin: '0 auto', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center' 
                  }}>
                    <div className="my-1"style={{width:300, height:300}}>
                      <DoughnutChart />
                    </div>
                  </div>
                  {/* hasil analisa */}
                  <div className="row mt-1 mb-1 mx-2">
                    <div className="col">
                      <p className='text-center' style={{ 
                        color: '#3674B5',
                        fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                        fontWeight: 600
                      }}>
                        Resiko pasien mengidap skizofrenia sebesar
                        <strong style={{color:'red'}}>
                          {result.schizophrenia_percentage ? ` ${result.schizophrenia_percentage}%` : ' N/A.'}
                        </strong>
                        {/* Skizofrenia: {result.schizophrenia_percentage ? `${result.schizophrenia_percentage}%` : 'N/A'} */}
                      </p>
                    </div>
                    {/* <div className="col">
                      <h6 className='text-center fw-bold' style={{ 
                        color: '#3674B5',
                        fontSize: 'clamp(0.9rem, 1.5vw, 1rem)'
                      }}>
                      </h6>
                    </div> */}
                  </div>
                </>
              )}
              <p className='disclaimer mx-2 mt-3' style={{
                fontSize: 'clamp(0.7rem, 1.2vw, 0.8rem)',
                textAlign: 'center'
              }}>
                Hasil ini merupakan analisis awal berbasis EEG menggunakan <i>deep learning</i> dengan arsitektur CNN. 
                Silakan lakukan evaluasi klinis lebih lanjut dan konsultasikan dengan tim medis sebelum menetapkan 
                diagnosis akhir.
              </p>
            </Container>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '0.1rem' }}>
              <button
                className="btn-diagnosa"
                style={{
                  width: '100%',
                  maxWidth: '300px',
                  opacity: loading ? 0.7 : 1,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
                  padding: '0.75rem 1.5rem',
                }}
                type="button"
                disabled={loading}
                onClick={handleDownloadPdf}
              >
                {loading ? 'Memproses...' : 'Unduh Hasil Diagnosa'}
              </button>
            </div>
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
          <li><strong>32 Channel</strong> <br/>PG1, PG2, FP1, FP2, F3, F4, F7, F8, FZ, T1, T2, T3, T4, T5, T6, C3, C4, CZ, P3, P4, PZ, O1, O2, A1, A2, 1A, 2A, 3A, 4A, 5A, 6A, 7A </li>
          <li><strong>25 Channel</strong> <br/>FP1-RRef, F3-RRef, C3-RRef, P3-RRef, O1-RRef, F7-RRef, T3-RRef, T5-RRef, T1-RRef, A1-RRef, FP2-RRef, F4-RRef, C4-RRef, P4-RRef, O2-RRef, F8-RRef, T4-RRef, T6-RRef, T2-RRef, A2-RRef, FZ-RRef, PZ-RRef, FPZ, OZ-RRef, ECG </li>
        </ul>
        <p><strong>Sampling Rate: </strong>250Hz</p>
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
        <p>Hasil yang ditampilkan berupa persentase probabilitas untuk setiap kategori Skizofrenia.</p>
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
