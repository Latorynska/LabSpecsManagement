import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import Select from '../Select/Select';
import TextArea from '../TextArea/TextArea';
import { titleManageLaporan } from './FormLaporanMasalah.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { createLaporan, fetchComputerAndRuangData } from '../../redux/thunks/computerAPI';
import Swal from 'sweetalert2';
import { resetSelectedLaporan } from '../../redux/slices/computerSlice';
import { useNavigate } from 'react-router-dom';

const FormLaporanMasalah = ({ idRuangan, computerId, access }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedLaporan, loading, error, ruanganData, data } = useSelector(state => state.computer);
    const [formData, setFormData] = useState(
        selectedLaporan ? selectedLaporan : 
        {
            tanggal: '',
            device: 'pc',
            details: '',
            status: 'warning',
        }
    );

    const [formError, setFormError] = useState({
        tanggal: '',
        device: '',
        details: '',
        status: '',
    });
    const [formDisabled, setFormDisabled] = useState(false);

    const deviceOptions = [
        { value: 'pc', label: 'PC' },
        { value: 'monitor', label: 'Monitor' },
        { value: 'Keyboard', label: 'Keyboard' },
        { value: 'Mouse', label: 'Mouse' },
        { value: 'Other', label: 'Other' },
    ];

    const statusOptions = [
        { value: 'warning', label: 'Has Problem' },
        { value: 'bad', label: 'Bad' },
    ];

    useEffect(() => {
        if(selectedLaporan){
            setFormData(selectedLaporan);
            setFormDisabled(true);
        } else {
            resetFormData();
            setFormDisabled(false);
        }
        setFormError({
            tanggal: '',
            device: '',
            details: '',
            status: '',
        })
    }, [selectedLaporan]);

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

    const resetFormData = () => {
        setFormData({
            tanggal: '',
            device: 'pc',
            details: '',
            status: 'warning',
        })
    }
    const validateDate = (date) => {
            const datePattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

        if (!datePattern.test(date)) {
            return 'Tanggal laporan harus dalam format DD/mm/YYYY';
        }

        const [day, month, year] = date.split('/');
        const parsedDate = new Date(year, month - 1, day);

        if (
            parsedDate.getDate() !== parseInt(day, 10) ||
            parsedDate.getMonth() !== parseInt(month, 10) - 1 ||
            parsedDate.getFullYear() !== parseInt(year, 10)
        ) {
            return 'Tanggal laporan tidak valid';
        }
            return '';
    };

    const handleInputError = (name, value) => {
        if (value.trim() === '') {
            setFormError({ ...formError, [name]: `${name} tidak boleh kosong` });
        } else if (name === 'tanggal') {
            const error = validateDate(value);
            setFormError({ ...formError, [name]: error });
        } else {
            setFormError({ ...formError, [name]: '' });
        }
    };

    const handleInputChange = (e) => {
        const { value, name } = e.target;
        setFormData({ ...formData, [name]: value });
        handleInputError(name, value);
    };

    const formValid = () => {
        for (const key in formData) {
            if (formData[key].trim() === '') {
                setFormError({ ...formError, [key]: `${key} tidak boleh kosong` });
                return false;
            }
        }
        
        const dateError = validateDate(formData.tanggal);
        if (dateError) {
            setFormError({ ...formError, tanggal: dateError });
            return false;
        }
        
        for (const key in formError) {
            if (formError[key]) {
                return false;
            }
        }
        
        return true;
    }
    
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = formValid();
        console.log("form error => ", formError);
        console.log(isValid);
        if (isValid) {
            console.log("laporan sent =>", formData);
            dispatch(createLaporan({ idRuangan, computerId, laporanData : formData}))
            .then(() => {
                if(error){
                    Swal.fire({
                        title: 'oops, ada error',
                        text: error.getMessage(),
                        icon: 'error',
                        timer: 3000,
                    });
                } else {
                    dispatch(resetSelectedLaporan());
                    dispatch(fetchComputerAndRuangData({idRuangan: idRuangan, computerId: computerId}));
                    resetFormData();
                    Swal.fire({
                        title: 'Laporan dibuat!',
                        icon: 'success',
                        timer: 3000,
                    })
                    if(access && access == "guest"){
                        navigate('/', { state: { fromGuestLaporan: true } });
                    }
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
        } else {
        }
    }
    
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
                <form action="#" onSubmit={handleSubmit}>
                    <div className="mt-3">
                    <Input
                        label={`Tanggal laporan`}
                        placeholder={`DD/mm/YYYY`}
                        name={`tanggal`}
                        errorHelper={formError?.tanggal}
                        value={formData?.tanggal}
                        onChange={handleInputChange}
                        disabled={formDisabled}
                    />
                    </div>
                    <div className="mt-3">
                        <Select 
                            options={deviceOptions} 
                            label={`Device Bermasalah`} 
                            name={`device`} 
                            value={formData?.device}
                            onChange={handleInputChange}
                            disabled={formDisabled}
                        />
                    </div>
                    <div className="mt-3">
                    <TextArea
                        rows={6}
                        label={`Kronologi dan Detail Permasalahan`}
                        name={`details`}
                        value={formData?.details}
                        errorHelper={formError?.details}
                        onChange={handleInputChange}
                        disabled={formDisabled}
                    />
                    </div>
                    <div className="mt-3">
                    <Select
                        options={statusOptions}
                        label={`Status`}
                        name={`status`}
                        value={formData?.status}
                        errorHelper={formError?.status}
                        onChange={handleInputChange}
                        disabled={formDisabled}
                    />
                    </div>
                    <div className="mt-5 d-flex justify-content-end">
                    {selectedLaporan ? '' : <Button text={`Submit`} customClassName={`btnPrimary`} type={`submit`} />}
                    </div>
                </form>
            </div>
            <div className="col-2"></div>
        </div>
        </>
    );
};

export default FormLaporanMasalah;
