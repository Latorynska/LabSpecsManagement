import { useEffect, useState } from 'react';
import Button from '../Button/Button';
import Select from '../Select/Select';
import TextArea from '../TextArea/TextArea';
import { titleManageLaporan } from './FormPenyelesaianMasalah.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { createPenyelesaian, deleteLaporan, fetchComputerAndRuangData } from '../../redux/thunks/computerAPI';
import Swal from 'sweetalert2';
import { resetSelectedLaporan } from '../../redux/slices/computerSlice';

const FormPenyelesaianMasalah = () => {
    const dispatch = useDispatch();
    const { selectedLaporan, ruanganData, data, error, loading } = useSelector(state => state.computer);
    const [formData, setFormData] = useState({
        details: '',
        status: 'solved',
    });
    const [formError, setFormError] = useState({
        details: '',
        status: ''
    });

    const statusOptions = [
        {value:'solved', label:'Solved'},
        {value:'in repair', label:'In Repair'}
    ]


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]:value,
        })
    }
    
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
    useEffect(() => {
        if(selectedLaporan.penyelesaian){
            setFormData({
                details: selectedLaporan.penyelesaian.details,
                status: selectedLaporan.penyelesaian.status,
            });
        }
    }, [selectedLaporan]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.details == ""){
            setFormError({
                ...formError,
                details: 'Detail penyelesaian tidak boleh kosong'
            })
        } else {
            // console.log('send ruangan => ', ruanganData.id);
            // console.log('send computer => ', data.kodeInventaris);
            // console.log('send laporan => ', selectedLaporan.id);
            // console.log('send data => ', formData);
            setFormError({details:'',status:''});
            dispatch(createPenyelesaian({
                laporanId: selectedLaporan.id, 
                idRuangan: ruanganData.id, 
                computerId: data.kodeInventaris, 
                penyelesaianData: formData
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
                    Swal.fire({
                        title: 'Penyelesaian diperbarui',
                        icon: 'success',
                        timer: 3000,
                    });
                    dispatch(resetSelectedLaporan());
                    setFormData({
                        details: '',
                        status: 'solved'
                    });
                    dispatch(fetchComputerAndRuangData({idRuangan: ruanganData.id, computerId: data.kodeInventaris}));
                }
            })
            .catch(err => {
                console.log(err);
            })
        }
    }
    const handleDelete = () => {
        if (selectedLaporan) {
            Swal.fire({
                title: 'Anda yakin?',
                text: 'Sekalinya data dihapus tidak akan bisa dikembalikan!',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#1A6AA5',
                cancelButtonColor: '#C75E6C',
                confirmButtonText: 'Ya hapus saja',
            })
            .then((result) => {
                if (result.isConfirmed) {
                dispatch(deleteLaporan({ idRuangan: ruanganData.id, computerId: data.kodeInventaris, laporanId: selectedLaporan.id}))
                .then(() => {
                        dispatch(resetSelectedLaporan());
                        Swal.fire('Deleted!', 'Laporan berhasil dihapus!', 'success');
                        })
                        .catch((error) => {
                        Swal.fire({
                            title: 'Oops, ada error',
                            text: error,
                            icon: 'error',
                            timer: 3000,
                        });
                        console.log(error);
                });
                }
            })
            .catch(err => {
                Swal.fire({
                    title: 'Oops, ada error',
                    text: err,
                    icon: 'error',
                    timer: 3000,
                });
                console.log(err);
            });
        }
    };
      

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
                    <form action="#" onSubmit={handleSubmit}>
                        <div className="mt-3">
                            <TextArea 
                                label={`Catatan Penyelesaian`}
                                rows={6}
                                name={`details`}
                                value={formData.details}
                                onChange={handleInputChange}
                                errorHelper={formError.details}
                            />
                        </div>
                        <div className="mt-3">
                            <Select 
                                label={`Status`}
                                options={statusOptions}
                                name={`status`}
                                value={formData.status}
                                onChange={handleInputChange}
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
                                            type={`button`}
                                            onClick={handleDelete}
                                        />
                                    </div>
                                </div>
                                <div className="col-5">
                                    <div className="d-flex justify-content-end">
                                        <Button 
                                            text={`Submit`}
                                            customClassName={`btnPrimary`}
                                            type={`submit`}
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