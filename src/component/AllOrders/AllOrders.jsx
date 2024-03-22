import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { addCart } from "../../Context/AddProductToCart";
import { RotatingLines, Watch } from "react-loader-spinner";
import { Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function AllOrders() {
  const { userId, getProductFromCart } = useContext(addCart);

  useEffect(() => {
    getProductFromCart();
  }, []);

  async function fetchAllOrders() {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${localStorage.getItem(
          "userId"
        )}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw new Error("Failed to fetch orders");
    }
  }

  const {
    data: orders,
    isLoading,
    isError,
  } = useQuery("allOrders", fetchAllOrders);

  if (isLoading) {
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

  if (isError) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Helmet>
        <title>Orders</title>
      </Helmet>
      <div className="container">
        <h2 className="text-main my-md-5">All Orders</h2>
        {orders.length === 0 ? (
          <p>No orders to display</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} className="row border-bottom border-light mb-3">
              <div className="col-md-2">
                <Watch
                  visible={true}
                  height={80}
                  width={80}
                  radius={48}
                  color="#4fa94d"
                  ariaLabel="watch-loading"
                />
              </div>
              <div className="col-6">
                <h5>
                  <span className="text-main">Total Order Price:</span>{" "}
                  {order.totalOrderPrice}{" "}
                </h5>
                <p>
                  <span className="text-main">Details:</span> <br />{" "}
                  <span className="text-main">Order to:</span> {order.user.name}{" "}
                  <br /> <span className="text-main">Phone:</span>{" "}
                  {order.user.phone} <br />{" "}
                  <span className="text-main">Email:</span> {order.user.email}{" "}
                </p>
              </div>
              <div className="col-md-2">{order.paymentMethodType}</div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
