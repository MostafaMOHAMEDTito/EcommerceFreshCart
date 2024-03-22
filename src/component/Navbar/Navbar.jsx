import React from "react";
import { Link, useNavigate } from "react-router-dom";
import imglogo from "../../images/freshcart-logo.svg";
import { useContext } from "react";
import { tokenContext } from "../../Context/AuthContext";
import { addCart } from "../../Context/AddProductToCart";
import { WishListContext } from "../../Context/addWishList";

export default function Navbar() {
  const { token, setToken } = useContext(tokenContext);
  const { numberOfCartItem } = useContext(addCart);
  const {numberOfWishItems} = useContext(WishListContext)
  const navigate = useNavigate();
  function logOut() {
    setToken(null);
    localStorage.removeItem("tkn");
    navigate("/login");
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-main-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={imglogo} alt="Logo" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {token ? (
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/home"
                  >
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/Products">
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/categories">
                    Categories
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Brands">
                    Brands
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/allorders">
                    Orders
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link position-relative" to="/wishList">
                    WishList
                    <span class="position-absolute top-2 start-100 translate-middle badge rounded-pill bg-main">
                      {numberOfWishItems ? numberOfWishItems : null}
                      <span class="visually-hidden">unread messages</span>
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link position-relative" to="/cart">
                    Cart
                    <span class="position-absolute top-2 start-100 translate-middle badge rounded-pill bg-main">
                      {numberOfCartItem ? numberOfCartItem : null}
                      <span class="visually-hidden">unread messages</span>
                    </span>
                  </Link>
                </li>
              </ul>
            ) : null}

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item ">
                <ul className="d-flex list-unstyled">
                  <li>
                    <Link target="_blank" to="https://www.instagram.com/">
                      <i className="fa-brands fa-instagram  me-2"></i>
                    </Link>
                  </li>
                  <li>
                    <Link target="_blank" to="https://www.facebook.com/">
                      <i className="fa-brands fa-facebook-f me-2"></i>
                    </Link>
                  </li>
                  <li>
                    <Link target="_blank" to="https://www.linkedin.com">
                      <i className="fa-brands fa-linkedin me-2"></i>
                    </Link>
                  </li>
                  <li>
                    <Link target="_blank" to="https://www.twitter.com">
                      <i className="fa-brands fa-twitter me-2"></i>
                    </Link>
                  </li>
                  <li>
                    <Link target="_blank" to="https://www.youtube.com">
                      <i className="fa-brands fa-youtube me-2"></i>
                    </Link>
                  </li>
                </ul>
              </li>

              {token ? (
                <li className="nav-item">
                  <span onClick={logOut} role="button" className="nav-link">
                    LogOut
                  </span>
                </li>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="login">
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
