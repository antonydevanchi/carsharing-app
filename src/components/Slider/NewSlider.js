import React from "react";
import Slide from "./components/Slide/Slide";
import Arrow from "./components/Arrow/Arrow";
import Dots from "./components/Dots/Dots";
import { SLIDES } from "../../constants/constants";
import "./NewSlider.scss";

function NewSlider() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const nextSlide = () => {
    if (activeIndex === SLIDES.length - 1) {
      return setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  const prevSlide = () => {
    if (activeIndex === 0) {
      return setActiveIndex(SLIDES.length - 1);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };

  return (
    <section className="slider">
      <Slide
        image={SLIDES[activeIndex].image}
        title={SLIDES[activeIndex].title}
        description={SLIDES[activeIndex].description}
        btnClassName={SLIDES[activeIndex].btnClassName}
      />
      <Arrow direction="right" handleClick={nextSlide} />
      <Arrow direction="left" handleClick={prevSlide} />
      <Dots slides={SLIDES} activeIndex={activeIndex} />
    </section>
  );
}

export default NewSlider;
