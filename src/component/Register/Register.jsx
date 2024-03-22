import axios, { Axios } from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const userData = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  const navigate = useNavigate();
  const [inErr, setInErr] = useState(false);
  const [inSucc, setInSucc] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  async function mySubmit(values) {
    setisLoading(true);
    const { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((suss) => {
        setisLoading(false);
        setInSucc(true);
        setTimeout(() => {
          setInSucc(false);
          navigate("/login");
        }, 3000);
        console.log(suss);
      })
      .catch((err) => {
        setisLoading(false);
        setInErr(err.response.data.message);
        console.log("Errors : " + err.response.data.message);
        setTimeout(() => {
          setInErr(false);
        }, 3000);
      });
  }

  const myFormik = useFormik({
    initialValues: userData,
    onSubmit: mySubmit,

    validate: function (values) {
      const errors = {};
      const nameRegex = /^[A-Z][a-z]{3,7}$/;
      const phoneRegex = /^01[0125][0-9]{8}$/;
      if (!nameRegex.test(values.name)) {
        errors.name =
          "Name must be 4 to 8 characters starting with a capital letter";
      }
      if (!phoneRegex.test(values.phone)) {
        errors.phone = "Must use Egyptian phone number format";
      }
      if (
        values.email.includes("@") === false ||
        values.email.includes(".") === false
      ) {
        errors.email = "Email must be in format";
      }
      if (values.password.length < 6 || values.password.length > 12) {
        errors.password = "Password must be from 6 to 12 characters";
      }
      if (values.rePassword !== values.password) {
        errors.rePassword = "Password and re-entered password must match";
      }

      return errors;
    },
  });

  return (
    <>
          <Helmet>
      <title>Register</title>
    </Helmet>
      <div className="w-75 m-auto p-5">
        <div className="d-flex">
          <h3>Register Now :</h3>
          {inSucc ? (
            <div className="alert-success alert text-center ms-5 ">
              Congratulation your account has been created
            </div>
          ) : null}
          {inErr ? (
            <div className="alert alert-danger text-center ms-5 w-50">
              {inErr}
            </div>
          ) : null}
        </div>
        <form onSubmit={myFormik.handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            onBlur={myFormik.handleBlur}
            type="text"
            id="name"
            onChange={myFormik.handleChange}
            value={myFormik.values.name}
            className="form-control mb-1"
          />
          {myFormik.errors.name && myFormik.touched.name ? (
            <div className="alert alert-danger">{myFormik.errors.name}</div>
          ) : null}

          <label htmlFor="email">Email:</label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            type="email"
            id="email"
            value={myFormik.values.email}
            className="form-control mb-1"
          />
          {myFormik.errors.email && myFormik.touched.email ? (
            <div className="alert alert-danger">{myFormik.errors.email}</div>
          ) : null}
          <label htmlFor="password">Password:</label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            type="password"
            id="password"
            value={myFormik.values.password}
            className="form-control mb-1"
          />
          {myFormik.errors.password && myFormik.touched.password ? (
            <div className="alert alert-danger">{myFormik.errors.password}</div>
          ) : null}
          <label htmlFor="rePassword">Re-enter Password:</label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            type="password"
            id="rePassword"
            value={myFormik.values.rePassword}
            className="form-control mb-1"
          />
          {myFormik.errors.rePassword && myFormik.touched.rePassword ? (
            <div className="alert alert-danger">
              {myFormik.errors.rePassword}
            </div>
          ) : null}
          <label htmlFor="phone">Phone:</label>
          <input
            onBlur={myFormik.handleBlur}
            onChange={myFormik.handleChange}
            type="text"
            id="phone"
            value={myFormik.values.phone}
            className="form-control mb-1"
          />
          {myFormik.errors.phone && myFormik.touched.phone ? (
            <div className="alert alert-danger">{myFormik.errors.phone}</div>
          ) : null}
          <button
            type="submit"
            className="btn bg-main mt-2 ms-auto d-flex text-white"
          >
            {isLoading ? (
              <ColorRing
                visible={true}
                height="35"
                width="35"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#ffff", "#ffff", "#ffff", "#ffff", "#ffff"]}
              />
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
