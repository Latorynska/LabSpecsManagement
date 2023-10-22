const Alert = ({ message, className, }) => {
    return ( 
        <div className={`alert ${className}`}>
            {message}
        </div>
     );
}
 
export default Alert;