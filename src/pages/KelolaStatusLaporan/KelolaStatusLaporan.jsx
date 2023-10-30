import { titleManageLaporan } from './KelolaStatusLaporan.module.css';
import FormLaporanMasalah from '../../components/FormLaporanMasalah/FormLaporanMasalah';
import FormPenyelesaianMasalah from '../../components/FormPenyelesaianMasalah/FormPenyelesaianMasalah';
import TabelLaporan from '../../components/TabelLaporan/TabelLaporan';
import DetailKomputer from '../../components/DetailKomputer/DetailKomputer';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import { fetchLaporan, fetchComputerAndRuangData } from '../../redux/thunks/computerAPI';
import Alert from '../../components/Alert/Alert';

const KelolaStatusLaporan = () => {
  const { labId, kodeInventaris } = useParams();
  const dispatch = useDispatch();

  const { loading, error, data, ruanganData, laporanData, selectedLaporan } = useSelector((state) => state.computer);

  useEffect(() => {
    dispatch(fetchLaporan({ idRuangan: labId, computerId: kodeInventaris }));
    dispatch(fetchComputerAndRuangData({ idRuangan: labId, computerId: kodeInventaris }));
  }, [dispatch, labId, kodeInventaris, selectedLaporan]);

  useEffect(() => {
    if (loading) {
      Swal.fire({
        title: 'Data sedang diproses, mohon tunggu :)',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    } else {
      Swal.close();
    }
  }, [loading]);

  // useEffect(() => {
  //   console.log('Computer Data:', data);
  //   console.log('Ruangan Data:', ruanganData);
  // }, [data, ruanganData]);

  return (
    loading ? <p>loading</p> :
    <>
      <div className={`text-center ${titleManageLaporan} pt-5`}>
        Anda sedang mengakses: kelola status laporan
      </div>
      <div className="row m-0 p-0 mt-5 ps-5">
        <div className="col-5 pt-5">
            {
                data && ruanganData ? <DetailKomputer data={data} ruangan={ruanganData}/>
                :
                <Alert className={'alert-success'} message={'no data found'}/>
            }
            <TabelLaporan laporanData={laporanData} />
        </div>
        <div className="col-6">
          <div className="row p-5">
            <FormLaporanMasalah idRuangan={labId} computerId={kodeInventaris} />
            {selectedLaporan && <FormPenyelesaianMasalah />}
          </div>
        </div>
      </div>
    </>
  );
}

export default KelolaStatusLaporan;
