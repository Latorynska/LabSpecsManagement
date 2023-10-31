import { useDispatch, useSelector } from 'react-redux';
import Alert from '../Alert/Alert';
import { containerNotifikasi, judulContainerNotifikasi } from './ListNotifikasi.module.css';
import { useEffect } from 'react';
import { fetchAllLaporanData } from '../../redux/thunks/ruanganAPI';
import { resetLaporanData } from '../../redux/slices/ruanganSlice';

const ListNotifikasi = () => {
    const dispatch = useDispatch();
    const { laporanData, selectedRuangan } = useSelector(state => state.ruangan);

    const getAlertClassName = (status) => {
        switch(status) {
            case "bad" : return "alert-danger";
            case "warning" : return "alert-warning";
            case "solved" : return "alert-success";
            default : return "alert";
        }
    }
    const getAlertText = (item) => {
        
        switch(item.data.status) {
            case "bad" : return `oops, PC - ${item.nomor} atau ${item.kodeInventaris} mengalami masalah!`;
            case "warning" : return `PC - ${item.nomor} atau ${item.kodeInventaris} sepertinya memiliki masalah!`;
            case "solved" : return `PC - ${item.nomor} atau ${item.kodeInventaris} telah selesai diperbaiki, dapat digunakan kembali yay!`;
            default : return "alert";
        }
    }

    useEffect(() => {
        if(selectedRuangan){
            dispatch(fetchAllLaporanData(selectedRuangan.id));
        } else {
            dispatch(resetLaporanData());
        }
    }, [selectedRuangan]);

    return (
        <>
            {
                selectedRuangan &&
                    <div className={`${containerNotifikasi}`}>
                        <p className={`${judulContainerNotifikasi}`}>
                            {
                                selectedRuangan?.namaRuangan &&
                                `Informasi terakhir di ${selectedRuangan.namaRuangan}`
                            }
                        </p>
                        {
                            laporanData && laporanData.length > 0 ?
                                laporanData
                                    .slice(0, 5)
                                    .map((item, index) => (
                                        <Alert
                                            key={index}
                                            className={getAlertClassName(item.data.status)}
                                            message={getAlertText(item)}
                                        />
                                    ))
                                :
                                <h5 className='text-white text-center'>No Data</h5>
                        }
                    </div>
            }
        </>
    );
}
 
export default ListNotifikasi;