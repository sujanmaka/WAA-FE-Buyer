import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {
  CANCELORDER,
  GETACTIVEUSER,
  GETORDERS,
} from "../../constant/constants";
import Swal from "sweetalert2";
import { FETCHPRODUCT } from "../../constant/constants";
import OrderTable from "./orderTable";
import {useNavigate} from "react-router-dom"

const OrderDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userDetail, setUserDetail] = useState([]);
  const navigate = useNavigate();
  
  const headerData = {
    Authorization: Cookies.get("accessToken"),
    "Content-Type": "application/json",
  };

  const fetchOrders = () => {
    setLoading(true);
    axios
      .get(GETORDERS, { headers: headerData })
      .then((response) => {
        setOrders(response.data);
        listOrderData();
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);

        Swal.fire({
          icon: "error",
          title: "Error in loading data",
          text: error.message,
        });
      });
  };

  const fetchUserDetail = () => {
    axios
      .get(GETACTIVEUSER, { headers: headerData })
      .then((response) => setUserDetail(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchOrders();
    fetchUserDetail();
  }, []);

  const listOrderData = () => {
    orders.map((data, index) => {
      axios
        .get(FETCHPRODUCT + data.productId)
        .then((response) => {
          setOrders(...orders, response.data);
        })
        .catch((error) => {
          console.log(error.message);
        });
    });
  };

  const cancelOrderHandler = async (e, id) => {
    e.preventDefault();
    console.log(id);
    await axios.put(CANCELORDER + id + "/cancel", null,{ headers: headerData }).then(respose=>{
       Swal.fire({
         position: "top-end",
         icon: "success",
         title: "Order Cancelled",
         showConfirmButton: false,
         timer: 1500,
       });
      navigate("/orderdashboard");
    })
  };

  let orderJSX = (
    <div className="container">
      <div className="row">
        <div className="">Total Rewards : {userDetail.rewardPoint}</div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Ordered Date</th>
              <th scope="col">Product Name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Order Status</th>
              <th scope="col">Payment Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((data) => (
              <OrderTable
                data={data}
                key={data.id}
                cancel={cancelOrderHandler}
              ></OrderTable>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (loading === true) {
    orderJSX = (
      <div>
        <p>Loading...</p>
      </div>
    );
  }

  return orderJSX;
};
export default OrderDashboard;
