import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import styles from "../styles/global.module.css";

const Layout = ( { children } ) => {
    return ( 
        <>
            <Header />
            <main>
                { children }
            </main>
            <Footer />
        </>
     );
}
 
export default Layout;