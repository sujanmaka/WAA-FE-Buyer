import { useEffect, useRef, useState } from "react";
import * as React from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { LOGIN } from "../../constant/constants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAction } from "../../store/config/storeConfig";
import Cookies from "js-cookie";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const BuyerLogin = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);

  const [trigger, setTrigger] = useState(false);

  const search = window.location.search;
  const query = new URLSearchParams(search).get("from");

  const changeTrigger = () => {
    if (props.event) {
      setTrigger(true);
    }
  };

  const doLogin = createAsyncThunk("login", async (userCredentials) => {
    const res = await axios.post(LOGIN, userCredentials);
    return res.data;
  });

  const onLoginRequestHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const userCredentials = {
      userEmail: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    const result = await dispatch(doLogin(userCredentials));

    handleClose();

    if (result.meta.requestStatus === "rejected") {
      Swal.fire({
        icon: "error",
        title: "Invalid User Credentials",
        text: result.error.message,
      });
      setLoading(false);
    } else if (result.payload.type === "success") {
      if (result.payload.role !== "BUYER") {
        Swal.fire({
          icon: "error",
          title: "Invalid User Credentials",
          text: result.error.message,
        });
        setLoading(false);
      } else {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Success",
          showConfirmButton: false,
          timer: 4000,
        });

        dispatch(authAction.loginSuccessful());
        Cookies.set("accessToken", result.payload.token);
        Cookies.set("refreshToken", result.payload.refreshToken);
        Cookies.set("role", result.payload.role);

        setLoading(false);

        if (query !== "") {
          navigate(query);
        } else {
          navigate("/dashboard");
        }
      }
    }
  };

  const isAuthenticated = useSelector(
    (state) => state.auth.isBuyerAuthenticated
  );

  useEffect(() => {
    if (trigger === true && !isAuthenticated) {
      handleClickOpen();
    }
    changeTrigger();
  }, [props.event]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* 

           
            
          </form>
        </div>
      </div> */}

      <form>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Login</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To login, please enter email and password. Submit it pressing the
              Login button.
            </DialogContentText>

            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="E-mail Address"
              type="email"
              ref={emailRef}
              fullWidth
              required
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="password"
              label="Secret Password"
              type="password"
              ref={passwordRef}
              fullWidth
              required
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <button onClick={handleClose} className="btn btn-primary">
              Cancel
            </button>
            {loading === true ? (
              <button className="btn btn-success" disabled>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Requesting Login...
              </button>
            ) : (
              <button
                type="submit"
                onClick={(e) => onLoginRequestHandler(e)}
                className="btn btn-success"
              >
                Login
              </button>
            )}
            <button className="btn btn-danger" type="reset">
              Reset
            </button>
          </DialogActions>
        </Dialog>
      </form>
    </>
  );
};
export default BuyerLogin;
