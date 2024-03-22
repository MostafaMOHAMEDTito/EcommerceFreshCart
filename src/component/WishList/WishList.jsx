import React, { useContext } from "react";
import { RotatingLines } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { WishListContext } from "../../Context/addWishList";
import { addCart } from "../../Context/AddProductToCart";
import { Helmet } from "react-helmet";

export default function WishList() {
  const { allWishItems, numberOfWishItems, deleteFromWishList, loading } =
    useContext(WishListContext);
  const navigate = useNavigate();
  const { addProductToCart } = useContext(addCart);

  async function deleteItem(id) {
    try {
      await deleteFromWishList(id);
      toast.success("Item removed from wishlist");
    } catch (error) {
      console.error("Error deleting item from wishlist:", error);
      toast.error("Failed to remove item from wishlist");
    }
  }

  async function addItemToCart(productId) {
    try {
      const res = await addProductToCart(productId);
      if (res) {
        toast.success(res.message);
        deleteFromWishList(productId);
      } else {
        toast.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Failed to add item to cart");
    }
  }

  if (loading) {
    return (
      <div className="vh-100 w-100 d-flex justify-content-center align-items-center bg-black">
        <RotatingLines
          visible={true}
          height={96}
          width={96}
          color="var(--main-color)"
          strokeWidth={5}
          animationDuration={0.75}
          ariaLabel="rotating-lines-loading"
        />
      </div>
    );
  }

  if (allWishItems.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <h2>
          Number of wishlist items:{" "}
          <span className="text-main">{numberOfWishItems}</span>
        </h2>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Wish List</title>
      </Helmet>
      <div className="container bg-light my-2">
        <h1>Wishlist:</h1>
        <div className="d-flex align-items-center">
          <h5>Number of wishlist items: {numberOfWishItems}</h5>
        </div>

        <div className="d-flex align-items-center">
          <Link to="/home">
            <button className="btn btn-outline-success">Back to Home</button>
          </Link>
        </div>

        <div className="">
          {allWishItems.map((item, index) => (
            <div
              key={index}
              className="row border-1 border-bottom border-black align-items-center py-3"
            >
              <div className="col-md-2">
                <figure>
                  <img
                    className="w-100"
                    src={item.imageCover}
                    alt={item.title}
                  />
                </figure>
              </div>
              <div className="col-md-8">
                <p>{item.title}</p>
                <p className="text-main">Price: {item.price}</p>
                <div className="d-flex">
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="btn text-main mx-2"
                  >
                    🗑 Remove
                  </button>
                  <button
                    onClick={() => addItemToCart(item.id)}
                    className="btn bg-main ms-auto"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
