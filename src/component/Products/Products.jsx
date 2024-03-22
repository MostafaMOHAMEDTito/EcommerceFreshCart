import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link, Navigate } from "react-router-dom";
import { addCart } from "../../Context/AddProductToCart";
import toast from "react-hot-toast";
import { WishListContext } from "../../Context/addWishList";
import { Helmet } from "react-helmet";
import icon from "../../images/freshcart-logo.svg"

export default function Products() {
  const { addProductToCart, allProducts } = useContext(addCart);
  const { addToWishList, allWishItems, getWishList } =
    useContext(WishListContext);
  const [productId, setProductId] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    if (allProducts) {
      setProductId(allProducts);
    }
  }, [allProducts]);

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

  async function getAllProducts() {
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
  };

  const { data, isLoading, isError } = useQuery(
    "getAllProducts",
    getAllProducts
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

  const filteredProducts = data.data.data.filter((product) =>
    product.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <>
    <Helmet>
      <title>Product</title>
    </Helmet>
      <div className="container">
        <div className="my-5">
          <input
            onChange={(e) => searchItems(e.target.value)}
            className="form-control"
            type="text"
            placeholder="Search... "
          />
        </div>
        <div className="row gy-1">
          {filteredProducts.map((product, index) => (
            <div key={index} className="col-md-2">
              <div className="product">
                <Link to={`/ProductDetails/${product.id}`}>
                  <div className="">
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
                <div className=" w-100 text-end">
                  <i
                    role="button"
                    onClick={() => addWishList(product.id)}
                    className={`fas fa-heart fa-2x ${
                      allWishItems &&
                      allWishItems.find((item) => item.id === product.id)
                        ? "text-danger"
                        : ""
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
    </>
  );
}
