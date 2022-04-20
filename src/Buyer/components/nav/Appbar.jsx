import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AppBar = () => {

  const isAuthenticated = useSelector(state=>state.auth.isBuyerAuthenticated);

  return (
    <div className="navigation">
      <nav className="navbar navbar-theme">
        <div className="container">
          <div className="navbar-header">
            <button
              type="button"
              className="navbar-toggle collapsed"
              data-toggle="collapse"
              data-target="#navbar"
              aria-expanded="false"
            >
              <span className="sr-only">Menu</span>

              <span className="icon-bar"></span>

              <span className="icon-bar"></span>

              <span className="icon-bar"></span>
            </button>
          </div>

          {isAuthenticated ? (
            <div className="shop-category nav navbar-nav navbar-left">
              <div className="btn-group">
                <button
                  type="button"
                  className="btn btn-shop-category dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Account <span className="caret"></span>
                </button>

                <ul className="dropdown-menu">
                  <li>
                    <Link to="">Profile</Link>
                  </li>

                  <li>
                    <Link to="">Security</Link>
                  </li>

                  <li>
                    <Link to="/orders">Orders</Link>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}

          <div className="collapse navbar-collapse" id="navbar">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="dashboard">Home</Link>
              </li>

              <li>
                <Link to="products">Products</Link>
              </li>

              <li>
                <Link to="#">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AppBar;
