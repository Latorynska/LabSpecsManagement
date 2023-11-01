import React from 'react';
import backgroundImage from '../../assets/images/404.png';

const NotFound = () => {
    return (
        <div
            className="text-white"
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: '50vh',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right center', 
            }}
        >
            <h1>404</h1>
            <h2>Halaman yang anda cari tidak ada</h2>
        </div>
    );
};

export default NotFound;
