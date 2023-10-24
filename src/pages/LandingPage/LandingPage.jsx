import CustomInputWithButton from "../../components/CustomInputWithButton/CustomInputWithButton";
import GuideInformation from "../../components/GuideInformation/GuideInformation";
import LabLayout from "../../components/LabLayout/LabLayout";
import ListNotifikasi from "../../components/ListNotifikasi/ListNotifikasi";
import RuanganButtonList from "../../components/RuanganButtonList/RuanganButtonList";

const LandingPage = () => {

    return ( 
        <>
            <section className="">
                <div className="row">
                    <div className="col-5 p-5">
                        <CustomInputWithButton 
                            value=""
                            onChange={e => console.log(e.target.value)}
                            label={`Instansi`}
                        />
                        <RuanganButtonList />
                        <ListNotifikasi />
                    </div>
                    <div className="col-2 pt-5">
                        <GuideInformation />
                    </div>
                    <div className="col-5">
                        <LabLayout />
                    </div>
                </div>
            </section>
        </>
     );
}
 
export default LandingPage;