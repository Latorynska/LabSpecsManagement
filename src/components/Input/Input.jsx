import styles from './input.module.css';

const Input = ({ value, onChange, type, placeholder, name, className, id, label, labelPosition, inputGroupText }) => {
    if (labelPosition === "kiri") {
        return (
            <>
                <div className="row">
                    <div className="col-auto">
                        <label className={`form-label ${styles.inputLabel}`} htmlFor={name}>{label}</label>
                    </div>
                    <div className="col">
                        <div className="input-group">
                            <input
                                type={type ? type : "text"}
                                value={value}
                                onChange={onChange}
                                placeholder={placeholder}
                                name={name}
                                className={`form-control ${styles.inputBase} ${className ? className : ''}`}
                                id={id ? id : ''}
                            />
                            {inputGroupText && (
                                    <span className={`input-group-text ${styles.suffixStyle}`}>{inputGroupText}</span>
                            )}
                        </div>
                    </div>
                </div>
            </>
        );
    } else {
        return (
            <>
                <label className={`form-label ${styles.inputLabel}`} htmlFor={name}>{label}</label>
                <div className="input-group">
                    <input
                        type={type ? type : "text"}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        name={name}
                        className={`form-control ${styles.inputBase} ${className ? className : ''}`}
                        id={id ? id : ''}
                    />
                    {inputGroupText && (
                            <span className={`input-group-text ${styles.suffixStyle}`}>{inputGroupText}</span>
                    )}
                </div>
            </>
        );
    }
}

export default Input;
