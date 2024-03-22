import React from "react";

export default function Footer() {
  return (
    <section className="bg-main-light py-3">
      <div className="container my-5">
        <h2>Get The Fresh Cart app</h2>
        <p>
          We will send you a link, open it on your phone to download the app
        </p>
        <div className="row justify-content-between">
          <input type="text" className="col-10 p-2" placeholder="Email..." />
          <button className="col-2 bg-main" type="button">
            Share App Link
          </button>
        </div>
        <hr />
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-center align-items-center">
            <p className="h5">Payment Partners</p>
            <img
              style={{ height: "20px" }}
              src={require("../../images/2560px-Amazon_Pay_logo.svg.png")}
              alt="Amazon Pay logo"
              width="50"
              className="ms-2"
            />
            <img
              style={{ height: "20px" }}
              src={require("../../images/download.png")}
              alt="American Express logo"
              width="50"
              className="ms-2"
            />
            <img
              style={{ height: "20px" }}
              src={require("../../images/MasterCard_Logo.svg.png")}
              alt="Mastercard logo"
              width="50"
              className="ms-2"
            />
            <img
              style={{ height: "20px" }}
              src={require("../../images/paypal-3 (1).png")}
              alt="PayPal logo"
              width="50"
              className="ms-2"
            />
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <p className="h5">Get delivire by freshcart</p>
            <img
              width="90"
              className="ms-2"
              style={{ height: "40px" }}
              src={require("../../images/png-transparent-itunes-app-store-apple-logo-apple-text-rectangle-logo.png")}
              alt="app-store"
            />
            <img
              width="90"
              className="ms-2"
              style={{ height: "40px" }}
              src={require("../../images/en_badge_web_generic.png")}
              alt="app-store"
            />
          </div>
        </div>
        <hr />
      </div>
    </section>
  );
}
