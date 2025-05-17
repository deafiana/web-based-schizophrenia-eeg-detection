import "./assets/styles.css"
import "bootstrap/dist/css/bootstrap.min.css"
import { Navbar, Nav, Container, Button } from "react-bootstrap"
import logo from "./assets/img/logo.png"
import React, { useState } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [chartData, setChartData] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Mohon masukkan file rekaman EEG. ");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch("http://127.0.0.1:5000/predict", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

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

    setResult(`Schizophrenia: ${result.schizophrenia_percentage}%, Normal: ${result.healthy_percentage}%`);
  };

  console.log("Chart data:", {
    schizophrenia: result.schizophrenia_percentage,
    normal: result.healthy_percentage
  });

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      }
    },
  };

  const PieChart = () => {
    return chartData ? <Pie data={chartData} options={options} /> : null;
  };

  return(
    <div className="app">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Container className="form">
              <h3 className="heading-form">Diagnosa Skizofrenia Menggunakan Deep Learning</h3>
              <form onSubmit={handleSubmit}>
                <label className="label-form">Nama Pasien</label>
                <input className="input-form" type="text" placeholder="Nama Pasien.." name='name' />

                <label className="label-form">Jumlah Channel (lihat pada panduan penggunaan)</label>
                <div>
                  <input type="radio" name='channels' value="32" /> 32 Channels (dengan ECG)<br />
                  <input type="radio" name='channels' value="24" /> 24 Channels (dengan PG1 & PG2)
                </div>

                <label className="label-form">Input File Hasil Rekaman EEG Pasien</label>
                <input className="input-form" type="file" name='file' accept=".edf" onChange={handleFileChange} />

                <label className="label-form">Waktu Diagnosa</label>
                <input className="input-form" type="date" name='diagnosa-date' />

                <button className="btn btn-primary mt-3" type="submit">Diagnosa</button>
              </form>
            </Container>
          </div>

          <div className="col-md-6">
            <Container className="result">
              <h5 className="text-center fw-bold" style={{ color: '#3674B5' }}>Hasil Klasifikasi</h5>
              {chartData && (
                <div style={{ width: '400px', margin: '0 auto' }}>
                  <PieChart />
                </div>
              )}
              <h6 className='text-center fw-bold my-3'style={{ color: '#3674B5' }}>Schizophrenia: {result.schizophrenia_percentage}</h6>
              <h6 className='text-center fw-bold my-3'style={{ color: '#3674B5' }}>Normal: {result.healthy_percentage}</h6>
              <p className='disclaimer'>Hasil ini merupakan analisis awal berbasis EEG dan deep learning. 
                Silakan lakukan evaluasi klinis lebih lanjut dan konsultasikan dengan tim medis sebelum menetapkan 
                diagnosis akhir.</p>
            </Container>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
