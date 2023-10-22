import styles from './input.module.css';

const Input = ( { value, onChange, type, placeholder, name, className, id, label, labelPosition } ) => {
    if( labelPosition === "kiri"){
        return (
            <>
                <div className="row">
                    <div className="col-auto">
                        <label className={`form-label ${styles.inputLabel}`} htmlFor={name}>{label}</label>
                    </div>
                    <div className="col">
                        <input 
                            type={type ? type : "text"} 
                            value={value} 
                            onChange={onChange}
                            placeholder={placeholder} 
                            name={name}
                            className={`form-control ${styles.inputBase} ${className ? className : ''}`}
                            id={id ? id : ''}
                        />
                    </div>
                </div>
            </>
        );
    } else {
        return ( 
            <>
                <label className={`form-label ${styles.inputLabel}`} htmlFor={name}>{label}</label>
                <input 
                    type={type ? type : "text"} 
                    value={value} 
                    onChange={onChange}
                    placeholder={placeholder} 
                    name={name}
                    className={`form-control ${styles.inputBase} ${className ? className : ''}`}
                    id={id ? id : ''}
                />
            </>
        );
    }
}
 
export default Input;