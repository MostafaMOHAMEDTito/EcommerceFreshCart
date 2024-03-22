import axios, { Axios } from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { tokenContext } from "../../Context/AuthContext";
import { Helmet } from "react-helmet";



export default function Login() {
  const userData = {
    email: "",
    password: "",
  };
  const {token , setToken }= useContext(tokenContext)

  const navigate = useNavigate();
  const [inErr, setInErr] = useState(false);
  const [inSucc, setInSucc] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  async function mySubmit(values) {
    setisLoading(true);
     await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((suss) => {
        localStorage.setItem("tkn",suss.data.token)
        setToken(suss.data.token)
        setisLoading(false);
        setInSucc(suss.data.user.name);
        setTimeout(() => {
          setInSucc(false);
          navigate("/home");
        }, 3000);
        console.log(suss.data);
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

      if (
        values.email.includes("@") === false ||
        values.email.includes(".") === false
      ) {
        errors.email = "Email must be in format";
      }
      if (values.password.length < 6 || values.password.length > 12) {
        errors.password = "Password must be from 6 to 12 characters";
      }

      return errors;
    },
  });

  return (
    <>
              <Helmet>
      <title>Login</title>
    </Helmet>
      <div className="w-75 m-auto p-5 ">
        <div className="d-flex">
          <h3>Login Now :</h3>
          {inSucc ? (
            <div className="alert-success alert text-center ms-5 ">
              Wellcome {inSucc}
            </div>
          ) : null}
          {inErr ? (
            <div className="alert alert-danger text-center ms-5 w-50">
              {inErr}
            </div>
          ) : null}
        </div>
        <form onSubmit={myFormik.handleSubmit}>
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
              "Login"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
