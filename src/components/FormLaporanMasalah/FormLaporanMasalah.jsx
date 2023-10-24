import Button from '../Button/Button';
import Input from '../Input/Input';
import Select from '../Select/Select';
import TextArea from '../TextArea/TextArea';
import { titleManageLaporan } from './FormLaporanMasalah.module.css'

const FormLaporanMasalah = ({ dataLaporan }) => {

    return ( 
        <>
            <div className="row">
                <div className={`text-center ${titleManageLaporan} pt-5`}>
                    Laporkan Permasalahan
                </div>
            </div>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8 mt-5">
                    <form action="#">
                        <div className="mt-3">
                            <Input 
                                label={`Tanggal laporan`}
                                placeholder={`DD/MM/YYYY`}
                            />
                        </div>
                        <div className="mt-3">
                            <Select 
                                options={[{value:'pc', label:'PC'} , {value:'monitor', label:'Monitor'}]}
                                label={`Device Bermasalah`}
                            />
                        </div>
                        <div className="mt-3">
                            <TextArea 
                                rows={6}
                                label={`Kronologi dan Detail Permasalahan`}
                            />
                        </div>
                        <div className="mt-3">
                            <Select 
                                options={[{value:'has problem', label:'Has Problem'} , {value:'bad', label:'bad'}]}
                                label={`Status`}
                            />
                        </div>
                        <div className="mt-5 d-flex justify-content-end">
                            <Button 
                                text={`Submit`}
                                customClassName={`btnPrimary`}
                            />
                        </div>
                    </form>
                </div>
                <div className="col-2"></div>
            </div>
        </>
     );
}
 
export default FormLaporanMasalah;