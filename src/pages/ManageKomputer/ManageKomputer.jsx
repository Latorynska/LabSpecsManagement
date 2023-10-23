import './ManageKomputer.module.css';
import LabLayout from '../../components/LabLayout/LabLayout';
import { useEffect } from 'react';
import Button from '../../components/Button/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

const ManageKomputer = () => {
    useEffect(() => {
        console.log('euy');
    }, []);
    return (
            <div className="row m-0 p-0">
                <div className="col-6 p-5">
                    <div className="row">
                        <div className="col-3">
                            <Button 
                                text={`Kembali`}
                                icon={`left`}
                            />
                        </div>
                        <div className="col-9">

                        </div>
                    </div>
                    <LabLayout />
                </div>
                <div className="col-6"></div>
            </div>
     );
}
 
export default ManageKomputer;