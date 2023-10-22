import { useState } from 'react';
import CardSummaryBox from '../../components/CardSummaryBox/CardSummaryBox';
import {
    dashboardTitle,
    dashboardContainer,
    dashboardSubTitle,
    cardInformationContainer,
    customPrimaryCardWrapper,
    customPrimaryCard,
    customPrimaryBodyCard,
    customWarningCardWrapper,
    customWarningCard,
    customWarningBodyCard,
    customDangerCardWrapper,
    customDangerCard,
    customDangerBodyCard,
} from './Dashboard.module.css';

const Dashboard = () => {
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

    const getCardStyle = (lab) => {
        if (lab.bad > 1 || lab.warning >= 3) {
            return {
                wrapperClass: customDangerCardWrapper,
                cardClass: customDangerCard,
                bodyClass: customDangerBodyCard,
                footerContent: "Waduh lab mu kayaknya perlu maintenance nih",
            };
        } else if (lab.warning > 0 || lab.bad > 0) {
            return {
                wrapperClass: customWarningCardWrapper,
                cardClass: customWarningCard,
                bodyClass: customWarningBodyCard,
                footerContent: "Lab ini kayaknya perlu kamu cek, walaupun bisa dipakai bukan berarti gak ada masalah!",
            };
        } else {
            return {
                wrapperClass: customPrimaryCardWrapper,
                cardClass: customPrimaryCard,
                bodyClass: customPrimaryBodyCard,
                footerContent: "Sejauh ini gak ada masalah sama sekali! Jadi tetap pantau ya!",
            };
        }
    };

    return (
        <>
            <div className={`${dashboardContainer}`}>
                <div className={`${dashboardTitle}`}>Selamat Datang Kembali Username!</div>
                <div className={`${dashboardSubTitle}`}>Ada informasi singkat nih buatmu terkait lab mu!</div>

                <div className={`d-flex justify-content-center gap-5 ${cardInformationContainer}`}>
                    {labData.map((lab, index) => {
                        const cardStyle = getCardStyle(lab);

                        return (
                            <div key={index} className={`card mb-3 bg-transparent ${cardStyle.wrapperClass}`}>
                                <div className={`card-header ${cardStyle.cardClass}`}>{lab.nama}</div>
                                <div className={`card-body text-success ${cardStyle.bodyClass}`}>
                                    <CardSummaryBox message={lab.good} type="success" className="alert-success text-center" />
                                    <CardSummaryBox message={lab.warning} type="warning" className="alert-warning text-center" />
                                    <CardSummaryBox message={lab.bad} type="danger" className="alert-danger text-center" />
                                </div>
                                <div className={`card-footer ${cardStyle.cardClass}`}>{cardStyle.footerContent}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
