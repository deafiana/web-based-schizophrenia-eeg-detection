import React from "react";
import { Link } from "react-router-dom";
import HeroSection from '../components/hero'
import Footer from '../components/footer'
import LatarBelakang from "../components/latarbelakang"
import Fitur from "../components/fitur"
import Mulai from "../components/mulai"
import About from "../components/about"
import icon from "../assets/img/logo.png"

export default function Home() {
  return (
    <div>
      <link rel="icon" type="image/x-icon" href={icon}></link>
      <title>ScanOtak</title>
      <HeroSection />
      <LatarBelakang />
      <Fitur />
      <Mulai />
      <About />
      <Footer />
    </div>
  );
} 