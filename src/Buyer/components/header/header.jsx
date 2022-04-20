import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const cart = useSelector((state) => state.cartData.cart);

  const totalAmount = useSelector((state) => state.cartData.totalAmount);

  return (
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-md-3 col-sm-4">
            <div className="logo">
              <Link to="/">
                <img src="/images/logo.png" alt="Orani E-shop" />
              </Link>
            </div>
          </div>

          <div className="col-md-7 col-sm-5">
            <div className="search-form">
              <form className="navbar-form" role="search">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What do you need..."
                  />
                </div>

                <button type="submit" className="btn">
                  <i className="fa fa-search"></i>
                </button>
              </form>
            </div>
          </div>

          <div className="col-md-2 col-sm-3">
            <div className="cart">
              <div className="cart-icon">
                <Link to={"/cart"}>
                  <i className="fa fa-shopping-cart"></i>
                </Link>
              </div>

              <div className="cart-text">
                SHOPPING CART
                <br />
                {cart.length} items - ${totalAmount}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
