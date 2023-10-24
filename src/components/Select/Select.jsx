import styles from './Select.module.css';

const Select = ({ value, onChange, placeholder, name, className, id, label, options, disabled }) => {
    return (
        <div className="form-group">
            {label && <label className={`form-label ${styles.inputLabel}`} htmlFor={name}>{label}</label> }
            <select
                name={name}
                id={id}
                className={`form-select ${styles.inputBase} ${className ? className : ''}`}
                value={value}
                onChange={onChange}
                disabled={disabled ? disabled : false}
            >
                {placeholder && <option value="">{placeholder}</option>}
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Select;
