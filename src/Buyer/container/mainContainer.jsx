import { Fragment } from "react";

import BuyerRoutes from "../routes/buyerRoutes/buyerRoutes";
import MainHeader from "./header/header";
import Footer from "./footer/footer";

const MainContainer = () => {
  let MainContainerJSX = (
    <Fragment>
      <MainHeader />
      <BuyerRoutes />
      <Footer />
    </Fragment>
  );

  return MainContainerJSX;
};
export default MainContainer;
