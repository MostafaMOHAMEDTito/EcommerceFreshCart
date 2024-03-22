import axios, { Axios } from "axios";
import React, { useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import SimpleSlider from "../HomeSlider/SimpleSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Brand() {

  async function getAllBrand() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data, isLoading , isError} = useQuery("getAllBrand", getAllBrand);

  if (isLoading) {
    return (
      <>
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
      </>
    );
  }
  if (isError) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
          <Helmet>
      <title>Brand</title>
    </Helmet>
      <div className="container">
        <div className="row gy-1">
          {data.data.data.map((product, index) => (
            <div key={index} className="col-md-3">
              <div >
                <div className="product">
                  <img className="w-100"  src={product.image} alt="product" />
                  <h3 className="text-main h6">{product.name}</h3>
                  <h2 className="h6">{product.slug}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
