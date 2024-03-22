import axios from "axios";
import React from "react";
import { RotatingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import Slider from "react-slick";
; 
export default function CategoriesSlider() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { data, isLoading, isError } = useQuery("getCategories", getCategories);
  
  if (isLoading) {
    return (
      <div className="vh-100 w-100 d-flex justify-content-center align-items-center bg-black">
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="var(--main-color)"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 7,
    slidesToScroll: 7,
    autoplay: true,
    // autoplaySpeed: 2000, 
    cssEase: "linear",
  };

  return (
    <Slider {...settings}>
      {data.data.data.map((category, idx) => (
        <div key={idx}>
          <figure>
            <img style={{height:"200px"}} className="w-100" src={category.image} alt={category.name} />
          </figure>
          <h2 className="h6">{category.name}</h2>
        </div>
      ))}
    </Slider>
  );
}
