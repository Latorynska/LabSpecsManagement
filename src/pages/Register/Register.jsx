import { Link } from 'react-router-dom';
import Input from '../../components/Input/Input';
import { loginTitle, loginContainer, loginSubTitle, inputBox, inputItem, linkItem, loginText, secondary} from './Register.module.css';
import Button from '../../components/Button/Button';

const Register = () => {
    return ( 
        <>
            <div className={`${loginContainer}`}>
                <p className={`${loginTitle}`}>Daftar Akun</p>
                <p className={`${loginSubTitle}`}>Daftarkan diri anda dan mulai kelola! </p>
                <div className={`${inputBox}`}>
                    <div className={`${inputItem}`}>
                        <Input 
                            label={`Username`}
                            placeholder={`Masukkan username anda`}
                        />
                    </div>
                    <div className={`${inputItem}`}>
                        <Input 
                            label={`Email`}
                            placeholder={`Masukkan Email anda`}
                            type={`email`}
                        />
                    </div>
                    <div className={`${inputItem}`}>
                        <Input 
                            label={`Password`}
                            type={`password`}
                            placeholder={`Create a Password`}
                        />
                    </div>
                    <div className={`d-grid  ${linkItem}`}>
                        <Button 
                            text={`Masuk`}
                            customClassName={`btnPrimary`}
                            className={``}
                        />
                    </div>
                    <div className={`${linkItem} d-flex justify-content-center`}>
                        <p className={`${loginSubTitle} ${secondary}`}>sudah punya akun?  </p>
                        <Link className='text-decoration-none'>
                            <p className={`${loginText}`}>
                                Masuk Disini
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Register;