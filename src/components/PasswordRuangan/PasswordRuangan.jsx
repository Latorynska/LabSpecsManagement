import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import Input from "../Input/Input";
import Switch from "../Switch/Switch";

const PasswordRuangan = () => {
    return ( 
        <>
            <div className="col-7">
                <Input 
                    labelPosition={`kiri`}
                    label={`Password`}
                    type={`password`}
                    className="mb-3"
                />
            </div>
            <div className="col-2 d-flex align-items-center">
                <Switch 
                    id={`statusPasswordRuangan`}
                    onChange={e => console.log('switched')}
                />
                <FontAwesomeIcon icon={faCircleQuestion} className="text-white"/>
            </div>
        </>
     );
}
 
export default PasswordRuangan;