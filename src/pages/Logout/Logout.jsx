import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/thunks/authAPI";

const Logout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutUser());
    }, []);
    return ( 
        <>

        </>
     );
}
 
export default Logout;