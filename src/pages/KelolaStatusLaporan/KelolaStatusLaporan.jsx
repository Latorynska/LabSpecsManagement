import { titleManageLaporan } from './KelolaStatusLaporan.module.css';
import FormLaporanMasalah from '../../components/FormLaporanMasalah/FormLaporanMasalah';
import FormPenyelesaianMasalah from '../../components/FormPenyelesaianMasalah/FormPenyelesaianMasalah';
import TabelLaporan from '../../components/TabelLaporan/TabelLaporan';
import DetailKomputer from '../../components/DetailKomputer/DetailKomputer';

const KelolaStatusLaporan = () => {


  return (
    <>
        <div className={`text-center ${titleManageLaporan} pt-5`}>
            Anda sedang mengakses: kelola status laporan
        </div>
        <div className="row m-0 p-0 mt-5 ps-5">
            <div className="col-5 pt-5">
                <DetailKomputer />
                <TabelLaporan />
            </div>
            <div className="col-6">
                <div className="row p-5">
                    <FormLaporanMasalah />
                    <FormPenyelesaianMasalah />
                </div>
            </div>
        </div>
    </>
  );
}

export default KelolaStatusLaporan;
