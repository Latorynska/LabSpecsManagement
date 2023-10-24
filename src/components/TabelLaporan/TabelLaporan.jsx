
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import Button from '../Button/Button';
import { useState } from 'react';

const TabelLaporan = () => {
    
    const [laporan, setLaporan] = useState([
        {
            'id': '1',
            'tanggal laporan': '03/10/2023',
            'device problem': 'keyboard',
            'status': 'solved',
        },
        {
            'id': '2',
            'tanggal laporan': '29/09/2023',
            'device problem': 'pc',
            'status': 'in repair',
        },
        {
            'id': '3',
            'tanggal laporan': '28/09/2023',
            'device problem': 'monitor',
            'status': 'reported',
        },
    ]);
    return ( 
        <>
            <div className="row mt-5">
                <div className="row">
                    <div className="col text-end">
                        <Button
                            text={<FontAwesomeIcon icon={faSquarePlus} size='lg' />}
                            customClassName='btnSuccess'
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
                            {laporan.map((item, index) => (
                                <tr key={index}>
                                    <td>{item['id']}</td>
                                    <td>{item['tanggal laporan']}</td>
                                    <td>{item['device problem']}</td>
                                    <td>{item['status']}</td>
                                    <td className='d-flex justify-content-center'><Button customClassName={`btnSuccess`} text={`Detail`} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
     );
}
 
export default TabelLaporan;