import "./assets/styles.css"
import "bootstrap/dist/css/bootstrap.min.css"
import React from "react";
import { Routes, Route } from "react-router-dom";
import Detection from "./pages/detection";
import Home from "./pages/home";
import Navbar from './components/navbar'

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detection" element={<Detection />} />
      </Routes>
    </>
  );
}

export default App
