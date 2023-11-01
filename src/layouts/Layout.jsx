import { getAuth } from "firebase/auth";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import "../styles/global.module.css";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Layout = ( { children } ) => {
    const auth = getAuth();
    const userData = useSelector(state => state.auth.userData);
    useEffect(() => {
        if (auth.currentUser && !userData) {
            dispatch(loadUserData(auth.currentUser.uid))
              .then(() => {
              })
              .catch((error) => {
                console.error('Failed to load user data:', error);
              });
          } else {

          }
    }, [auth]);
    
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