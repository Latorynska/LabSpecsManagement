import Alert from '../Alert/Alert';
import { containerNotifikasi, judulContainerNotifikasi } from './ListNotifikasi.module.css';

const ListNotifikasi = () => {
    return ( 
        <>
            <div className={`${containerNotifikasi}`}>
                <p className={`${judulContainerNotifikasi}`}>
                    Informasi terakhir di Lab Jaringan Komputer
                </p>
                <Alert 
                    className={`alert-success`}
                    message={`PC - 17 telah selesai diperbaiki, dapat digunakan kembali yay!`}
                />
                <Alert 
                    className={`alert-danger`}
                    message={`oops, PC - 8 mengalami masalah, klik saya untuk melihat detail masalah!`}
                />
                <Alert 
                    className={`alert-warning`}
                    message={`PC - 14 sepertinya memiliki masalah, klik saya untuk informasi lebih lanjut!`}
                />
                <Alert 
                    className={`alert-danger`}
                    message={`oops, PC - 15 mengalami masalah, klik saya untuk melihat detail masalah!`}
                />
                <Alert 
                    className={`alert-danger`}
                    message={`oops, PC - 18 mengalami masalah, klik saya untuk melihat detail masalah!`}
                />
            </div>
        </>
     );
}
 
export default ListNotifikasi;