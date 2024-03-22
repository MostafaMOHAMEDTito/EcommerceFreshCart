import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

import { tokenContext } from "./AuthContext";

export const addCart = createContext();

export default function AddProductToCartProvider({ children }) {
  const { token } = useContext(tokenContext);
  const [numberOfCartItem, setNumberOfCartItem] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [allProducts, setallProducts] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [userId, setUserId] = useState(null);

  async function getProductFromCart() {
    try {
      await axios
        .get("https://ecommerce.routemisr.com/api/v1/cart", {
          headers: { token: localStorage.getItem("tkn") },
        })
        .then((res) => {
          setallProducts(res.data.data.products);
          setTotalPrice(res.data.data.totalCartPrice);
          setNumberOfCartItem(res.data.numOfCartItems);
          setCartId(res.data.data._id);
          setUserId(res.data.data.cartOwner);
          localStorage.setItem("userId", res.data.data.cartOwner);
        });
    } catch (err) {
      console.error("err" + err);
    }
  }
  useEffect(() => {
    getProductFromCart();
  }, [token]);

  async function addProductToCart(productId) {
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers: { token: localStorage.getItem("tkn") } }
      );
      // setNumberOfCartItem(data.numOfCartItems);
      // setTotalPrice(data.totalCartPrice);
      // setallProducts(data.products);
      getProductFromCart();
      return data;
    } catch (error) {
      console.error("Error adding product to cart:", error);
      throw new Error("Failed to add product to cart");
    }
  }
  async function updateProductToCart(id, newCount) {
    try {
      const boolenflag = await axios
        .put(
          `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
          {
            count: newCount,
          },
          {
            headers: {
              token: localStorage.getItem("tkn"),
            },
          }
        )
        .then((res) => {
          setallProducts(res.data.data.products);
          setTotalPrice(res.data.data.totalCartPrice);
          setNumberOfCartItem(res.data.numOfCartItems);
          setUserId(res.data.data.cartOwner)
          return true;
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
      return boolenflag;
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteItemFromCart(id) {
    try {
      const boolenData = await axios
        .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        })
        .then((res) => {
          setallProducts(res.data.data.products);
          setTotalPrice(res.data.data.totalCartPrice);
          setNumberOfCartItem(res.data.numOfCartItems);
          setCartId(res.data._id);
          setUserId(res.data.data.cartOwner)
          return true;
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
      return boolenData;
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteCart() {
    try {
      const boolenData = await axios
        .delete("https://ecommerce.routemisr.com/api/v1/cart", {
          headers: {
            token: localStorage.getItem("tkn"),
          },
        })
        .then((res) => {
          setNumberOfCartItem(0);
          setTotalPrice(0);
          setallProducts(0);
          setCartId(null);
          return true;
        })
        .catch((err) => {
          console.log(err);
          return false;
        });
      return boolenData;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <addCart.Provider
      value={{
        addProductToCart,
        getProductFromCart,
        numberOfCartItem,
        totalPrice,
        allProducts,
        cartId,
        userId,
        updateProductToCart,
        deleteItemFromCart,
        deleteCart,
      }}
    >
      {children}
    </addCart.Provider>
  );
}
