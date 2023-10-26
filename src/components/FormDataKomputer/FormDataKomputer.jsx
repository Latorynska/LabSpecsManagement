import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Select from "../Select/Select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComp, fetchLayout } from "../../redux/thunks/LabLayoutAPI";
import Swal from 'sweetalert2';

const FormDataKomputer = () => {
    const dispatch = useDispatch();
    const selectedComp = useSelector(state => state.lablayout.selectedComp);
    const selectedRuangan = useSelector(state => state.ruangan.selectedRuangan);
    const comps = useSelector(state => state.lablayout.comps);
    const error = useSelector(state => state.lablayout.error);

    const [posisiTerakhir, setPosisiTerakhir] = useState(0);
    const [btnDisabled, setBtnDisabled] = useState(false);
    
    const [formData, setFormData] = useState({
        nomor: "",
        posisi: posisiTerakhir + 1,
        kodeInventaris: "",
        prosesor: "",
        vga: "",
        ram: {
            ukuran: '',
            tipe: 'ddr3',
            konfigurasi: 'single channel'
        },
        storage: [],
        motherboard: "",
        case: "",
        monitor: "",
        psu: "",
        keyboard: "",
        mouse: "",
        sound: "",
        additional: "",
        status: "good",
    });

    const [formError, setFormError] = useState({
        nomor: "",
        kodeInventaris: "",
        prosesor: "",
        vga: "",
        ram: {
            ukuran: '',
            tipe: '',
            konfigurasi: ''
        },
        storage: "",
        motherboard: "",
        case: "",
        monitor: "",
        psu: "",
        keyboard: "",
        mouse: "",
        sound: "",
        additional: "",
        status: "",
    });

    const optionsStatus = [
        {label:'GOOD', value:'good'},
        {label:'WARNING', value:'warning'},
        {label:'BAD', value:'bad'},
        {label:'EMPTY', value:'empty'}
    ]

    useEffect(() => {
        selectedComp && setFormData(selectedComp);
    }, [selectedComp]);
    useEffect(() => {
        comps.length > 0 && setPosisiTerakhir(comps[comps.length - 1].posisi + 1);
    }, [comps]);
    useEffect(() => {
        
    }, []);

    const isFormValid = (data) => {
        const requiredFields = [
          "nomor",
          "kodeInventaris",
          "prosesor",
          "vga",
          "ram.ukuran",
          "ram.tipe",
          "ram.konfigurasi",
          "storage",
          "motherboard",
          "case",
          "monitor",
          "psu",
          "keyboard",
          "mouse",
          "status",
        ];
      
        const isStorageValid = data.storage.some((item) => item);
      
        return (
          requiredFields.every((field) => data[field] && (field !== "ram.ukuran" || data[field] !== 0)) &&
          isStorageValid
        );
      };
      
      const updateFormErrors = (data) => {
        const updatedFormError = { ...formError };
      
        const requiredFields = [
            "nomor",
            "kodeInventaris",
            "prosesor",
            "vga",
            "ram.ukuran",
            "ram.tipe",
            "ram.konfigurasi",
            "storage",
            "motherboard",
            "case",
            "monitor",
            "psu",
            "keyboard",
            "mouse",
            "status",
        ];
      
        requiredFields.forEach((field) => {
            if (!data[field] || (field === "ram.ukuran" && data[field] === 0)) {
                updatedFormError[field] = `${field} tidak boleh kosong${
                    field === "ram.ukuran" ? " atau 0" : ""
                }`;
            }
        });
      
        if (!data.storage.some((item) => item)) {
            updatedFormError.storage = "Setidaknya satu kolom storage harus diisi";
        } else {
            updatedFormError.storage = "";
        }
      
        return updatedFormError;
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        if (name.startsWith("storage")) {
            // Handle Storage input
            const storageIndex = parseInt(name.match(/\d+/)[0]);
            const updatedStorage = [...formData.storage];
            updatedStorage[storageIndex] = value;
            setFormData({ ...formData, storage: updatedStorage });
            
            const isAtLeastOneStorageFilled = updatedStorage.some(item => item);
            setFormError({ ...formError, storage: isAtLeastOneStorageFilled ? "" : "At least one storage field must be filled" });
        } else if (name.startsWith("ram")) {
            // Handle Ram input
            if (name === "ram.ukuran" && value !== "") {
                // Check if it's ram.ukuran and the value is not empty
                setFormError({ ...formError, [name]: /^\d+$/.test(value) ? "" : "Only numeric values are allowed" });
            } else {
                setFormError({ ...formError, [name]: "" });
            }
    
            setFormData({
                ...formData,
                ram: {
                    ...formData.ram,
                    [name.split('.')[1]]: value,
                },
            });
        } else{
            setFormData({ ...formData, [name]: value });
            if (name !== 'sound' && name !== 'additional'){
                setFormError({ ...formError, [name]: value ? "" : `${name} tidak boleh kosong` });
            }
        }
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formError);
        console.log(formData);
        const isValid = isFormValid(formData);
        const updatedFormError = isValid ? {} : updateFormErrors(formData);
        if (isValid || formData.status == 'bad' || formData.status == 'empty') {
            console.log("Form submitted:", formData);
            console.log('idruangan: ', selectedRuangan.id);
            dispatch(addComp({idRuangan : selectedRuangan.id, data : formData}))
                .then(()=> {
                    if(error){
                        Swal.fire({
                            title: 'oops, ada error',
                            text: error.getMessage(),
                            icon: 'error',
                            timer: 3000,
                          });
                    } else {
                        dispatch(fetchLayout());
                        alert('komputer ditambahkan');
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            setFormError(updatedFormError);
        }
    };
    return ( 
        <form action="#" onSubmit={handleSubmit}>
            <div className="row pt-5">
                <div className="col-6">
                    <div className="row">
                        <div className="col-6">
                            <Input 
                                onChange={e => handleInputChange(e)}
                                label={`Nomor Unit`}
                                type={`text`}
                                name={'nomor'}
                                errorHelper={formError.nomor}
                            />
                        </div>
                        <div className="col-6">
                            <Input 
                                label={`posisi unit`}
                                type={`text`}
                                name={'posisi'}
                                disabled={true}
                                value={formData.posisi}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <Input 
                        onChange={e => handleInputChange(e)}
                        label={`Kode Inventaris`}
                        type={`text`}
                        name={'kodeInventaris'}
                        errorHelper={formError.kodeInventaris}
                    />
                </div>
            </div>
            <div className="row pt-3">
                <div className="col-6">
                    <Input 
                        onChange={e => handleInputChange(e)}
                        label={`Prosesor`}
                        type={`text`}
                        name={'prosesor'}
                        errorHelper={formError.prosesor}
                    />
                </div>
                <div className="col-6">
                    <Input 
                        onChange={e => handleInputChange(e)}
                        label={`Vga`}
                        type={`text`}
                        name={'vga'}
                        errorHelper={formError.vga}
                    />
                </div>
            </div>
            <div className="row pt-3">
                <div className="col-6">
                    <div className="row">
                        <div className="col-8 pe-0">
                            <Input
                                onChange={handleInputChange}
                                label={`Ram Ukuran`}
                                type={`text`}
                                inputGroupText={`GB`}
                                name={"ram.ukuran"}
                                value={formData.ram.ukuran}
                                errorHelper={formError["ram.ukuran"]}
                            />
                        </div>
                        <div className="col-4 ps-1">
                            <Select
                                onChange={handleInputChange}
                                label={`Tipe`}
                                type={`text`}
                                options={[{ label: "DDR4", value: "DDR4" },{ label: "DDR3", value: "DDR3" },]}
                                name={"ram.tipe"}
                                value={formData.ram.tipe}
                                errorHelper={formError["ram.tipe"]}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <Select
                        onChange={handleInputChange}
                        label={`Konfigurasi`}
                        type={`text`}
                        options={[{ label: "Dual Channel", value: "2" },{ label: "Single Channel", value: "1" },]}
                        name={"ram.konfigurasi"}
                        value={formData.ram.konfigurasi}
                        errorHelper={formError["ram.konfigurasi"]}
                    />
                </div>
            </div>
            <div className="row pt-3">
                <div className="col-6">
                    <Input 
                        onChange={handleInputChange}
                        label={`Storage 1`}
                        type={`text`}
                        name={'storage[0]'}
                        errorHelper={formError.storage}
                    />
                </div>
                <div className="col-6">
                    <Input 
                        onChange={e => handleInputChange(e)}
                        label={`Storage 2`}
                        type={`text`}
                        name={'storage[1]'}
                        errorHelper={formError.storage}
                    />
                </div>
            </div>
            <div className="row pt-3">
                <div className="col-6">
                    <Input 
                        onChange={e => handleInputChange(e)}
                        label={`Storage 3`}
                        type={`text`}
                        name={'storage[2]'}
                        errorHelper={formError.storage}
                    />
                </div>
                <div className="col-6">
                    <Input 
                        onChange={e => handleInputChange(e)}
                        label={`Storage 4`}
                        type={`text`}
                        name={'storage[3]'}
                        errorHelper={formError.storage}
                    />
                </div>
            </div>
            <div className="row pt-3">
                <div className="col-6">
                    <Input 
                        onChange={e => handleInputChange(e)}
                        label={`Motherboard`}
                        type={`text`}
                        name={'motherboard'}
                        errorHelper={formError.motherboard}
                    />
                </div>
                <div className="col-6">
                    <Input 
                        onChange={e => handleInputChange(e)}
                        label={`Case`}
                        type={`text`}
                        name={'case'}
                        errorHelper={formError.case}
                    />
                </div>
            </div>
            <div className="row pt-3">
                <div className="col-6">
                    <Input 
                        onChange={e => handleInputChange(e)}
                        label={`Monitor`}
                        type={`text`}
                        name={'monitor'}
                        errorHelper={formError.monitor}
                    />
                </div>
                <div className="col-6">
                    <Input 
                        onChange={e => handleInputChange(e)}
                        label={`Power Supply Unit`}
                        type={`text`}
                        name={'psu'}
                        errorHelper={formError.psu}
                    />
                </div>
            </div>
            <div className="row pt-3">
                <div className="col-6">
                    <Input 
                        onChange={e => handleInputChange(e)}
                        label={`Keyboard`}
                        type={`text`}
                        name={'keyboard'}
                        errorHelper={formError.keyboard}
                    />
                </div>
                <div className="col-6">
                    <Input 
                        onChange={e => handleInputChange(e)}
                        label={`Mouse`}
                        type={`text`}
                        name={'mouse'}
                        errorHelper={formError.mouse}
                    />
                </div>
            </div>
            <div className="row pt-3">
                <div className="col-6">
                    <Input 
                        onChange={e => handleInputChange(e)}
                        label={`Sound Device`}
                        type={`text`}
                        name={'sound'}
                        errorHelper={formError.sound}
                    />
                </div>
                <div className="col-6">
                    <Input 
                        onChange={e => handleInputChange(e)}
                        label={`Additional Peripheral`}
                        type={`text`}
                        name={'additional'}
                        errorHelper={formError.additional}
                    />
                </div>
            </div>
            <div className="row pt-3">
                <div className="col-6">
                    <Select 
                        onChange={handleInputChange}
                        label={`Status Komputer`}
                        type={`text`}
                        options={optionsStatus}
                        name={'status'}
                        errorHelper={formError.status}
                    />
                </div>
                <div className="col-6">
                </div>
            </div>
            {
                selectedComp && 
                <>
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
                                        disabled={btnDisabled}
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
                                disabled={btnDisabled}
                            />
                        </div>
                        <div className="col-6">

                        </div>
                    </div>
                </>
            }
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
                                options={[{label:'1', value: '1'}]}
                                disabled={btnDisabled}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <div className="row">
                        <div className="col-8"></div>
                        <div className="col-4">
                            {
                                !selectedComp &&
                                    <Button 
                                        text={`Save as New`}
                                        customClassName={`btnPrimary`}
                                        className={`w-100`}
                                        type={'submit'}
                                        disabled={btnDisabled}
                                    />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </form>
     );
}
 
export default FormDataKomputer;