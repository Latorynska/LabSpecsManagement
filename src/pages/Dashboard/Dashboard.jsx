import { useEffect, useState } from 'react';
import {
    dashboardTitle,
    dashboardContainer,
    dashboardSubTitle,
    cardInformationContainer
} from './Dashboard.module.css';
import LabSummary from '../../components/LabSummary/LabSummary';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRuanganData } from '../../redux/thunks/ruanganAPI';
import { fetchSummary } from '../../redux/thunks/dashboardAPI';

const Dashboard = () => {
    const dispatch = useDispatch();
    const owner = useSelector(state => state.auth.userData.username);
    const { ruanganData } = useSelector(state => state.ruangan);
    const { labSummaryData } = useSelector(state => state.dashboard);

    useEffect(() => {
        dispatch(fetchRuanganData(owner));
        dispatch(fetchSummary(ruanganData));
    }, []);
    useEffect(() => {
        dispatch(fetchSummary(ruanganData))
    }, [ruanganData]);

    return (
        <>
            <div className={`${dashboardContainer}`}>
                <div className={`${dashboardTitle}`}>Selamat Datang Kembali {owner}!</div>
                <div className={`${dashboardSubTitle}`}>Ada informasi singkat nih buatmu terkait lab mu!</div>

                <div className={`d-flex justify-content-center gap-5 ${cardInformationContainer}`}>
                    {
                        labSummaryData?.map((lab, index) => (
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
