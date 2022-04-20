import React from "react";

import Slider from "../../components/dashboard/sliders/sliders";
import Banner from "../../components/dashboard/banner/banner";
import ShoppingProcess from "../../components/dashboard/shopping-process/shopping-process";
import { useDispatch } from "react-redux";
import { cartAction } from "../../store/config/storeConfig";
import Swal from "sweetalert2";
import Products from "../products/products";

const BuyerDashboard = () => {
  const dispatch = useDispatch();

  const addToCart = (e, data) => {
    e.preventDefault();
    data.quantity = 1;
    if (dispatch(cartAction.add(data))) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: data.name + " added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <React.Fragment>
      <Slider />
      <Banner />
      <ShoppingProcess />
      <Products tag={"Products"} cart={addToCart} />
    </React.Fragment>
  );
};
export default BuyerDashboard;
