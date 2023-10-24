import Button from '../Button/Button';
import Select from '../Select/Select';
import TextArea from '../TextArea/TextArea';
import { titleManageLaporan } from './FormPenyelesaianMasalah.module.css';

const FormPenyelesaianMasalah = () => {
    return ( 
        <>
            <div className="row">
                <div className={`text-center ${titleManageLaporan} pt-5`}>
                    Detail Penyelesaian Masalah
                </div>
            </div>
            <div className="row">
                <div className="col-2"></div>
                <div className="col-8 mt-2">
                    <form action="#">
                        <div className="mt-3">
                            <TextArea 
                                label={`Catatan Penyelesaian`}
                                rows={6}
                            />
                        </div>
                        <div className="mt-3">
                            <Select 
                                label={`Status`}
                                options={[{value:'solved', label:'Solved'},{value:'in repair', label:'In Repair'}]}
                            />
                        </div>
                        <div className="mt-3">
                            <div className="row">
                                <div className="col-3">
                                    <div className="d-grid">
                                        <Button 
                                            text={`Ai Helper`}
                                            customClassName={`btnWarning`}
                                        />
                                    </div>
                                </div>
                                <div className="col-4 p-0">
                                    <div className="d-grid">
                                        <Button 
                                            text={`Hapus Laporan`}
                                            customClassName={`btnDanger`}
                                        />
                                    </div>
                                </div>
                                <div className="col-5">
                                    <div className="d-flex justify-content-end">
                                        <Button 
                                            text={`Submit`}
                                            customClassName={`btnPrimary`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-2"></div>
            </div>
        </>
     );
}
 
export default FormPenyelesaianMasalah;