import { Link } from "react-router-dom";

const Slider = () => {
  return (
    <div className="slider">
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-8">
            <div className="slider big-slider">
              <div
                id="featured"
                className="carousel slide"
                data-ride="carousel"
              >
                {/* <!-- Indicators --> */}

                <ol className="carousel-indicators">
                  <li
                    data-target="#featured"
                    data-slide-to="0"
                    className="active"
                  ></li>
                </ol>

                {/* <!-- Wrapper for slides --> */}

                <div className="carousel-inner" role="listbox">
                  <div
                    className="item active"
                    style={{
                      backgroundImage: "url('/images/slider-1.jpg')",
                    }}
                  >
                    <div className="carousel-caption">
                      <h4>Save up to 30%</h4>

                      <h2 className="raleway">
                        New collection <span>2016</span>
                      </h2>

                      <Link to="" className="btn btn-theme">
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-4 col-sm-4">
            <div className="slider small-slider">
              <div
                id="small-featured"
                className="carousel slide"
                data-ride="carousel"
              >
                {/* <!-- Indicators --> */}

                <ol className="carousel-indicators">
                  <li
                    data-target="#small-featured"
                    data-slide-to="0"
                    className="active"
                  ></li>
                </ol>

                {/* <!-- Wrapper for slides --> */}

                <div className="carousel-inner" role="listbox">
                  <div
                    className="item active"
                    style={{
                      backgroundImage: "url('/images/slider-small-1.jpg')",
                    }}
                  >
                    <div className="carousel-caption">
                      <h3>Kids Fashion</h3>

                      <p>Save up to 50%</p>

                      <Link to="" className="btn btn-theme">
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Slider;
