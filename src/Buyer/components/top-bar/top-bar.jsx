import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { authAction } from "../../store/config/storeConfig";
import BuyerLogin from "../login/buyerLogin";

const TopBar = () => {
  const isAuthenticated = useSelector(
    (state) => state.auth.isBuyerAuthenticated
  );

  const dispatch = useDispatch();

  const [event, setEvent] = useState(true);

  const onLoginClickHandler = () => {
    if (!isAuthenticated) {
      setEvent(!event);
    } else {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      swalWithBootstrapButtons
        .fire({
          title: "Are you sure to Logout?",
          text: "You won't be able to access the portal!!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, Logout !",
          cancelButtonText: "No, cancel!",
          reverseButtons: true,
        })
        .then((result) => {
          if (result.isConfirmed) {
            dispatch(authAction.logout());
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            swalWithBootstrapButtons.fire(
              "Cancelled",
              "Your session is safe :)",
              "error"
            );
          }
        });
    }
  };

  return (
    <div className="top-bar">
      <div className="container">
        <div className="row">
          <div className="col-md-6"></div>

          <div className="col-md-6">
            <div className="action pull-right">
              <ul>
                <li>
                  <button
                    className="btn btn-primary"
                    onClick={() => onLoginClickHandler()}
                  >
                    <i className="fa fa-user"></i>{" "}
                    {isAuthenticated ? "Logout" : "Login"}
                  </button>
                  <BuyerLogin event={event} />
                </li>

                {/* <li>
                  <button className="btn btn-primary">
                    <i className="fa fa-lock"></i> Register
                  </button>
                </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
