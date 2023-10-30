
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import Button from '../Button/Button';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetSelectedLaporan, setSelectedLaporan } from '../../redux/slices/computerSlice';

const TabelLaporan = () => {
    const { laporanData } = useSelector(state => state.computer);
    const dispatch = useDispatch();

    const selectLaporan = (laporan) => {
        dispatch(setSelectedLaporan(laporan));
    }
    // useEffect(() => {
    //     console.log(laporanData);
    // }, []);

    return ( 
        <>
            <div className="row mt-5">
                <div className="row">
                    <div className="col text-end">
                        <Button
                            text={<FontAwesomeIcon icon={faSquarePlus} size='lg' />}
                            customClassName='btnSuccess'
                            onClick={() => dispatch(resetSelectedLaporan())}
                        />
                    </div>
                </div>
                <div className="row mt-2">
                    <table className="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Tanggal Laporan</th>
                                <th>Device Problem</th>
                                <th>Status</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody className='table-group-divider'>
                            {
                                laporanData.length > 0 ? laporanData.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.id}</td>
                                        <td>{item.tanggal}</td>
                                        <td>{item.device}</td>
                                        <td>{item.status === "warning" ? "Has Problem" : item.status}</td>
                                        <td className='d-flex justify-content-center'>
                                            <Button 
                                                customClassName={`btnSuccess`} 
                                                text={`Detail`} 
                                                onClick={() =>selectLaporan(item)}
                                            />
                                        </td>
                                    </tr>
                                )) : 
                                <tr>
                                    <th colSpan={5} className='text-center'>Komputer ini belum pernah dapet masalah!</th>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
     );
}
 
export default TabelLaporan;