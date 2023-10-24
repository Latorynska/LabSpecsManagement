import ButtonComp from '../ButtonComp/ButtonComp';
import { buttonGuideContainer } from './GuideInformation.module.css';


const GuideInformation = () => {
    return ( 
        <>
            <div className={`${buttonGuideContainer}`}>
                <ButtonComp 
                    text={`GOOD`}
                    computerStatus="good"
                />
                <ButtonComp 
                    text={`BAD`}
                    computerStatus={`bad`}
                />
                <ButtonComp 
                    text={`-`}
                    computerStatus={`empty`}
                />
                <ButtonComp 
                    text={`Has Problem`}
                    computerStatus={`warning`}
                />
            </div>
        </>
     );
}
 
export default GuideInformation;