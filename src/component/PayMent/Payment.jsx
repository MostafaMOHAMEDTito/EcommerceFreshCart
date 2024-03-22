import axios from "axios";
import { useFormik } from "formik";
import React, { useContext } from "react";
import { addCart } from "../../Context/AddProductToCart";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Payment() {
  const { cartId, deleteCart } = useContext(addCart);
  const navigate = useNavigate();

  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };

  const validate = (values) => {
    const errors = {};
    const phoneRegex = /^01[0125][0-9]{8}$/;
    if (!phoneRegex.test(values.phone)) {
      errors.phone = "Must use Egyptian phone number format";
    }
    if (values.details.length < 12) {
      errors.details = "Must be more than 12 characters";
    }
    return errors;
  };

  const confirmCashPayment = async (values) => {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        values,
        { headers: { token: localStorage.getItem("tkn") } }
      );

      toast.success("Your payment is successful");

      deleteCart();
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error processing payment. Please check your cart items.");
    }
  };

  const confirmOnlinePayment = async (values) => {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,
        values,
        {
          headers: {
            token: localStorage.getItem("tkn"),
          },
          params: {
            url: "http://localhost:3000",
          },
        }
      ).then((res)=>{
       window.open( res.data.session.url,"_self")
      })
      .catch(()=>{

      })

      toast.success("To online payment");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error processing payment. Please check your cart items.");
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: confirmCashPayment,
    validate,
  });

  return (
    <>
          <Helmet>
        <title>Payment</title>
      </Helmet>
    <div className="container my-2 bg-light">
      <h2>Shipping Address:</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-2">
          <label htmlFor="details" className="d-block">
            Details:
          </label>
          <textarea
            id="details"
            name="details"
            cols="120"
            rows="2"
            className="form-control"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Details..."
          />
          {formik.errors.details && formik.touched.details && (
            <div className="alert alert-danger">{formik.errors.details}</div>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="phone" className="d-block">
            Phone:
          </label>
          <input
            id="phone"
            type="text"
            className="form-control"
            name="phone"
            placeholder="Phone..."
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone && (
            <div className="alert alert-danger">{formik.errors.phone}</div>
          )}
        </div>

        <div className="mb-2">
          <label htmlFor="city" className="d-block">
            City:
          </label>
          <input
            id="city"
            type="text"
            className="form-control"
            name="city"
            placeholder="City..."
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>

        <button type="submit" className="btn bg-main my-3">
          Confirm cash payment
        </button>
        <button
          type="button"
          className="btn bg-main my-3 mx-3"
          onClick={() => confirmOnlinePayment(formik.values)}
        >
          Confirm online payment
        </button>
      </form>
    </div></>
  );
}
