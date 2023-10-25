import { useState } from 'react';
import {
    dashboardTitle,
    dashboardContainer,
    dashboardSubTitle,
    cardInformationContainer
} from './Dashboard.module.css';
import LabSummary from '../../components/LabSummary/LabSummary';
import { useSelector } from 'react-redux';

const Dashboard = () => {
    const { username } = useSelector(state => state.auth.userData);
    const [labData, setLabData] = useState([
        {
            nama: 'Lab Dasar',
            bad: 0,
            good: 18,
            warning: 0,
        },
        {
            nama: 'Lab Jarkom',
            bad: 3,
            good: 18,
            warning: 1,
        },
        {
            nama: 'Lab Multimedia',
            bad: 0,
            good: 18,
            warning: 2,
        },
    ]);

    return (
        <>
            <div className={`${dashboardContainer}`}>
                <div className={`${dashboardTitle}`}>Selamat Datang Kembali {username}!</div>
                <div className={`${dashboardSubTitle}`}>Ada informasi singkat nih buatmu terkait lab mu!</div>

                <div className={`d-flex justify-content-center gap-5 ${cardInformationContainer}`}>
                    {
                        labData.map((lab, index) => (
                            <LabSummary 
                                key={index}
                                labData={lab}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    );
};

export default Dashboard;
