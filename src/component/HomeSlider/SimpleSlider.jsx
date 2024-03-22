import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <img
          style={{ height: "18.75rem" }}
          className="w-100"
          src={require("../../images/slider-image-1.jpeg")}
          alt="slider1"
        />
      </div>
      <div>
        <img
          style={{ height: "18.75rem" }}
          className="w-100"
          src={require("../../images/slider-2.jpeg")}
          alt="slider2"
        />
      </div>
      <div>
        <img
          style={{ height: "18.75rem" }}
          className="w-100"
          src={require("../../images/slider-image-2.jpeg")}
          alt="slider3"
        />
      </div>
      <div>
        <img
          style={{ height: "18.75rem" }}
          className="w-100"
          src={require("../../images/slider-image-3.jpeg")}
          alt="slider4"
        />
      </div>
    </Slider>
  );
}
