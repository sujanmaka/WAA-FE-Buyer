import { TextField } from "@mui/material";
import { useRef, useState } from "react";

import axios from "axios";
import { LOGIN } from "../../constant/constants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAction } from "../../store/config/storeConfig";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";

const Login = () => {
  const postFormRef = useRef();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  const search = window.location.search;

  const query = new URLSearchParams(search).get("from");

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

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <h3>User Login</h3>
          <p>
            To login, please enter email and password. Submit it pressing the
            Login button.
          </p>
          <form ref={postFormRef}>
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

            {loading === true ? (
              <button
                className="btn btn-success"
                disabled
                style={{ margin: "10px" }}
              >
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Requesting Login...
              </button>
            ) : (
              <button
                onClick={(e) => onLoginRequestHandler(e)}
                type="submit"
                className="btn btn-success"
                style={{ margin: "10px" }}
              >
                Login
              </button>
            )}
            {loading === false ? (
              <button className="btn btn-danger" type="reset">
                Reset
              </button>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
