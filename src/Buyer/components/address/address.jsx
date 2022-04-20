import { TextField } from "@mui/material";
import axios from "axios";

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { POSTORDER } from "../../constant/constants";
import {useNavigate} from "react-router";
import { cartAction } from "../../store/config/storeConfig";


const Address = () => {
  const postFormRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const headerData = {
    Authorization: Cookies.get("accessToken"),
    "Content-Type": "application/json",
  };

  const cart = useSelector((state) => state.cartData.cart);

  const onSubmitRequestHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      name: postFormRef.current["name"].value,
      street: postFormRef.current["street"].value,
      contact: postFormRef.current["contact"].value,
      apartment: postFormRef.current["apartment"].value,
      city: postFormRef.current["city"].value,
      state: postFormRef.current["state"].value,
      zip: postFormRef.current["zip"].value,
    };

    if (
      data.name === "" ||
      data.street === "" ||
      data.contact === "" ||
      data.apartment === "" ||
      data.city === "" ||
      data.state === "" ||
      data.zip === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "All data fields are required !!!",
        text: "Please fill all fields and try again",
      });
      setError(true);
      setLoading(false);
    } else {

      const address = {
        street: data.street,
        city: data.city,
        state: data.state,
        zipCode: data.zip,
      };

      const allCartData = [];

      cart.map((value,index)=>{
        allCartData.push({"productId":value.id,"quantity":value.quantity,"shippingAddress":address,"billingAddress":address});
      })
       
        await axios.post(POSTORDER, allCartData, { headers: headerData })
        .then(response=>
          {
        Swal.fire({
          icon: "success",
          title: "Great",
          text: "Your order has been confirmed !! Have a wonderful day",
        });
        setLoading(false);
        dispatch(cartAction.reset());

        navigate("/orders");
        
      })
      .catch((error)=> {
        Swal.fire({
          icon: "error",
          title: "Error confirming order",
          text: error.message,
        });
      setLoading(false);
      })
    }
  };

  return (
    <div className="featured-items">
      <div className="container">
        <div className="row">
          <div className="tab-content"></div>
          <div className="col-lg-6">
            {loading === true ? (
              <button
                className="btn btn-primary"
                style={{ margin: "5px" }}
                disabled
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Confirming order ....
              </button>
            ) : (
              <button
                onClick={(e) => onSubmitRequestHandler(e)}
                type="submit"
                className="btn btn-primary"
                style={{ margin: "5px" }}
              >
                Confirm Order
              </button>
            )}
            <button className="btn btn-danger" type="reset">
              Reset Address
            </button>
            <h3>Shipping Address Details</h3>
            <p>
              Please Enter Shipping Address Details with proper street and
              building number . We will not accept physical address , provide
              full address.
            </p>

            <form ref={postFormRef}>
              <TextField
                autoFocus
                id="name"
                label="Contact Person Name"
                type="text"
                required
                variant="standard"
              />
              <TextField
                id="street"
                label="Street No./Name"
                type="text"
                required
                variant="standard"
              />
              <TextField
                id="contact"
                label="Contact Number"
                type="number"
                required
                variant="standard"
              />

              <TextField
                id="apartment"
                label="Apartment Number or Suite Number (if applicable)"
                type="text"
                required
                fullWidth
                variant="standard"
              />
              <TextField
                id="city"
                label="City"
                type="text"
                required
                variant="standard"
              />
              <TextField
                id="state"
                label="State"
                type="text"
                required
                variant="standard"
              />
              <TextField
                id="zip"
                label="ZipCode"
                type="number"
                required
                variant="standard"
              />
            </form>
            <h3>Billing Address Details</h3>
            <p>
              Please Enter Billing Address Details with proper street and
              building number . We will not accept physical address , provide
              full address.
            </p>

            <form ref={postFormRef}>
              <TextField
                autoFocus
                id="name"
                label="Contact Person Name"
                type="text"
                required
                variant="standard"
              />
              <TextField
                id="street"
                label="Street No./Name"
                type="text"
                required
                variant="standard"
              />
              <TextField
                id="contact"
                label="Contact Number"
                type="number"
                required
                variant="standard"
              />

              <TextField
                id="apartment"
                label="Apartment Number or Suite Number (if applicable)"
                type="text"
                required
                fullWidth
                variant="standard"
              />
              <TextField
                id="city"
                label="City"
                type="text"
                required
                variant="standard"
              />
              <TextField
                id="state"
                label="State"
                type="text"
                required
                variant="standard"
              />
              <TextField
                id="zip"
                label="ZipCode"
                type="number"
                required
                variant="standard"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Address;
