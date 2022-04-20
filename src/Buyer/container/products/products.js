import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Product from "../../components/products/products";
import { FETCHPRODUCTS } from "../../constant/constants"


const Products = (props) => {

    const [products, setProducts] = useState([]);

    const fetchItems = () => {
        axios.get(FETCHPRODUCTS)
            .then(response => setProducts(response.data))
            .catch(error => console.log(error.message));
    };
    useEffect(() => {
        fetchItems();
    }, []);

    const productsDatas = products.map((productData) => {
        return (
            <Product cart={props.cart} data={productData} key={productData.id}></Product>
        )
    })



    return (
        <div className="featured-items">
            <div className="container">
                <div className="row">
                    <ul className="nav nav-tabs nav-product-tabs">
                        <li className="active">
                            <Link to="#trending" data-toggle="tab">
                                {props.tag}
                            </Link>
                        </li>

                    </ul>

                    <div className="tab-content">
                        <div className="tab-pane active" id="trending">

                            {/* trending items goes here */}

                            {productsDatas}

                            {/* trending items ends here */}

                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}
export default Products;