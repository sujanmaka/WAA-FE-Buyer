import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <div className="footer">

                <div className="container">

                    <div className="row">

                        <div className="col-md-3 col-sm-3">

                            <div className="single-widget">

                                <h2 className="widget-title">About Us</h2>

                                <div className="widget-inner">

                                    <p>Office: 868 Fake Street, New York</p>

                                    <p>Phone: (08) 8827 633354</p>

                                    <p>Fax: 08) 08 4752 1499</p>

                                    <p>Email: mail@yourdomain.com</p>

                                    <img src="/images/payment.png" alt="we accept" />

                                </div>

                            </div>

                        </div>

                        <div className="col-md-3 col-sm-3">

                            <div className="single-widget">

                                <h2 className="widget-title">Information</h2>

                                <div className="widget-inner">

                                    <ul>

                                        <li><Link to="">Frequently Asked Question</Link></li>

                                        <li><Link to="">Terms and Condition</Link></li>

                                        <li><Link to="">Privacy Policy</Link></li>

                                        <li><Link to="">Customer Service</Link></li>

                                        <li><Link to="">Delivery Information</Link></li>

                                        <li><Link to="">Manufacturers</Link></li>

                                    </ul>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-3 col-sm-3">

                            <div className="single-widget">

                                <h2 className="widget-title">Customer Care</h2>

                                <div className="widget-inner">

                                    <ul>

                                        <li><Link to="">Contact Us</Link></li>

                                        <li><Link to="">Sitemap</Link></li>

                                        <li><Link to="">Gift Vouchers</Link></li>

                                        <li><Link to="">Live Chat 24x7</Link></li>

                                    </ul>

                                </div>

                            </div>

                        </div>

                        <div className="col-md-3 col-sm-3">

                            <div className="single-widget">

                                <h2 className="widget-title">Our Services</h2>

                                <div className="widget-inner">

                                    <ul>

                                        <li><Link to="">Shipping and Returns</Link></li>

                                        <li><Link to="">Secure Shopping</Link></li>

                                        <li><Link to="">International Shipping</Link></li>

                                        <li><Link to="">Affiliates</Link></li>

                                        <li><Link to="">Contact</Link></li>

                                    </ul>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className="copyright text-center">

                <div className="container">

                    <div className="row">

                        <p className="copyright"> Shared by <i className="fa fa-love"></i><Link to="https://bootstrapthemes.co">BootstrapThemes</Link>
                        </p>

                    </div>

                </div>

            </div>

        </>

    )

}
export default Footer;