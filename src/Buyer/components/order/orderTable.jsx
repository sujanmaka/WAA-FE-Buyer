import axios from "axios";
import { useEffect, useState } from "react";
import { FETCHPRODUCT, GETEXCELREPORT } from "../../constant/constants";

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
      <a href={GETEXCELREPORT+"?orderId="+props.data.id+"&userId="+props.userDetails.id} target="_blank" rel="">Generate Excel Report</a>
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
