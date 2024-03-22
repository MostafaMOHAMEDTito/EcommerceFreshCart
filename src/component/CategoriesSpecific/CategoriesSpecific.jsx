import axios from "axios";
import React from "react";
import { RotatingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Navigate, useParams } from "react-router-dom";

export default function CategoriesSpecific() {
  const { id } = useParams();
  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
  }
  const { isLoading, data, isError } = useQuery(
    `getProductDetails/${id}`,
    getProductDetails
  );
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
    return <Navigate to={"/Products"} />;
  }

  const productData = data.data.data;
  // console.log(productData);
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <figure>
              <img
                className="w-100"
                src={productData.image}
                alt={productData.name}
              />
            </figure>
          </div>
          <div className="col-md-8">
            <h1 className=" my-md-3">{productData.name}</h1>
            <h3 className=" my-md-3">{productData.slug}</h3>


          </div>
        </div>
      </div>
    </>
  );
}
