import React from 'react';
import styles from './TextArea.module.css';

const TextArea = ({ value, onChange, placeholder, name, className, id, label, rows, disabled, errorHelper }) => {
    return (
        <div className="form-group">
            <label className={`form-label ${styles.inputLabel}`} htmlFor={name}>
                {label}
            </label>
            <textarea
                name={name}
                id={id}
                className={`form-control ${styles.inputBase} ${className ? className : ''}`}
                value={value}
                onChange={onChange}
                rows={rows || 3}
                placeholder={placeholder}
                disabled={disabled ? disabled : false}
            />
            <div className='invalid-feedback d-block'>
                {errorHelper || ''}
            </div>
        </div>
    );
};

export default TextArea;
