import { Link } from 'react-router-dom';
import styles from './ButtonComp.module.css';
import { useDispatch } from 'react-redux';
import { setSelectedComp } from '../../redux/slices/lablayoutSlice';

const ButtonComp = ({ name, id, text, computerStatus, onClick, disabled, to, comp }) => {
    let customClass;
    const dispatch = useDispatch();
    switch(computerStatus){
        case 'good' : customClass = styles['btnGood']; break;
        case 'bad' : customClass = styles['btnBad']; break;
        case 'warning' : customClass = styles['btnWarning']; break;
        case 'empty' : customClass = styles['btnEmpty']; break;
        case 'add' : customClass = styles['btnAdd']; break
    }
    return ( 
        to ? 
            <Link to={to} className='text-decoration-none'>
                <button
                    id={id}
                    name={name}
                    className={`${styles.btnComp} ${customClass}`}
                    onClick={onClick}
                    disabled={disabled ? disabled : false}
                >
                    {text}
                </button>
            </Link> 
        :
            <button
                id={id}
                name={name}
                className={`${styles.btnComp} ${customClass}`}
                onClick={onClick}
                disabled={disabled ? disabled : false}
            >
                {text}
            </button>
     );
}
 
export default ButtonComp;