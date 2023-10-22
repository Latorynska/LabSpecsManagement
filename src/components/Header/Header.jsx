import { useEffect } from 'react';
import styles from '../../styles/global.module.css';

const Header = () => {
    useEffect(() => {
        console.log(styles);
    }, []);
    return ( 
        <header>
            <nav className={`navbar navbar-expand-lg bg-header ${styles.navbar}`}>
                <a className="navbar-brand" href="#">
                    <img src="#" alt="LSM" width="30" height="30" className={`d-inline-block align-text-top ${styles.navbarText}`} />
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <a className={`nav-link ${styles.navbarText}`} href="#">Login</a>
                    </li>
                </ul>
                </div>
            </nav>
        </header>
     );
}
 
export default Header;