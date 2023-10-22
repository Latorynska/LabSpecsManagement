import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import styles from './Button.module.css';

const Button = ({ type, text, icon, onClick, className, customClassName, id }) => {
    const customClass = customClassName ? styles[customClassName] : '';
    let iconToDisplay = faChevronRight; // Default icon
    switch (icon) {
        case 'right':
            iconToDisplay = faChevronRight;
            break;
        default:
            iconToDisplay: ''
    }
    return (
        <button
            type={type ? type : 'button'}
            className={`btn btn-primary d-flex align-items-center ${className || ''} ${customClass}`}
            id={id || ''}
            onClick={onClick}
        >
            {text}
            {icon && 
                <FontAwesomeIcon icon={iconToDisplay} className={`ml-2 ${styles.icon}`} />
            }
        </button>
    );
}

export default Button;
