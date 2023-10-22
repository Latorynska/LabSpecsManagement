import { customAlert, alertBgPrimary, alertBgWarning, alertBgDanger} from './CardSummaryBox.module.css';

const CardSummaryBox = ({ message, className, type}) => {
    let alertType;
    switch (type) {
        case "success": alertType = alertBgPrimary; break;
        case "danger": alertType = alertBgDanger; break;
        case "warning": alertType = alertBgWarning; break;
        default: alertType = ""; break;
    }
    return ( 
        <div className={`alert ${className ? className : ''} ${alertType ? alertType : '' } ${customAlert}`}>
            {message}
        </div>
     );
}
export default CardSummaryBox;