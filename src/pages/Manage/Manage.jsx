import Input from "../../components/Input/Input";
import LabLayout from "../../components/LabLayout/LabLayout";
import Switch from "../../components/Switch/Switch";
import { formManageTitle, containerRuangan } from './Manage.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import Select from "../../components/Select/Select";
import { useState } from "react";
import TextArea from "../../components/TextArea/TextArea";
import Button from "../../components/Button/Button";

const Manage = () => {
    
    const [selectedOption, setSelectedOption] = useState('');

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

    
    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    return ( 
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-6">
                        <p className={`text-center ${formManageTitle}`}> Form Informasi Ruangan</p>
                        <div className="row">
                            <div className="col-6 ps-5">
                                <Select 
                                    options={optionsRuangan}
                                    label={`Pilih Ruangan`}
                                    className="mb-3" // Add margin-bottom for spacing
                                />
                                <Input  
                                    label={`Nama Ruangan`}
                                    placeholder={'Masukkan Nama Ruangan'}
                                    className="mb-3" // Add margin-bottom for spacing
                                />
                                <Select 
                                    options={optionsKonfigurasi}
                                    label={`Konfigurasi Ruangan`}
                                    className="mb-3" // Add margin-bottom for spacing
                                />
                                <Select 
                                    options={optionsPosisi}
                                    label={`Posisi Server atau Komputer Pengajar`}
                                    className="mb-3" // Add margin-bottom for spacing
                                />
                                <TextArea 
                                    label={`Deskripsi Tujuan atau Fungsi Ruangan`}
                                    placeholder={``}
                                    className="mb-3" // Add margin-bottom for spacing
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
                    </div>
                    <div className="col-6">
                        <div className={`${containerRuangan}`}>
                            <div className="row">
                                <div className="col-7">
                                    <Input 
                                        labelPosition={`kiri`}
                                        label={`Password`}
                                        type={`password`}
                                        className="mb-3" // Add margin-bottom for spacing
                                    />
                                </div>
                                <div className="col-2 d-flex align-items-center">
                                    <Switch 
                                        id={`statusPasswordRuangan`}
                                        onChange={e => console.log('switched')}
                                    />
                                    <FontAwesomeIcon icon={faCircleQuestion} className="text-white"/>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <LabLayout />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Manage;
