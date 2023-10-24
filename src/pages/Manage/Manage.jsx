import LabLayout from "../../components/LabLayout/LabLayout";
import { containerRuangan } from './Manage.module.css';
import PasswordRuangan from "../../components/PasswordRuangan/PasswordRuangan";
import FormRuangan from "../../components/FormRuangan/FormRuangan";

const Manage = () => {

    return ( 
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-6">
                        <FormRuangan />
                    </div>
                    <div className="col-6">
                        <div className={`${containerRuangan}`}>
                            <div className="row">
                                <PasswordRuangan />
                            </div>
                            <div className="row mt-2">
                                <LabLayout access={"user"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default Manage;
