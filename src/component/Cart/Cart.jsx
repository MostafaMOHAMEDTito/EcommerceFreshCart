import React, { useContext } from "react";
import { addCart } from "../../Context/AddProductToCart";
import { RotatingLines } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  const {
    getProductFromCart,
    numberOfCartItem,
    totalPrice,
    allProducts,
    updateProductToCart,
    deleteItemFromCart,
    deleteCart,
  } = useContext(addCart);
  const navigate = useNavigate();

  async function updateCart(id, newCount) {
    const res = await updateProductToCart(id, newCount);
    if (res) {
      toast.success("Product Updated");
    } else {
      toast.error("Error");
    }
  }
  async function deletedItemFromCart(id) {
    const res = await deleteItemFromCart(id);
    if (res) {
      toast.success("Product Updated");
    } else {
      toast.error("Error");
    }
  }

  async function deletedCart() {
    try {
      await deleteCart();
      toast.success("Cart Cleared");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    }
  }
  if (allProducts == 0) {
    return (
      <>
        <div className="d-flex justify-content-center align-items-center">
          {" "}
          <h2>
            Number of cart item :{" "}
            <span className="text-main">{numberOfCartItem}</span>
          </h2>
        </div>
      </>
    );
  }
  if (!allProducts) {
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

  return (
    <>
      <Helmet>
        <title>Cart</title>
      </Helmet>
      <div className="container bg-light my-2">
        <div className="d-flex justify-content-between align-items-center">
          <h1>Shop cart:</h1>
          <div>
            <h5>
              Number of cart item :{" "}
              <span className="text-main">{numberOfCartItem}</span>
            </h5>
            <button
              onClick={() => deletedCart()}
              className="btn btn-outline-success"
            >
              Remove Cart
            </button>
          </div>
        </div>
        <div className="d-flex align-content-center align-items-center">
          <p className="text-main ">Total cart price :</p>
          <p className="text-main">{totalPrice} EGP</p>
          <Link to={"/payment"}>
            <button className="btn bg-main mx-3" type="button">
              Confirm payment
            </button>
          </Link>
        </div>

        <div className="">
          {allProducts.map((productCart, index) => (
            <div
              key={index}
              className="row border-1 border-bottom border-black align-items-center py-3"
            >
              <div className="col-md-2">
                <figure>
                  <img
                    className="w-100"
                    src={productCart.product.imageCover}
                    alt={productCart.product.title}
                  />
                </figure>
              </div>
              <div className="col-md-8">
                <p>{productCart.product.title}.</p>
                <p className="text-main">price :{productCart.price}</p>
                <p
                  role="button"
                  onClick={() => deletedItemFromCart(productCart.product._id)}
                  className="btn text-main "
                >
                  🗑Remove
                </p>
              </div>
              <div className="col-md-2  d-flex justify-content-between align-items-center">
                <button
                  onClick={() => {
                    updateCart(productCart.product._id, productCart.count + 1);
                  }}
                  className="btn btn-outline-success"
                >
                  +
                </button>
                <p>{productCart.count}</p>
                <button
                  disabled={productCart.count == 1}
                  onClick={() => {
                    updateCart(productCart.product._id, productCart.count - 1);
                  }}
                  className="btn btn-outline-success"
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
