import { Link } from 'react-router-dom';
import Input from '../../components/Input/Input';
import { loginTitle, loginContainer, loginSubTitle, inputBox, inputItem, linkItem, loginText, secondary} from './Login.module.css';
import Button from '../../components/Button/Button';

const Login = () => {
    return ( 
        <>
            <div className={`${loginContainer}`}>
                <p className={`${loginTitle}`}>Selamat Datang</p>
                <p className={`${loginSubTitle}`}>Masukkan informasi anda sebagai pengelola</p>
                <div className={`${inputBox}`}>
                    <div className={`${inputItem}`}>
                        <Input 
                            label={`Username`}
                            placeholder={`Masukkan Email`}
                        />
                    </div>
                    <div className={`${inputItem}`}>
                        <Input 
                            label={`Password`}
                            type={`password`}
                            placeholder={`Password`}
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
                        <Button 
                            text={`Masuk`}
                            customClassName={`btnPrimary`}
                            className={``}
                        />
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
            </div>
        </>
     );
}
 
export default Login;