import { useEffect, useState } from 'react';
import ButtonComp from '../ButtonComp/ButtonComp';
import { containerBox, rowComp } from './LabLayout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLayout } from '../../redux/thunks/LabLayoutAPI';

const LabLayout = ({ access }) => {
    const dispatch = useDispatch();
    const { selectedRuangan } = useSelector(state => state.ruangan);
    const { comps } = useSelector(state => state.lablayout);

    const [computerData, setComputerData] = useState([]);

    useEffect(() => {
        if (selectedRuangan && comps.length > 0) {
            const { konfigurasi } = selectedRuangan;
            const rows = [];
            let dataIndex = 0;
            for (let i = 0; i < konfigurasi.length; i++) {
                const row = [];
                for (let j = 0; j < konfigurasi[i]; j++) {
                    row.push(comps[dataIndex]);
                    dataIndex++;
                }
                rows.push(row);
            }
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
                {computerData.map((row, rowIndex) => (
                    <div key={rowIndex} className={`row ${rowComp}`}>
                        <div className="col-12 d-flex justify-content-between gap-5">
                            {row.map((item, columnIndex) => (
                                item ? (
                                    <ButtonComp
                                        key={columnIndex}
                                        text={item.nomor}
                                        computerStatus={item.status}
                                    />
                                ) : ''
                            ))}
                        </div>
                    </div>
                ))}
                {access === "user" &&
                    <div className={`row ${rowComp}`}>
                        <div className="col-12 d-flex justify-content-center gap-5">
                            <Link to={`/manage/jarkom`}>
                                <ButtonComp
                                    text={<FontAwesomeIcon icon={faSquarePlus} size='2xs' />}
                                    computerStatus='empty'
                                />
                            </Link>
                        </div>
                    </div>
                }
            </div>
        </>
    );
}

export default LabLayout;
