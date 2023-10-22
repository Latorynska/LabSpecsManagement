import Alert from "../../components/Alert/Alert";
import Button from "../../components/Button/Button";
import ButtonComp from "../../components/ButtonComp/ButtonComp";
import CustomInputWithButton from "../../components/CustomInputWithButton/CustomInputWithButton";
import Input from "../../components/Input/Input";
import LabLayout from "../../components/LabLayout/LabLayout";

import { containerNavigasiRuangan, containerNotifikasi, judulContainerNotifikasi, buttonGuideContainer } from './LandingPage.module.css';

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
                        <div className={`d-grid gap-4 ${containerNavigasiRuangan}`}>
                            <Button 
                                id="btnSubmitSearchUser"
                                type="button"
                                text="Lab Multimedia"
                                icon="right"
                                className={`d-flex justify-content-between`}
                                customClassName={`btnWhite`}
                            />
                            <Button 
                                id="btnSubmitSearchUser"
                                type="button"
                                text="Lab Jaringan Komputer"
                                icon="right"
                                className={`d-flex justify-content-between`}
                                customClassName={`btnWhite`}
                            />
                            <Button 
                                id="btnSubmitSearchUser"
                                type="button"
                                text="Lab dasar"
                                icon="right"
                                className={`d-flex justify-content-between`}
                                customClassName={`btnWhite`}
                            />
                        </div>
                        <div className={`${containerNotifikasi}`}>
                            <p className={`${judulContainerNotifikasi}`}>
                                Informasi terakhir di Lab Jaringan Komputer
                            </p>
                            <Alert 
                                className={`alert-success`}
                                message={`PC - 17 telah selesai diperbaiki, dapat digunakan kembali yay!`}
                            />
                            <Alert 
                                className={`alert-danger`}
                                message={`oops, PC - 8 mengalami masalah, klik saya untuk melihat detail masalah!`}
                            />
                            <Alert 
                                className={`alert-warning`}
                                message={`PC - 14 sepertinya memiliki masalah, klik saya untuk informasi lebih lanjut!`}
                            />
                            <Alert 
                                className={`alert-danger`}
                                message={`oops, PC - 15 mengalami masalah, klik saya untuk melihat detail masalah!`}
                            />
                            <Alert 
                                className={`alert-danger`}
                                message={`oops, PC - 18 mengalami masalah, klik saya untuk melihat detail masalah!`}
                            />
                        </div>
                    </div>
                    <div className="col-2 pt-5">
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