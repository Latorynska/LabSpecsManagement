import styles from './ButtonComp.module.css';

const ButtonComp = ({ name, id, text, icon, className, customClassName, computerStatus, onClick }) => {
    let customClass;
    switch(computerStatus){
        case 'good' : customClass = styles['btnGood']; break;
        case 'bad' : customClass = styles['btnBad']; break;
        case 'warning' : customClass = styles['btnWarning']; break;
        case 'empty' : customClass = styles['btnEmpty']; break;
        case 'add' : customClass = styles['btnAdd']; break
    }
    return ( 
        <button
            id={id}
            name={name}
            className={`${styles.btnComp} ${customClass}`}
            onClick={onClick}
        >
            {text}
        </button>
     );
}
 
export default ButtonComp;