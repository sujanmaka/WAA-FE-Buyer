import { useSelector } from "react-redux";
import CartDetail from "../../components/cart/cart";
import "./cart.css";
import { useNavigate } from 'react-router';
import { useRef } from "react";
import Swal from "sweetalert2";

const Cart = () => {

    const cart = useSelector(state => state.cartData.cart);
    const totalAmount = useSelector(state => state.cartData.totalAmount);
    const shippingCost = Math.ceil(0.0025 * totalAmount);
    const tax = Math.ceil(0.07 * totalAmount);
    const total = totalAmount + shippingCost + tax;
    const isAuthenticated = useSelector(state => state.auth.isBuyerAuthenticated);
    const formRef = useRef();

    const navigate = useNavigate();

    const checkoutClickHandler = (e) => {
        e.preventDefault();
        if (formRef.current["cname"].value === "" || formRef.current["cnum"].value === "" || formRef.current["exp"].value === "" || formRef.current["cvv"].value === "") {
            Swal.fire({
                icon: "error",
                title: "Invalid Card Details Provided",
                text: "Please Enter all card details. It's required",
            });
        }
        else {

            if (!isAuthenticated) {
                navigate("/login?from=/billing")
            } else {
                navigate("/billing");
            }
        }
    }


    const carts = cart.map(data => {
        return (<CartDetail productData={data} key={data.id}></CartDetail>);
    });

    let cartJSX = (
        <>

            <section className="pt-5 pb-5">
                <div className="container">
                    <div className="row w-100">
                        <div className="col-lg-12 col-md-12 col-12">
                            <h3 className="display-5 mb-2 text-center">Shopping Cart</h3>
                            <p className="mb-5 text-center">
                                <i className="text-info font-weight-bold">{cart.length}</i> items in your cart</p>
                            <table id="shoppingCart" className="table table-condensed table-responsive">
                                <thead>
                                    <tr>
                                        <th style={{ "width": "60%" }}>Product</th>
                                        <th style={{ "width": "10%" }}>Unit Price</th>
                                        <th style={{ "width": "10%" }}>Quantity</th>
                                        <th style={{ "width": "10%" }}>Total</th>
                                        <th style={{ "width": "16%" }}></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {carts}


                                </tbody>
                            </table>

                        </div>
                    </div>

                </div>
            </section>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="row">
                                <div className="col-lg-5">
                                    <form ref={formRef}>
                                        <div className="row px-2">
                                            <div className="form-group col-md-6"> <label className="form-control-label">Name on Card</label> <input type="text" id="cname" name="cname" placeholder="Johnny Doe" /> </div>
                                            <div className="form-group col-md-6"> <label className="form-control-label">Card Number</label> <input type="text" id="cnum" name="cnum" placeholder="1111 2222 3333 4444" /> </div>
                                        </div>
                                        <div className="row px-2">
                                            <div className="form-group col-md-6"> <label className="form-control-label">Expiration Date</label> <input type="text" id="exp" name="exp" placeholder="MM/YYYY" /> </div>
                                            <div className="form-group col-md-6"> <label className="form-control-label">CVV</label> <input type="text" id="cvv" name="cvv" placeholder="***" /> </div>
                                        </div>
                                        <button className="btn-block btn-blue" onClick={(e) => checkoutClickHandler(e)}> <span> <span id="checkout">Checkout</span> <span id="check-amt">${total}</span> </span> </button>
                                    </form>
                                </div>

                                <div className=" col-lg-4 mt-2 " style={{ "float": "right" }}>
                                    <div className="row d-flex justify-content-between px-4">
                                        <p className="mb-1 text-left">Subtotal</p>
                                        <h6 className="mb-1 text-right">${totalAmount}</h6>
                                    </div>
                                    <div className="row d-flex justify-content-between px-4">
                                        <p className="mb-1 text-left">Shipping</p>
                                        <h6 className="mb-1 text-right">${shippingCost}</h6>
                                    </div>
                                    <div className="row d-flex justify-content-between px-4">
                                        <p className="mb-1 text-left">Tax (7%)</p>
                                        <h6 className="mb-1 text-right">${tax}</h6>
                                    </div>
                                    <div className="row d-flex justify-content-between px-4" id="tax">
                                        <p className="mb-1 text-left">Total (tax included)</p>
                                        <h6 className="mb-1 text-right">${total}</h6>
                                    </div><button className="btn-block btn-blue"> <span><span id="checkout">Continue Shopping</span> </span> </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
    if (cart.length === 0) {
        cartJSX = (
            <section className="pt-5 pb-5">
                <div className="container">
                    <div className="row w-100">
                        <div className="col-lg-12 col-md-12 col-12">
                            <h3 className="display-5 mb-2 text-center">Shopping Cart</h3>
                            <p className="mb-5 text-center">
                                <i className="text-info font-weight-bold">{cart.length}</i> items in your cart</p>
                        </div></div></div></section>
        )
    }
    return cartJSX;
}
export default Cart;