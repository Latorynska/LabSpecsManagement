import styles from './input.module.css';

const Input = ({ value, onChange, type, placeholder, name, className, id, label, labelPosition, inputGroupText, disabled, errorHelper }) => {
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
                                disabled={disabled ? disabled : false}
                            />
                            {inputGroupText && (
                                    <span className={`input-group-text ${styles.suffixStyle}`}>{inputGroupText}</span>
                            )}
                        </div>
                    </div>
                    <div className='invalid-feedback d-block'>
                        {errorHelper || ''}
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
                        className={`form-control ${styles.inputBase} ${className ? className : ''} mb-0`}
                        id={id ? id : ''}
                        disabled={disabled ? disabled : false}
                    />
                    {inputGroupText && (
                            <span className={`input-group-text ${styles.suffixStyle}`}>{inputGroupText}</span>
                    )}
                </div>
                <div className='invalid-feedback d-block'>
                    {errorHelper || ''}
                </div>
            </>
        );
    }
}

export default Input;
