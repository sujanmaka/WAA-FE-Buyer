import { TextField } from "@mui/material";
import axios from "axios";
import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  FETCHFOLLOWSELLER,
  FETCHPRODUCT,
  POSTREVIEW,
  PUTFOLLOWERFORBUYER,
} from "../../constant/constants";
import Products from "../../container/products/products";
import { cartAction } from "../../store/config/storeConfig";
import Cookies from "js-cookie";
import Review from "./review";

const ProductDetail = () => {
  const dispatch = useDispatch();

  const param = useParams();

  const qtyRef = useRef();

  const reviewRef = useRef();

  let productId = param.productID;

  const [productDetail, setProductDetail] = useState([]);

  const [follow, setFollow] = useState(false);

  const [flag, setFlag] = useState(false);

  const [loading, setLoading] = useState(false);

  const[reviews,setReviews] = useState([]);

  const[seller,setSeller]=useState([]);

  const isAuthenticated = useSelector(
    (state) => state.auth.isBuyerAuthenticated
  );

  const fetchProductData = async () => {
    await axios
      .get(FETCHPRODUCT + productId)
      .then((response) => {
        setProductDetail(response.data);
        setReviews(response.data.reviews);
        setSeller(response.data.sellerDto);
      })
      .catch((error) => console.log(error.message));
  };


  const fetchSellerFollower = async () => {
    await axios
      .get(FETCHFOLLOWSELLER + "?sellerId=" + seller.id, {
        headers: headerData,
      })
      .then((response) => {
        setFollow(response.data);
      })
      .catch((error) => console.log(error.message));
  };

  const headerData = {
    Authorization: Cookies.get("accessToken"),
    "Content-Type": "application/json",
  };

  const onCommentHandler = async (e) => {
    e.preventDefault();
    if (e.keyCode === 13) {
      if (reviewRef.value === "") {
        Swal.fire({
          icon: "error",
          title: "Oops...Cannot post empty field",
          text: "Review must not be empty for post!!!It's required!!",
        });
      } else {
        const commentData = {
          title: e.target.value,
          content: e.target.value,
          productId: productId,
        };
        try {
          await axios.post(POSTREVIEW, commentData, { headers: headerData });
          Swal.fire("Commented", "Your review has been posted.", "success");
          reviewRef.value = "";
          setFlag(!flag);
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...Problem Saving Comment!!!",
            text: error.message,
          });
        }
      }
    }
  };

  const getSellerFollowUnfollowHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      sellerId: productDetail.sellerDto.id,
      follow: !follow,
    };

    try {
      await axios.put(PUTFOLLOWERFORBUYER, data, { headers: headerData });
      setFlag(!flag);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProductData();
    fetchSellerFollower();
  }, [productId, flag]);

  const addToCart = (e) => {
    e.preventDefault();
    productDetail.quantity = parseInt(qtyRef.current.value);

    if (dispatch(cartAction.add(productDetail))) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: productDetail.name + " added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const executeSub = () => {
    if (qtyRef.current.value === "NaN") {
      qtyRef.current.value = 0;
    }
    if (qtyRef.current.value > 0) {
      qtyRef.current.value = qtyRef.current.value - 1;
    }
  };

  const executeAdd = () => {
    if (qtyRef.current.value === "NaN") {
      qtyRef.current.value = 0;
    }
    const data = qtyRef.current.value;
    qtyRef.current.value = parseInt(data) + 1;
  };

  const addToCartFromRelated = (e, data) => {
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

  let FBUTTON = "";

  if (loading === true && follow === false) {
    FBUTTON = (
      <button disabled className="btn btn-success">
        Following Seller
      </button>
    );
  } else if (loading === false && follow === false) {
    FBUTTON = (
      <button
        className="btn btn-success"
        onClick={(e) => getSellerFollowUnfollowHandler(e)}
      >
        Follow Seller
      </button>
    );
  } else if (loading === false && follow === true) {
    FBUTTON = (
      <button
        className="btn btn-danger"
        onClick={(e) => getSellerFollowUnfollowHandler(e)}
      >
        Unfollow Seller
      </button>
    );
  } else if (loading === true && follow === true) {
    FBUTTON = (
      <button disabled className="btn btn-danger">
        Unfollowing Seller
      </button>
    );
  }
 
    const dataForReview = reviews.map((data) => {
      return <Review data={data} key={data.id}></Review>;
    });
  

  return (
    <Fragment>
      {/* <BreadCums data={data} /> */}
      <div className="short-description">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="product-thumbnail">
                <div className="col-md-10 col-sm-10 col-xs-10">
                  <div className="thumb-main-image">
                    <Link to="">
                      <img src={productDetail.picture} alt="" />
                    </Link>
                  </div>
                </div>
              </div>

              <div className="clearfix"></div>
            </div>

            <div className="col-md-6">
              <h1 className="product-title">{productDetail.name}</h1>

              <div className="ratings">
                <i className="fa fa-star"></i>

                <i className="fa fa-star"></i>

                <i className="fa fa-star"></i>

                <i className="fa fa-star"></i>

                <i className="fa fa-star"></i>

                <span className="vote-count">
                  {productDetail.rating} rating
                </span>
              </div>

              <div className="product-info">
                <span className="product-avilability">
                  <span className="strong-text">Availability:</span>
                  {productDetail.quantity > 0 ? "Stock" : "Out of Stock"}
                </span>
              </div>

              <p className="short-info">
                It's an {productDetail.productIndex} item
              </p>

              <div className="price">
                <span>${productDetail.cost}</span>
              </div>

              <form action="" className="purchase-form">
                <div className="qt-area">
                  <i className="fa fa-minus" onClick={() => executeSub()}></i>

                  <input
                    name="quantity"
                    className="qt"
                    defaultValue={1}
                    ref={qtyRef}
                  />

                  <i className="fa fa-plus" onClick={() => executeAdd()}></i>
                </div>

                <button
                  className="btn btn-theme"
                  type="submit"
                  onClick={(e) => addToCart(e)}
                >
                  Add to cart
                </button>
              </form>

              <p>
                <span className="strong-text">Categories:</span>{" "}
                {productDetail.category}
              </p>

              <p>
                <span className="strong-text">Tags:</span> {productDetail.tags}
              </p>
              <p>
                <span className="strong-text">
                  Seller :{" "}
                  {productDetail.sellerDto ? productDetail.sellerDto.name : ""}
                </span>
                <span style={{ marginLeft: "10px" }}>
                  {isAuthenticated ? FBUTTON : ""}
                </span>
              </p>
              <TextField
                id="comment"
                ref={reviewRef}
                label="Add review and press enter to save review"
                variant="standard"
                fullWidth
                onKeyUp={(e) => onCommentHandler(e)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="single-product-tabs">
            <ul className="nav nav-tabs nav-single-product-tabs">
              <li className="active">
                <Link to="" data-toggle="tab">
                  Product Description
                </Link>
              </li>
            </ul>

            <div className="tab-content">
              <div className="tab-pane active" id="reviews">
                <div className="product-desc">
                  <p>{productDetail.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="single-product-tabs">
            <ul className="nav nav-tabs nav-single-product-tabs">
              <li className="active">
                <Link to="" data-toggle="tab">
                  Product Reviews
                </Link>
              </li>
            </ul>

            <div className="tab-content">
              <div className="tab-pane active" id="reviews">
                <div className="product-desc">
                  {/* <Review id={productId} flag={flag}/> */}
                  {dataForReview}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Products tag={"related products"} cart={addToCartFromRelated} />
    </Fragment>
  );
};
export default ProductDetail;
