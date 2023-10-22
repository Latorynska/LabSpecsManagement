import styles from '../../styles/global.module.css';


const Footer = () => {
    return ( 
        <footer className='mt-5'>
            <nav className={`navbar navbar-expand-lg bg-header ${styles.navbar}`}>
                <a className={`navbar-brand ${styles.navbarText}`} href="#">
                    LabSpecsManagement
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
            </nav>
        </footer>
     );
}
 
export default Footer;