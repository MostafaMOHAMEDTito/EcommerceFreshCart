import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import SimpleSlider from "../HomeSlider/SimpleSlider";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import { Link, Navigate } from "react-router-dom";
import { addCart } from "../../Context/AddProductToCart";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/addWishList";
import { Helmet } from "react-helmet";

export default function Products() {
  const { addProductToCart } = useContext(addCart);
  const { addToWishList, allWishItems, getWishList } = useContext(WishListContext);
  
  async function addProduct(id) {
    try {
      const res = await addProductToCart(id);
      if (res) {
        toast.success(res.message);
      } else {
        toast.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("An error occurred while adding the product to cart");
    }
  }
  
  async function addWishList(id) {
    try {
      const res = await addToWishList(id);
      if (res) {
        toast.success(res.message);
        getWishList(); 
      } else {
        toast.error("Failed to add product to wishlist");
      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      toast.error("An error occurred while adding the product to wishlist");
    }
  }
  
  async function getAllProduct() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isLoading, isError } = useQuery(
    "getAllProducts",
    getAllProduct
  );

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
    return <Navigate to={"/login"} />;
  }
  console.log(data);

  return <>
      <Helmet>
      <title>Home</title>
    </Helmet>
    <div className="container">
      <div className="row my-3">
        <div className="col-9">
          <SimpleSlider />
        </div>
        <div className="col-3">
          <figure>
            <img
              style={{ height: "150px" }}
              className="w-100"
              src={require("../../images/grocery-banner.png")}
              alt="banner"
            />
          </figure>
          <figure>
            <img
              style={{ height: "150px" }}
              className="w-100"
              src={require("../../images/grocery-banner-2.jpeg")}
              alt="banner"
            />
          </figure>
        </div>
      </div>
      <CategoriesSlider />
      <div className="row gy-1">
        {data.data.data.map((product, index) => (
          <div key={index} className="col-md-2">
            <div className="product">
              <Link to={`/ProductDetails/${product.id}`}>
                <div>
                  <img
                    className="w-100"
                    src={product.imageCover}
                    alt="product"
                  />
                  <h3 className="text-main h6">{product.category.name}</h3>
                  <h2 className="h6">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h2>
                  <div className="d-flex justify-content-between">
                    {product.priceAfterDiscount ? (
                      <>
                        <p>
                          <span className="text-decoration-line-through">
                            {product.price}
                          </span>
                          -{product.priceAfterDiscount}
                          <span>EGP</span>
                        </p>
                      </>
                    ) : (
                      <p>
                        {product.price}
                        <span>EGP</span>
                      </p>
                    )}
                    <p>⭐{product.ratingsAverage}</p>
                  </div>
                </div>
              </Link>
              <div className="w-100 text-end">
                <i
                  role="button"
                  onClick={() => addWishList(product.id)}
                  className={`fas fa-heart fa-2x ${
                    allWishItems && allWishItems.find(item => item.id === product.id) ? "text-danger" : ""
                  }`}
                ></i>
              </div>
              <button
                onClick={() => addProduct(product.id)}
                className="btn bg-main w-100"
              >
                + Add To Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>;
}
