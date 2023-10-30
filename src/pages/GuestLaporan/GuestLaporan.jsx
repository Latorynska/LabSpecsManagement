import { useDispatch, useSelector } from 'react-redux';
import { titleManageLaporan } from './GuestLaporan.module.css';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchComputerAndRuangData } from '../../redux/thunks/computerAPI';
import DetailKomputer from '../../components/DetailKomputer/DetailKomputer';
import FormLaporanMasalah from '../../components/FormLaporanMasalah/FormLaporanMasalah';

const GuestLaporan = () => {
    const dispatch = useDispatch();
    const { labId, kodeInventaris } = useParams();
    const { data, ruanganData} = useSelector(state => state.computer);

    useEffect(() => {
        dispatch(fetchComputerAndRuangData({idRuangan: labId, computerId: kodeInventaris}));
    }, []);
    return ( 
        <>
            <div className={`text-center ${titleManageLaporan} pt-5`}>
                Buat Laporan
            </div>
            <div className="row m-0 p-0 mt-5 ps-5">
                <div className="col-5 pt-5">
                    {
                        data && ruanganData ? <DetailKomputer data={data} ruangan={ruanganData}/>
                        :
                        <Alert className={'alert-success'} message={'no data found'}/>
                    }
                </div>
                <div className="col-6">
                <div className="row p-5">
                    <FormLaporanMasalah idRuangan={labId} computerId={kodeInventaris} access={`guest`}/>
                </div>
                </div>
            </div>
        </>
     );
}
 
export default GuestLaporan;