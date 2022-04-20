import { Link } from "react-router-dom";

const Products = (props) => {
  return (
    <div className="col-md-3 col-sm-4">
      <div className="single-product">
        <div className="product-block">
          <img
            src={props.data.picture}
            alt={props.data.product}
            className="thumbnail"
            height={"300"}
          />

          <div className="product-description text-center">
            <p className="title">{props.data.name}</p>

            <p className="price">$ {props.data.cost}</p>
          </div>

          <div className="product-hover">
            <ul>
              <li>
                <Link to="" onClick={(e) => props.cart(e, props.data)}>
                  <i className="fa fa-cart-arrow-down"></i>
                </Link>
              </li>

              <li>
                <Link to={"/product/" + props.data.id}>
                  <i className="fa fa-arrows-h"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Products;
