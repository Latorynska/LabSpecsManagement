import { useState } from "react";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Select from "../Select/Select";
import TextArea from "../TextArea/TextArea";

import { formManageTitle } from './FormRuangan.module.css';

const FormRuangan = () => {
    
    const [selectedOption, setSelectedOption] = useState('');
    
    
    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const optionsRuangan = [
        { value: 'Tambah Baru', label: 'Tambah Baru' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];
    const optionsKonfigurasi = [
        { value: '4', label: '4 Kolom' },
    ];
    const optionsPosisi = [
        { value: 'kiri atas', label: 'Kiri Atas' },
    ];

    return ( 
        <>
            <form action="#">
                <p className={`text-center ${formManageTitle}`}> Form Informasi Ruangan</p>
                <div className="row">
                    <div className="col-6 ps-5">
                        <Select 
                            options={optionsRuangan}
                            label={`Pilih Ruangan`}
                            className="mb-3"
                        />
                        <Input  
                            label={`Nama Ruangan`}
                            placeholder={'Masukkan Nama Ruangan'}
                            className="mb-3"
                        />
                        <Select 
                            options={optionsKonfigurasi}
                            label={`Konfigurasi Ruangan`}
                            className="mb-3"
                        />
                        <Select 
                            options={optionsPosisi}
                            label={`Posisi Server atau Komputer Pengajar`}
                            className="mb-3"
                        />
                        <TextArea 
                            label={`Deskripsi Tujuan atau Fungsi Ruangan`}
                            placeholder={``}
                            className="mb-3"
                        />
                        <div className="d-flex justify-content-between mb-3">
                            <Button 
                                text={'Hapus Data'}
                                customClassName={'btnDanger'}
                            />
                            <Button 
                                text={'Tambah Data'}
                                customClassName={'btnPrimary'}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
     );
}
 
export default FormRuangan;