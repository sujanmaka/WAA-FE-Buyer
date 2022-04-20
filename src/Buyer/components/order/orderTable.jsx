import { Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CANCELORDER, FETCHPRODUCT } from "../../constant/constants";
import Cookies from "js-cookie";

const OrderTable = (props) => {
  const [orderProductDetail, setOrderProductDetail] = useState([]);

  const fetchDetail = () => {
    axios
      .get(FETCHPRODUCT + props.data.productId)
      .then((response) => setOrderProductDetail(response.data))
      .catch((error) => console.log(error.message));
  };

  useEffect(() => {
    fetchDetail();
  }, []);
  

  return (
    <tr>
      <th scope="row"></th>
      <td>{props.data.orderDate}</td>
      <td>
        <img
          src={orderProductDetail.picture}
          alt={orderProductDetail.name}
          style={{ height: "100px" }}
        />
        <p style={{ textAlign: "center" }}>{orderProductDetail.name}</p>
      </td>
      <td>{props.data.quantity}</td>
      <td>
        {props.data.status === "CANCEL" ? "CANCELLED" : props.data.status}
      </td>
      <td>
        {props.data.payment === "DUE" && props.data.status === "CANCEL"
          ? "NOT REQUIRED"
          : props.data.payment}
      </td>
      {props.data.status === "CREATED" ? (
        <td>
          <button
            className="btn btn-primary"
            onClick={(e) => props.cancel(e, props.data.id)}
          >
            CANCEL ORDER
          </button>
        </td>
      ) : (
        <button
          disabled
          className="btn btn-primary"
          onClick={(e) => props.cancel(e, props.data.id)}
        >
          CANCELLED
        </button>
      )}
    </tr>
  );
};

export default OrderTable;
