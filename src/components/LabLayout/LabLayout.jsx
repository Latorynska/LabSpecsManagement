import React, { useEffect, useState } from 'react';
import ButtonComp from '../ButtonComp/ButtonComp';
import { containerBox, rowComp } from './LabLayout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLayout } from '../../redux/thunks/LabLayoutAPI';
import { resetSelectedComp, setSelectedComp } from '../../redux/slices/LabLayoutSlice';

const LabLayout = ({ access }) => {
    const dispatch = useDispatch();
    const { selectedRuangan } = useSelector(state => state.ruangan);
    const { comps } = useSelector(state => state.lablayout);

    const [computerData, setComputerData] = useState([]);

    useEffect(() => {
        if (selectedRuangan && comps.length > 0) {
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
        }
    }, [selectedRuangan, dispatch]);

    return (
        <>
            <div className={`${containerBox} `}>
                <div className="row">
                    <div className="col-12 d-flex justify-content-between">
                        <ButtonComp
                            text={`Server`}
                            computerStatus={`good`}
                        />
                    </div>
                </div>
                {computerData.map((row, rowIndex) => {
                    return (
                        <div key={rowIndex} className={`row ${rowComp}`}>
                            <div className="col-12 d-flex justify-content-between gap-5">
                                {row.map((item, columnIndex) => (
                                    item ? (
                                        <ButtonComp
                                            key={columnIndex}
                                            text={item.status == 'empty' ? '-' : item.nomor}
                                            computerStatus={item.status}
                                            to={ access == "user" ? `/manage/${selectedRuangan.id}` : `/`}
                                            onClick={() => {dispatch(setSelectedComp(item))}} 
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
                    );
                })}
                {access === "user" &&
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
                }
            </div>
        </>
    );
}

export default LabLayout;
