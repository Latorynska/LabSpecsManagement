import { useState } from 'react';
import ButtonComp from '../ButtonComp/ButtonComp';
import { textSpecs } from './DetailKomputer.module.css';


const DetailKomputer = () => {
    
    const [ruangan, setRuangan] = useState('Lab Jaringan Komputer');
    const [data, setData] = useState({
        'kode': 'Jarkom/pc-3',
        'posisi': '3',
        'status': 'good',
        'specs': {
            'prosesor': 'intel i5-6500',
            'ram': '16gb ddr4 dual channel',
            'storage': ['Adata SU650 512GB', 'Vgen 128gb', 'Seagate 2TB'],
            'motherboard': 'Asus H110M-K',
            'case': 'Armageddon Tron Holo 5 atx',
            'monitor': 'Acer Nitro VG240Y',
            'keyboard': 'Logitech K120',
            'mouse': 'Logitech B100',
            'sound device': '',
            'additional peripheral': '',
        }
    });
    
    let storageAdded = false;
    return ( 
        <>
            <div className="row">
                <div className="d-flex justify-content-center">
                <ButtonComp text={3} computerStatus={`good`} />
                </div>
            </div>
            <div className="row mt-5">
                <table>
                    <tbody>
                        <tr className={`${textSpecs}`}>
                            <td width={`35%`}>Kode Inventaris</td>
                            <td width={`5%`}>:</td>
                            <td width={`auto`}>{data.kode}</td>
                        </tr>
                        <tr className={`${textSpecs}`}>
                            <td width={`35%`}>Ruangan</td>
                            <td width={`5%`}>:</td>
                            <td width={`auto`}>{ruangan}</td>
                        </tr>
                        <tr className={`${textSpecs}`}>
                            <td width={`35%`}>Posisi</td>
                            <td width={`5%`}>:</td>
                            <td width={`auto`}>{data.posisi}</td>
                        </tr>
                        <tr className={`${textSpecs}`}>
                            <td width={`35%`}>Status Unit</td>
                            <td width={`5%`}>:</td>
                            <td width={`auto`}>{data.status}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="row mt-3">
                <p className={`${textSpecs} p-0 m-0`}>Spesifikasi</p>
                <table>
                    <tbody>
                        {Object.entries(data.specs).map(([key, value]) => {
                            if (key === 'storage' && Array.isArray(value)) {
                            return value.map((storageItem, index) => {
                                if (!storageAdded) {
                                storageAdded = true;
                                return (
                                    <tr key={index}>
                                    <td className={`${textSpecs} p-0 m-0`} width="35%">Storage</td>
                                    <td className={`${textSpecs} p-0 m-0`} width="5%">:</td>
                                    <td className={`${textSpecs} p-0 m-0`} width="auto">
                                        {storageItem || 'N/A'}
                                    </td>
                                    </tr>
                                );
                                }
                                return (
                                <tr key={index}>
                                    <td className={`${textSpecs} p-0 m-0`} width="35%"></td>
                                    <td className={`${textSpecs} p-0 m-0`} width="5%">:</td>
                                    <td className={`${textSpecs} p-0 m-0`} width="auto">
                                    {storageItem || 'N/A'}
                                    </td>
                                </tr>
                                );
                            });
                            }
                            return (
                            <tr key={key}>
                                <td className={`${textSpecs} p-0 m-0`} width="35%">{key}</td>
                                <td className={`${textSpecs} p-0 m-0`} width="5%">:</td>
                                <td className={`${textSpecs} p-0 m-0`} width="auto">
                                {value || 'N/A'}
                                </td>
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
     );
}
 
export default DetailKomputer;