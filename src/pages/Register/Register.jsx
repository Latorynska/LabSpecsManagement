import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Input/Input';
import { loginTitle, loginContainer, loginSubTitle, inputBox, inputItem, linkItem, loginText, secondary } from './Register.module.css';
import Button from '../../components/Button/Button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/thunks/authAPI';
import { getAuth } from 'firebase/auth';

const Register = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData))
    };

    return (
        <>
        <div className={`${loginContainer}`}>
            <form onSubmit={handleRegister}>
            <p className={`${loginTitle}`}>Daftar Akun</p>
            <p className={`${loginSubTitle}`}>Daftarkan diri anda dan mulai kelola! </p>
            <div className={`${inputBox}`}>
                <div className={`${inputItem}`}>
                <Input
                    name="username"
                    label={`Username`}
                    placeholder={`Masukkan username anda`}
                    value={formData.username}
                    onChange={handleInputChange}
                />
                </div>
                <div className={`${inputItem}`}>
                <Input
                    name="email"
                    label={`Email`}
                    placeholder={`Masukkan Email anda`}
                    type={`email`}
                    value={formData.email}
                    onChange={handleInputChange}
                />
                </div>
                <div className={`${inputItem}`}>
                <Input
                    name="password"
                    label={`Password`}
                    type={`password`}
                    placeholder={`Create a Password`}
                    value={formData.password}
                    onChange={handleInputChange}
                />
                </div>
                <div className={`d-grid  ${linkItem}`}>
                <Button
                    type="submit"
                    text={`Daftar`}
                    customClassName={`btnPrimary`}
                    className={``}
                />
                </div>
            </div>
            </form>
            <div className={`${linkItem} d-flex justify-content-center`}>
            <p className={`${loginSubTitle} ${secondary}`}>sudah punya akun?  </p>
            <Link className='text-decoration-none'>
                <p className={`${loginText}`}>
                Masuk Disini
                </p>
            </Link>
            </div>
        </div>
        </>
    );
};

export default Register;
