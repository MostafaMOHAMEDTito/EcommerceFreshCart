import axios from "axios";
import React, { useContext } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Navigate, useParams } from "react-router-dom";
import { addCart } from "../../Context/AddProductToCart";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/addWishList";
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  const { addProductToCart } = useContext(addCart);
  const { addToWishList } = useContext(WishListContext);
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
      } else {
        toast.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("An error occurred while adding the product to cart");
    }
  }

  const { id } = useParams();
  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
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
  return (
    <>
          <Helmet>
        <title>{productData.title.split(" ").slice(0, 2).join(" ") + " Product"}</title>
      </Helmet>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <figure>
              <img
                className="w-100"
                src={productData.imageCover}
                alt={productData.title}
              />
            </figure>
          </div>
          <div className="col-md-8">
            <h1 className=" my-md-3">{productData.title}</h1>
            <h4 className=" my-md-3">{productData.description}</h4>
            <div className="d-flex my-md-3">
              <h4>{productData.category.name}</h4>
              <figure>
                <img
                  className="w-100"
                  style={{ height: "50px" }}
                  src={productData.category.image}
                  alt={productData.category.name}
                />
              </figure>
            </div>
            <div className="my-md-2 d-flex align-items-center">
              <div>
                {" "}
                <p className="h4">Price:</p>
              </div>
              <div>
                {" "}
                <p className="price pt-3">
                  {productData.priceAfterDiscount ? (
                    <>
                      <p>
                        <span className="text-decoration-line-through">
                          {productData.price}
                        </span>
                        - {productData.priceAfterDiscount}
                        <span>EGP</span>
                      </p>
                    </>
                  ) : (
                    <p>
                      {productData.price}
                      <span>EGP</span>
                    </p>
                  )}
                </p>
              </div>
              <div className=" w-75 text-end">
                <i
                  role="button"
                  onClick={() => addWishList(productData.id)}
                  className="fa-solid fa-heart fa-2x"
                ></i>
              </div>
            </div>

            <button
              onClick={() => addProduct(productData.id)}
              type="button"
              className="btn bg-main w-100 text-white"
            >
              + Add Product in Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
