import Header from "../../components/header/header";
import TopBar from "../../components/top-bar/top-bar";
import AppBar from "../../components/nav/Appbar";


const MainHeader = () => {

    let headerJSX = (
        <>
            <TopBar />
            <Header />
            <AppBar />
        </>
    );

    return headerJSX;
}
export default MainHeader;