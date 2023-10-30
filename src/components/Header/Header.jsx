import { useEffect, useState } from 'react';
import styles from '../../styles/global.module.css';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Header = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const links = user
        ? [
            {
                label: 'Dashboard',
                url: '/dashboard',
            },
            {
                label: 'Manage',
                url: '/manage',
            },
            // {
            //     label: 'Profile',
            //     url: '/profile',
            // },
            {
                label: 'Logout',
                url: '/logout',
            },
        ]
        : [
            {
                label: 'Register',
                url: '/register',
            },
            {
                label: 'Login',
                url: '/login',
            },
        ];

    return (
        <header>
            <nav className={`navbar navbar-expand-lg bg-header ${styles.navbar}`}>
                <Link to='/' className="navbar-brand">
                    <img src="#" alt="LSM" width="30" height="30" className={`d-inline-block align-text-top ${styles.navbarText}`} />
                </Link>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {links.map((item, key) => (
                            <li className="nav-item" key={key}>
                                <Link to={item.url} className={`nav-link ${styles.navbarText}`}>
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
