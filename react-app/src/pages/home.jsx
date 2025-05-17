import React from "react";
import { Link } from "react-router-dom";
import HeroSection from '../components/hero'
import Footer from '../components/footer'
import LatarBelakang from "../components/latarbelakang"
import Fitur from "../components/fitur"
import Mulai from "../components/mulai"
import About from "../components/about"

export default function Home() {
  return (
    <div>
      <HeroSection />
      <LatarBelakang />
      <Fitur />
      <Mulai />
      <About />
      <Footer />
    </div>
  );
} 