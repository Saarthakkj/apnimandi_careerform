import React from "react";
import "./App.css";
import CareersForm from "./components/CareersForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="/logo.png" alt="Apni Mandi Logo" className="logo" />
        <nav>
          <a href="#about">ABOUT</a>
          <a href="#jobs">JOBS</a>
          <a href="#locations">LOCATIONS</a>
          <a href="#contact">CONTACT</a>
        </nav>
      </header>
      <div className="banner-container">
        <img src="/banner.png" alt="Apni Mandi Banner" className="banner" />
      </div>
      <CareersForm />
      <div className="footer-container">
        <img
          src="/footer.png"
          alt="Apni Mandi Banner"
          className="footer-image"
        />
      </div>
    </div>
  );
}

export default App;
