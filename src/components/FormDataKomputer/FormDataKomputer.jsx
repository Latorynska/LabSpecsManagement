import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Select from "../Select/Select";

const FormDataKomputer = () => {
    return ( 
        <form action="#">
            <div className="row pt-5">
                <div className="col-6">
                    <Input 
                        label={`Nomor Unit`}
                        type={`text`}
                    />
                </div>
                <div className="col-6">
                    <Input 
                        label={`Kode Inventaris`}
                        type={`text`}
                    />
                </div>
            </div>
            <div className="row pt-3">
                <div className="col-6">
                    <Input 
                        label={`Prosesor`}
                        type={`text`}
                    />
                </div>
                <div className="col-6">
                    <Input 
                        label={`Vga`}
                        type={`text`}
                    />
                </div>
            </div>
            <div className="row pt-3">
                <div className="col-6">
                    <div className="row">
                        <div className="col-8 pe-0">
                            <Input 
                                label={`Ram`}
                                type={`text`}
                                inputGroupText={`GB`}
                            />
                        </div>
                        <div className="col-4 ps-1">
                            <Select 
                                label={`Tipe`}
                                type={`text`}
                                options={[{label:'DDR4', value:'DDR4'}]}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <Select 
                        label={`Konfigurasi`}
                        type={`text`}
                        options={[{label:'Dual Channel', value:'2'}]}
                    />
                </div>
            </div>
            <div className="row pt-3">
                <div className="col-6">
                    <Input 
                        label={`Storage 1`}
                        type={`text`}
                    />
                </div>
                <div className="col-6">
                    <Input 
                        label={`Storage 2`}
                        type={`text`}
                    />
                </div>
            </div>
            <div className="row pt-3">
                <div className="col-6">
                    <Input 
                        label={`Storage 3`}
                        type={`text`}
                    />
                </div>
                <div className="col-6">
                    <Input 
                        label={`Storage 4`}
                        type={`text`}
                    />
                </div>
            </div>
            <div className="row pt-3">
                <div className="col-6">
                    <Input 
                        label={`Motherboard`}
                        type={`text`}
                    />
                </div>
                <div className="col-6">
                    <Input 
                        label={`Case`}
                        type={`text`}
                    />
                </div>
            </div>
            <div className="row pt-3">
                <div className="col-6">
                    <Input 
                        label={`Monitor`}
                        type={`text`}
                    />
                </div>
                <div className="col-6">
                    <Input 
                        label={`Power Supply Unit`}
                        type={`text`}
                    />
                </div>
            </div>
            <div className="row pt-3">
                <div className="col-6">
                    <Input 
                        label={`Keyboard`}
                        type={`text`}
                    />
                </div>
                <div className="col-6">
                    <Input 
                        label={`Mouse`}
                        type={`text`}
                    />
                </div>
            </div>
            <div className="row pt-3">
                <div className="col-6">
                    <Input 
                        label={`Sound Device`}
                        type={`text`}
                    />
                </div>
                <div className="col-6">
                    <Input 
                        label={`Additional Peripheral`}
                        type={`text`}
                    />
                </div>
            </div>
            <div className="row pt-3">
                <div className="col-6">
                    <Select 
                        label={`Status Komputer`}
                        type={`text`}
                        options={[{label:'GOOD', value:'good'}]}
                    />
                </div>
                <div className="col-6">
                </div>
            </div>
            <div className="row pt-4">
                <div className="col-6">
                    <Link to={`/manage/jarkom/idpc1`}>
                        <Button 
                            text={`Kelola Status Laporan`}
                            customClassName={'btnSuccess'}
                            className={'w-100'}
                        />
                    </Link>
                </div>
                <div className="col-6 align-items-end">
                    <div className="row">
                        <div className="col-8"></div>
                        <div className="col-4">
                            <Button 
                                text={`update data`}
                                customClassName={'btnPrimary'}
                                className={`w-100`}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="row pt-4">
                <div className="col-6">
                    <Button 
                        text={`Hapus data unit`}
                        customClassName={'btnDanger'}
                        className={'w-100'}
                    />
                </div>
                <div className="col-6">

                </div>
            </div>
            <div className="row pt-5">
                <div className="col-6">
                    <div className="row">
                        <div className="col-3">
                            <Select 
                                options={[{label: '1', value: 1}]}
                            />
                        </div>
                        <div className="col-auto">
                            <Button 
                                text={`Tukar Posisi`}
                                customClassName={`btnWarning`}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="row">
                        <div className="col-8"></div>
                        <div className="col-4">
                            <Button 
                                text={`Save as New`}
                                customClassName={`btnPrimary`}
                                className={`w-100`}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
     );
}
 
export default FormDataKomputer;