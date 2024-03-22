import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

import { tokenContext } from "./AuthContext";

export const WishListContext = createContext();

export default function AddWishListProvider({ children }) {
  const { token } = useContext(tokenContext);
  const [numberOfWishItems, setNumberOfWishItems] = useState(0);
  const [allWishItems, setAllWishItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWishList();
  }, [token]);

  async function getWishList() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      );
      setAllWishItems(response.data.data);
      setNumberOfWishItems(response.data.count);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  }

  async function addToWishList(productId) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        { headers: { token: localStorage.getItem("tkn") } }
      );
      setAllWishItems(response.data.data);
      setNumberOfWishItems(response.data.count);

      return response.data;
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
      throw new Error("Failed to add product to wishlist");
    }
  }

  async function deleteFromWishList(wishlistItemId) {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${wishlistItemId}`,
        {
          headers: { token: localStorage.getItem("tkn") },
        }
      );
      setAllWishItems((prevItems) =>
        prevItems.filter((item) => item.id !== wishlistItemId)
      );
      setNumberOfWishItems((prev) => prev - 1);
    } catch (error) {
      console.error("Error deleting item from wishlist:", error);
      throw new Error("Failed to delete item from wishlist");
    }
  }

  const contextValue = {
    addToWishList,
    deleteFromWishList,
    numberOfWishItems,
    allWishItems,
    loading,
    getWishList,
  };

  return (
    <WishListContext.Provider value={contextValue}>
      {children}
    </WishListContext.Provider>
  );
}
