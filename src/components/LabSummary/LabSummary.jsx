import { useEffect, useState } from "react";

import CardSummaryBox from '../../components/CardSummaryBox/CardSummaryBox';
import {
    customPrimaryCardWrapper,
    customPrimaryCard,
    customPrimaryBodyCard,
    customWarningCardWrapper,
    customWarningCard,
    customWarningBodyCard,
    customDangerCardWrapper,
    customDangerCard,
    customDangerBodyCard,
} from './LabSummary.module.css';

const LabSummary = ({ labData }) => {
    const [cardStyle, setCardStyle] = useState({
        wrapperClass: "",
        cardClass: "",
        bodyClass: "",
        footerContent: "",
    });
    useEffect(() => {
        setCardStyle(getCardStyle(labData));
    }, [labData]);
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
            <div className={`card mb-3 bg-transparent ${cardStyle.wrapperClass}`}>
                <div className={`card-header ${cardStyle.cardClass}`}>{labData.nama}</div>
                <div className={`card-body text-success ${cardStyle.bodyClass}`}>
                    <CardSummaryBox message={labData.good} type="success" className="alert-success text-center" />
                    <CardSummaryBox message={labData.warning} type="warning" className="alert-warning text-center" />
                    <CardSummaryBox message={labData.bad} type="danger" className="alert-danger text-center" />
                </div>
                <div className={`card-footer ${cardStyle.cardClass}`}>{cardStyle.footerContent}</div>
            </div>
        </>
     );
}
 
export default LabSummary;