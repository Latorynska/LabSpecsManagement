import Button from '../Button/Button';
import styles from './CustomInputWithButton.module.css';

const CustomInputWithButton = ( { value, onChange, onSubmit, type, placeholder, name, className, id, label, labelPosition, disabled, errorHelper } ) => {
    if( labelPosition === "kiri"){
        return (
            <>
                <div className="col-auto">
                    <label className={`form-label ${styles.inputLabel}`} htmlFor={name}>{label}</label>
                </div>
                <div className="col-auto">
                    <input 
                        type={type ? type : "text"} 
                        value={value} 
                        onChange={onChange}
                        placeholder={placeholder} 
                        name={name}
                        className={`form-control ${styles.inputBase} ${className ? className : ''}`}
                        id={id ? id : ''}
                        disabled={disabled ? disabled : false}
                    />
                </div>
                <div className='invalid-feedback d-block'>
                    {errorHelper || ''}
                </div>
            </>
        );
    } else {
        return ( 
            <>
                <label className={`form-label ${styles.inputLabel}`} htmlFor={name}>{label}</label>
                <div className="row">
                    <div className="col-8">
                        <input 
                            type={type ? type : "text"} 
                            value={value} 
                            onChange={onChange}
                            placeholder={placeholder} 
                            name={name}
                            className={`form-control ${styles.inputBase} ${className ? className : ''}`}
                            id={id ? id : ''}
                            disabled={disabled ? disabled : false}
                        />
                    </div>
                    <div className="col-4 d-grid mx-auto">
                        <Button 
                            id="btnSubmitSearchUser"
                            onClick={onSubmit}
                            type="button"
                            text="Search"
                            customClassName={`btnPrimary`}
                            disabled={disabled ? disabled : false}
                        />
                    </div>
                </div>
                <div className='invalid-feedback d-block'>
                    {errorHelper || ''}
                </div>
            </>
        );
    }
}
 
export default CustomInputWithButton;