import React, { useEffect, useState } from 'react';
import ButtonComp from '../ButtonComp/ButtonComp';
import { containerBox, rowComp } from './LabLayout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLayout, fetchServerData } from '../../redux/thunks/lablayoutAPI';
import { resetCompsAndServer, resetSelectedComp, setSelectedComp } from '../../redux/slices/lablayoutSlice';
import Swal from 'sweetalert2';

const LabLayout = ({ access }) => {
    const dispatch = useDispatch();
    const { selectedRuangan, } = useSelector(state => state.ruangan);
    const { comps, server } = useSelector(state => state.lablayout);
    const loadingRuangan = useSelector(state => state.ruangan.loading);
    const loadingLayout = useSelector(state => state.lablayout.loading);

    const [computerData, setComputerData] = useState([]);

    useEffect(() => {
        if (selectedRuangan && comps && comps.length > 0) {
            const { konfigurasi } = selectedRuangan;
            const rows = [];
            
            comps.forEach((item, i) => {
                if (i % konfigurasi === 0) {
                    rows.push([]);
                }
                rows[rows.length - 1].push(item);
            });
            rows.forEach(row => {
                while (row.length < konfigurasi) {
                    row.push(null);
                }
            });

            setComputerData(rows);
        } else {
            setComputerData([]);
        }
    }, [selectedRuangan, comps]);


    useEffect(() => {
        if (selectedRuangan) {
            dispatch(fetchLayout(selectedRuangan.id));
            dispatch(fetchServerData(selectedRuangan.id))
        }
        else{
            dispatch(resetCompsAndServer());
        }
    }, []);
    useEffect(() => {
        if (selectedRuangan) {
            dispatch(fetchLayout(selectedRuangan.id));
            dispatch(fetchServerData(selectedRuangan.id))
        }
        else{
            dispatch(resetCompsAndServer());
        }
    }, [selectedRuangan, dispatch]);

    useEffect(() => {
        if(loadingLayout || loadingRuangan){
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
    }, [loadingLayout, loadingRuangan]);

    return (
        <>
            <div className={`${containerBox} `}>
                {selectedRuangan ? (
                    <>
                        <div className="row">
                            <div className="col-12 d-flex justify-content-between">
                                {
                                    server &&
                                    <ButtonComp
                                        text={`Server`}
                                        computerStatus={server.status}
                                        to={access == "user" ? `/manage/${selectedRuangan.id}` : `/`}
                                        onClick={() => { dispatch(setSelectedComp(server))}}
                                    />
                                }
                            </div>
                        </div>
                        
                        {computerData.length > 0 && computerData.map((row, rowIndex) => (
                            <div key={rowIndex} className={`row ${rowComp}`}>
                                <div className="col-12 d-flex justify-content-between gap-5">
                                    {row.map((item, columnIndex) => (
                                        item ? (
                                            <ButtonComp
                                                key={columnIndex}
                                                text={item.status == 'empty' ? '-' : item.nomor}
                                                computerStatus={item.status}
                                                to={access == "user" ? `/manage/${selectedRuangan.id}` : item.status == "good" ? `/guest/${selectedRuangan.id}/${item.kodeInventaris}` : ``}
                                                onClick={() => { dispatch(setSelectedComp(item))}}
                                            />
                                        ) : (
                                            <ButtonComp
                                                key={columnIndex}
                                                text="-"
                                                computerStatus="empty"
                                                disabled={true}
                                            />
                                        )
                                    ))}
                                </div>
                            </div>
                        ))}
                        
                        {access === "user" && (
                            <div className={`row ${rowComp}`}>
                                <div className="col-12 d-flex justify-content-center gap-5">
                                    <ButtonComp
                                        text={<FontAwesomeIcon icon={faSquarePlus} size='2xs' />}
                                        computerStatus='empty'
                                        onClick={() => dispatch(resetSelectedComp())}
                                        to={`/manage/${selectedRuangan.id}`}
                                    />
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center">
                        <h4 className='text-white'>Tolong Buat atau pilih ruangan terlebih dahulu</h4>
                    </div>
                )}
            </div>

        </>
    );
}

export default LabLayout;
