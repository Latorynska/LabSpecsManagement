import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import styles from './Button.module.css';

const Button = ({ type, text, icon, onClick, className, customClassName, id }) => {
    const customClass = customClassName ? styles[customClassName] : '';
    let iconToDisplay = faChevronRight; // Default icon
    switch (icon) {
        case 'right':
            iconToDisplay = faChevronRight;
            break;
        case 'left':
            iconToDisplay = faChevronLeft;
            break;
        default:
            iconToDisplay = null; // Use null for no icon
    }
    return (
        <button
            type={type || 'button'} // Use a default value if type is not provided
            className={`btn btn-primary ${icon ? 'd-flex align-items-center' : ''} ${className || ''} ${customClass}`}
            id={id || ''}
            onClick={onClick}
        >
            {icon === 'left' && (
                <FontAwesomeIcon icon={iconToDisplay} className={`ml-2 ${styles.icon}`} />
            )}
            {text}
            {icon === 'right' && (
                <FontAwesomeIcon icon={iconToDisplay} className={`ml-2 ${styles.icon}`} />
            )}
        </button>
    );
}

export default Button;
