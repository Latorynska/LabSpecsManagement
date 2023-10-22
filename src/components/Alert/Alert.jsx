const Alert = ({ message, className, type}) => {
    let alertType;
    switch (type) {
        case "success": alertType = "alert-success"; break;
        case "danger": alertType = "alert-danger"; break;
        case "warning": alertType = "alert-warning"; break;
        default: alertType = ""; break;
    }
    return ( 
        <div className={`alert ${className} ${alertType ? alertType : '' }`}>
            {message}
        </div>
     );
}
 
export default Alert;