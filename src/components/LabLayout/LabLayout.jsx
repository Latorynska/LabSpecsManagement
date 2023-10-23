import { useState } from 'react';
import ButtonComp from '../ButtonComp/ButtonComp';
import { containerBox, rowComp } from './LabLayout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-regular-svg-icons';
import { Link } from 'react-router-dom';


const LabLayout = () => {
    const [serverData, setServerData] = useState({});
    const [count, setCount] = useState(0);
    const [computerData, setComputerData] = useState([
        [
            {
                name: '1',
                status: 'good',
            },
            {
                name: '2',
                status: 'good',
            },
            {
                name: '3',
                status: 'good',
            },
            {
                name: '4',
                status: 'good',
            }
        ],
        [
            {
                name: '5',
                status: 'good',
            },
            {
                name: '6',
                status: 'good',
            },
            {
                name: '7',
                status: 'good',
            },
            {
                name: '8',
                status: 'bad',
            }
        ],
        [
            {
                name: '9',
                status: 'good',
            },
            {
                name: '10',
                status: 'good',
            },
            {
                name: '11',
                status: 'good',
            },
            {
                name: '12',
                status: 'good',
            }
        ],
        [
            {
                name: '13',
                status: 'good',
            },
            {
                name: '14',
                status: 'warning',
            },
            {
                name: '15',
                status: 'bad',
            },
            {
                name: '16',
                status: 'good',
            }
        ],
        [
            {
                name: '17',
                status: 'good',
            },
            {
                name: '18',
                status: 'bad',
            },
            {
                name: '19',
                status: 'good',
            },
            {
                name: '20',
                status: 'good',
            }
        ],
        [
            {
                name: '-',
                status: 'empty',
            },
            {
                name: '21',
                status: 'good',
            },
            {
                name: '22',
                status: 'good',
            },
            {
                name: '-',
                status: 'empty',
            },
        ],
    ]);
    
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
                                <ButtonComp
                                    key={columnIndex}
                                    text={item.name}
                                    computerStatus={item.status}
                                />
                            ))}
                        </div>
                    </div>
                ))}
                <div className={`row ${rowComp}`}>
                    <div className="col-12 d-flex justify-content-center gap-5">
                        <Link to={`/manage/jarkom`}>
                            <ButtonComp
                                text={<FontAwesomeIcon icon={faSquarePlus} size='2xs'/>}
                                computerStatus='empty'
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default LabLayout;