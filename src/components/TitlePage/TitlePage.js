import React from "react";
import Header from "../Header/Header";
import MainContent from "../MainContent/MainContent";
import Footer from "../Footer/Footer";
import NewSlider from "../Slider/NewSlider";
import "./TitlePage.scss";

function TitlePage() {
  return (
    <>
      <div className="title-page">
        <Header />
        <MainContent />
        <Footer />
      </div>
      <NewSlider />
    </>
  );
}

export default TitlePage;
