import { Link, useParams } from "react-router-dom";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Select from "../Select/Select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComp, deleteComp, fetchLayout, switchPosition, updateComp } from "../../redux/thunks/LabLayoutAPI";
import Swal from 'sweetalert2';
import { resetSelectedComp } from "../../redux/slices/LabLayoutSlice";
import { fetchRuanganData } from "../../redux/thunks/ruanganAPI";
import { setSelectedRuangan } from "../../redux/slices/ruanganSlice";

const FormDataKomputer = () => {
    const dispatch = useDispatch();
    const selectedRuangan = useSelector(state => state.ruangan.selectedRuangan);
    const { selectedComp, comps, error, loading } = useSelector(state => state.lablayout);
    const ruanganData = useSelector(state => state.ruangan.ruanganData);
    const { ruanganID } = useParams();

    const [posisiTerakhir, setPosisiTerakhir] = useState(0);
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [compIdSnapshot, setCompIdSnapshot] = useState('');
    const [switchPositionOptions, setSwitchPositionOptions] = useState([]);
    const [switchTarget, setSwitchTarget] = useState('');
    
    const [formData, setFormData] = useState(
        selectedComp ? selectedComp : 
        {
        nomor: "",
        posisi: posisiTerakhir + 1,
        kodeInventaris: "",
        prosesor: "",
        vga: "",
        ram: {
            ukuran: '',
            tipe: "ddr3",
            konfigurasi: "1"
        },
        storage: ["","","","",],
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
    ];
    const optionRam = [
        { label: "DDR3", value: "ddr3" },
        { label: "DDR4", value: "ddr4" },
        { label: "DDR5", value: "ddr5" },
    ]
    const konfigurasiRamOptions = [
        { label: "Single Channel", value: "1" },
        { label: "Dual Channel", value: "2" },
        { label: "Triple Channel", value: "3" },
        { label: "Quad Channel", value: "4" },
    ]

    
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-start',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
        }
    });

    useEffect(() => {
        if(!selectedRuangan){
            dispatch(fetchRuanganData())
            .then(() => {
                const target = ruanganData.find(ruangan => ruangan.id === ruanganID);
                if (target) {
                    dispatch(setSelectedRuangan(target));
                }
            });
        }
        else{

        }
    }, []);
    
    useEffect(() => {
        if(selectedComp){
            setFormData(selectedComp);
            setCompIdSnapshot(selectedComp.kodeInventaris);
        } else {
            resetFormData();
            setCompIdSnapshot('');
        }
    }, [selectedComp]);

    useEffect(() => {
        if (comps.length > 0 && selectedComp == null) {
            const maxPosisi = Math.max(...comps.map((comp) => comp.posisi));
            setPosisiTerakhir(maxPosisi + 1);
            setFormData({
                ...formData,
                nomor: maxPosisi + 1,
                posisi: maxPosisi + 1,
            });
        }
        else if(comps.length == 0){
            setPosisiTerakhir(1);
            setSwitchPositionOptions([{label:'',value:''}]);
        } else if(comps.length > 0) {
            setSwitchPositionOptions(
                comps.map((comp) => {
                    return {
                        label: comp.posisi,
                        value: comp.kodeInventaris
                    }
                })
            )
        }

    }, [selectedRuangan, comps]);

    useEffect(() => {
        if (comps.length === 0) {
            setSwitchPositionOptions([{ label: '', value: '' }]);
        } else if (comps.length > 0) {
            const options = comps
                .filter(comp => comp.kodeInventaris !== selectedComp?.kodeInventaris)
                .map(comp => ({
                    label: comp.posisi,
                    value: comp.kodeInventaris
                }));
            setSwitchPositionOptions(options);
        }
    }, [comps, selectedComp]);    

    useEffect(() => {
        if (loading) {
          Swal.fire({
            title: 'Data sedang diproses, mohon tunggu :)',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });
        } else {
          Swal.close();
        }
      }, [loading]);

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
    
        console.log("Field validation details:");
        const fieldValidations = requiredFields.map((field) => {
          if (field.startsWith("ram.")) {
            const ramField = field.split("ram.")[1];
            const isFieldValid =
              ramField === "ukuran" ? (data.ram[ramField] > 0) : data.ram[ramField];
            console.log(`${field}: ${isFieldValid}`);
            return isFieldValid;
          } else {
            const isFieldValid = data[field];
            console.log(`${field}: ${isFieldValid}`);
            return isFieldValid;
          }
        });
    
        console.log("Storage validation:");
        const isStorageValid = data.storage.some((item) => item);
        console.log(`isStorageValid: ${isStorageValid}`);
    
        const isFormValid = fieldValidations.every((isValid) => isValid) && isStorageValid;
        console.log(`isFormValid: ${isFormValid}`);
    
        return isFormValid;
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
            if (!data[field]) {
                updatedFormError[field] = `${field} tidak boleh kosong`;
            }
        });
    
        if (!data.storage.some((item) => item)) {
            updatedFormError.storage = "Setidaknya satu kolom storage harus diisi";
        } else {
            updatedFormError.storage = "";
        }
    
        if (data["ram.ukuran"] !== '' && parseInt(data["ram.ukuran"]) <= 0) {
            updatedFormError["ram.ukuran"] = "Ram ukuran harus lebih dari 0";
        } else {
            updatedFormError["ram.ukuran"] = "";
        }
    
        return updatedFormError;
    };
    const resetFormData = () => {
        setFormData({
            nomor: posisiTerakhir,
            posisi: posisiTerakhir,
            kodeInventaris: "",
            prosesor: "",
            vga: "",
            ram: {
                ukuran: '',
                tipe: 'ddr3',
                konfigurasi: ""
            },
            storage: ["","","","",],
            motherboard: "",
            case: "",
            monitor: "",
            psu: "",
            keyboard: "",
            mouse: "",
            sound: "",
            additional: "",
            status: "good",
        })
    }
    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
    
        if (name.startsWith("storage")) {
            const storageIndex = parseInt(name.match(/\d+/)[0]);
            const updatedStorage = [...formData.storage];
            updatedStorage[storageIndex] = value;
            setFormData({ ...formData, storage: updatedStorage });
            
            const isAtLeastOneStorageFilled = updatedStorage.some(item => item);
            setFormError({ ...formError, storage: isAtLeastOneStorageFilled ? "" : "At least one storage field must be filled" });
        } else if (name.startsWith("ram")) {
            if (name === "ram.ukuran" && value !== "") {
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
        } else {
            setFormData({ ...formData, [name]: value });
            if (name !== 'sound' && name !== 'additional'){
                setFormError({ ...formError, [name]: value ? "" : `${name} tidak boleh kosong` });
            }
        }
    };

    const handleSwitchPositionSelect = (e) => {
        setSwitchTarget(e.target.value);
    }

    const handleSwitchPositionSubmit = () => {
        // console.log('selectedComp => ', switchTarget);
        // console.log('selectedRuangan => ', selectedRuangan.id);
        // console.log('compdomain => ', selectedComp.kodeInventaris);

        if(selectedComp && switchTarget){
            dispatch(switchPosition({
                idRuangan: selectedRuangan.id, 
                idCompTarget: switchTarget, 
                idCompDomain: selectedComp.kodeInventaris
            }))
            .then(() => {
                if(error){
                    Swal.fire({
                        title: 'oops, ada error',
                        text: error.getMessage(),
                        icon: 'error',
                        timer: 3000,
                      });
                } else {
                    dispatch(fetchLayout(selectedRuangan.id));
                    Toast.fire({
                        icon: 'success',
                        title: 'Data Berhasil Dirubah!'
                    });
                    resetFormData();
                    dispatch(resetSelectedComp());
                }
            })
            .catch(err => {
                Swal.fire({
                    title: 'oops, ada error',
                    text: err.getMessage(),
                    icon: 'error',
                    timer: 3000,
                });
                console.log(err);
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formError);
        console.log(formData);
        const isValid = isFormValid(formData);
        const updatedFormError = isValid ? {} : updateFormErrors(formData);
        if (isValid || formData.status == 'bad' || formData.status == 'empty') {
            console.log("Form submitted:", formData);
            console.log('idruangan: ', selectedRuangan.id);
            if(formData.kodeInventaris != ""){ // update
                if(compIdSnapshot){
                    dispatch(updateComp({idRuangan: selectedRuangan.id, idSnapshot : compIdSnapshot, data : formData}))
                    .then(() => {
                        if(error){
                            Swal.fire({
                                title: 'oops, ada error',
                                text: error.getMessage(),
                                icon: 'error',
                                timer: 3000,
                              });
                        } else {
                            Toast.fire({
                                icon: 'success',
                                title: 'Data Berhasil Dirubah!'
                            });
                            dispatch(resetSelectedComp());
                            resetFormData();
                        }
                    })
                    .catch(err => {
                        Swal.fire({
                            title: 'oops, ada error',
                            text: err.getMessage(),
                            icon: 'error',
                            timer: 3000,
                        });
                        console.log(err);
                    })
                } else { // tambah
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
                                dispatch(fetchLayout(selectedRuangan.id));
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Data Berhasil Dirubah!'
                                });
                                resetFormData();
                                dispatch(resetSelectedComp());
                            }
                        })
                        .catch(err => {
                            Swal.fire({
                                title: 'oops, ada error',
                                text: err.getMessage(),
                                icon: 'error',
                                timer: 3000,
                            });
                            console.log(err);
                        });
                }
            } else {
                setFormError({ ...formError, kodeInventaris: "kode inventaris tidak boleh kosong"});
            }
        } else {
            setFormError(updatedFormError);
        }
    };

    const handleDelete = () => {
        if (selectedComp.kodeInventaris) {
        Swal.fire({
            title: 'Anda yakin?',
            text: 'Sekalinya data dihapus tidak akan bisa dikembalikan!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1A6AA5',
            cancelButtonColor: '#C75E6C',
            confirmButtonText: 'Ya hapus saja',
        }).then((result) => {
            if (result.isConfirmed) {
                console.log('selectedruangan => ',selectedRuangan.id);
                console.log('selectedcomp => ',selectedComp.kodeInventaris);
                dispatch(deleteComp({idRuangan : selectedRuangan.id, idComp : selectedComp.kodeInventaris}))
                    .then(() => {
                        resetFormData();
                        dispatch(resetSelectedComp());
                        dispatch(fetchLayout(selectedRuangan.id));
                        Swal.fire('Deleted!', 'Ruangan berhasil dihapus!', 'success');
                    })
                    .catch(err => {
                        Swal.fire({
                            title: 'oops, ada error',
                            text: error.getMessage(),
                            icon: 'error',
                            timer: 3000,
                        });
                        console.log(err);
                    });
            }
        });
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
                                value={formData.nomor}
                                disabled={formData.kodeInventaris == "server" ? true : false}
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
                        value={formData.kodeInventaris}
                        disabled={formData.kodeInventaris == "server" ? true : false}
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
                        value={formData.prosesor}
                    />
                </div>
                <div className="col-6">
                    <Input 
                        onChange={e => handleInputChange(e)}
                        label={`Vga`}
                        type={`text`}
                        name={'vga'}
                        errorHelper={formError.vga}
                        value={formData.vga}
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
                                value={formData.ram?.ukuran}
                                errorHelper={formError["ram.ukuran"]}
                            />
                        </div>
                        <div className="col-4 ps-1">
                            <Select
                                onChange={handleInputChange}
                                label={`Tipe`}
                                type={`text`}
                                options={optionRam}
                                name={"ram.tipe"}
                                value={formData.ram?.tipe}
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
                        options={konfigurasiRamOptions}
                        name={"ram.konfigurasi"}
                        value={formData.ram?.konfigurasi}
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
                        value={formData.storage[0]}
                    />
                </div>
                <div className="col-6">
                    <Input 
                        onChange={e => handleInputChange(e)}
                        label={`Storage 2`}
                        type={`text`}
                        name={'storage[1]'}
                        errorHelper={formError.storage}
                        value={formData.storage[1]}
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
                        value={formData.storage[2]}
                    />
                </div>
                <div className="col-6">
                    <Input 
                        onChange={e => handleInputChange(e)}
                        label={`Storage 4`}
                        type={`text`}
                        name={'storage[3]'}
                        errorHelper={formError.storage}
                        value={formData.storage[3]}
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
                        value={formData.motherboard}
                    />
                </div>
                <div className="col-6">
                    <Input 
                        onChange={e => handleInputChange(e)}
                        label={`Case`}
                        type={`text`}
                        name={'case'}
                        errorHelper={formError.case}
                        value={formData.case}
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
                        value={formData.monitor}
                    />
                </div>
                <div className="col-6">
                    <Input 
                        onChange={e => handleInputChange(e)}
                        label={`Power Supply Unit`}
                        type={`text`}
                        name={'psu'}
                        errorHelper={formError.psu}
                        value={formData.psu}
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
                        value={formData.keyboard}
                    />
                </div>
                <div className="col-6">
                    <Input 
                        onChange={e => handleInputChange(e)}
                        label={`Mouse`}
                        type={`text`}
                        name={'mouse'}
                        errorHelper={formError.mouse}
                        value={formData.mouse}
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
                        value={formData.sound}
                    />
                </div>
                <div className="col-6">
                    <Input 
                        onChange={e => handleInputChange(e)}
                        label={`Additional Peripheral`}
                        type={`text`}
                        name={'additional'}
                        errorHelper={formError.additional}
                        value={formData.additional}
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
                        value={formData.status}
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
                            <Link to={`/manage/${selectedRuangan.id}/${selectedComp.kodeInventaris}`}>
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
                                        type={`submit`}
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
                                onClick={handleDelete}
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
                                name={`switchPosition`}
                                options={switchPositionOptions}
                                onChange={handleSwitchPositionSelect}
                                value={switchTarget}
                            />
                        </div>
                        <div className="col-auto">
                            <Button 
                                text={`Tukar Posisi`}
                                customClassName={`btnWarning`}
                                type={`button`}
                                disabled={selectedComp ? false : true}
                                onClick={handleSwitchPositionSubmit}
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