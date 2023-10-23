import './ManageKomputer.module.css';
import LabLayout from '../../components/LabLayout/LabLayout';
import { useEffect } from 'react';

const ManageKomputer = () => {
    useEffect(() => {
        console.log('euy');
    }, []);
    return ( 
        <>
            <div className="row">
                <div className="col-6">
                    <LabLayout />
                </div>
                <div className="col-6"></div>
            </div>
        </>
     );
}
 
export default ManageKomputer;