import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { containerRuangan, titleManageKomputer, accessingTitle } from './ManageKomputer.module.css';
import LabLayout from '../../components/LabLayout/LabLayout';
import Button from '../../components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';
import Input from '../../components/Input/Input';
import Switch from '../../components/Switch/Switch';
import ButtonComp from '../../components/ButtonComp/ButtonComp';
import FormDataKomputer from '../../components/FormDataKomputer/FormDataKomputer';
import { useSelector } from 'react-redux';

const ManageKomputer = () => {
    const navigate = useNavigate();
    const selectedComp = useSelector(state => state.lablayout.selectedComp);
    useEffect(() => {
        console.log('euy');
    }, []);

    return (
        <>
            <div className={`text-center ${titleManageKomputer} pt-5`}>
                Anda sedang mengelola : Lab Jaringan Komputer
            </div>
            <div className="row m-0 p-0">
                <div className="col-5 ps-5 pt-5">
                    <div className={`${containerRuangan}`}>
                        <div className="row">
                            <div className="col-2">
                                <Button 
                                    text={`Kembali`}
                                    icon={`left`}
                                    className={`d-flex justify-content-between w-100`}
                                    customClassName={`btnPrimary`}
                                    onClick={() => navigate(-1)}
                                />
                            </div>
                            <div className="col-8">
                                <Input 
                                    labelPosition={`kiri`}
                                    label={`Password`}
                                    type={`password`}
                                    className="" 
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
                        <LabLayout access={'user'} />
                    </div>
                </div>
                <div className="col-6 ms-5">
                    <div className="row p-5">
                        <div className={`text-center ${titleManageKomputer} pt-5`}>
                            Form Pendataan PC
                        </div>
                    </div>
                    <div className="row">
                        <div className={`col-6 d-flex align-items-center ${accessingTitle}`} >
                            Sedang mengakses data :
                        </div>
                        <div className="col-6">
                            {
                                selectedComp ? 
                                <ButtonComp 
                                    text={selectedComp.status == 'empty' ? '-' : selectedComp.nomor}
                                    computerStatus={selectedComp.status}
                                />
                                :
                                <ButtonComp
                                    text={`NEW`}
                                    computerStatus='add'
                                />
                            }
                        </div>
                    </div>
                    <FormDataKomputer />
                </div>
            </div>
        </>
    );
}

export default ManageKomputer;
