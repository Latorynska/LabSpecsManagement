import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUserData, loginUser } from '../../redux/thunks/authAPI';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { loginTitle, loginContainer, loginSubTitle, inputBox, inputItem, linkItem, loginText, secondary } from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        // If user data exists, redirect to /dashboard
        if (userData) {
            navigate('/dashboard');
        }
    }, [userData, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleLogin = (e) => {
        e.preventDefault();
        console.log('submitted');
        dispatch(loginUser(formData));
    };

    return (
        <>
        <div className={`${loginContainer}`}>
            <form onSubmit={handleLogin}>
            <p className={`${loginTitle}`}>Selamat Datang</p>
            <p className={`${loginSubTitle}`}>Masukkan informasi anda sebagai pengelola</p>
            <div className={`${inputBox}`}>
                <div className={`${inputItem}`}>
                <Input
                    label={`email`}
                    name="email"
                    placeholder={`Masukkan Email`}
                    value={formData.email}
                    onChange={handleInputChange}
                />
                </div>
                <div className={`${inputItem}`}>
                <Input
                    label={`Password`}
                    name="password"
                    type={`password`}
                    placeholder={`Password`}
                    value={formData.password}
                    onChange={handleInputChange}
                />
                </div>
                <div className={`${linkItem}`}>
                <Link className='text-decoration-none'>
                    <p className={`${loginText}`}>
                    Lupa Password
                    </p>
                </Link>
                </div>
                <div className={`d-grid  ${inputItem}`}>
                <Button text={`Masuk`} customClassName={`btnPrimary`} type="submit" />
                </div>
                <div className={`${linkItem} d-flex justify-content-center`}>
                <p className={`${loginSubTitle} ${secondary}`}>Belum punya akun? </p>
                <Link className='text-decoration-none'>
                    <p className={`${loginText}`}>
                    Daftar disini
                    </p>
                </Link>
                </div>
            </div>
            </form>
        </div>
        </>
    );
};

export default Login;
