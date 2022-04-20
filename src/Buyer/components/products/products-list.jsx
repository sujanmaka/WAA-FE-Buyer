import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import Swal from "sweetalert2";
import { FETCHPRODUCTS } from "../../constant/constants";
import { cartAction } from "../../store/config/storeConfig";
import Product from "../../components/products/products";

const ProductList = () => {
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

  const [products, setProducts] = useState([]);

  const fetchItems = () => {
    axios
      .get(FETCHPRODUCTS)
      .then((response) => setProducts(response.data))
      .catch((error) => console.log(error.message));
  };
  useEffect(() => {
    fetchItems();
  }, []);

  const productsDatas = products.map((productData) => {
    return (
      <Product
        cart={addToCart}
        data={productData}
        key={productData.id}
      ></Product>
    );
  });

  return (
    <div className="featured-items">
      <div className="container">
        <div className="row">{productsDatas}</div>
      </div>
    </div>
  );
};
export default ProductList;
