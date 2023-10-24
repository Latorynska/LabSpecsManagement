import Button from '../Button/Button';
import { containerNavigasiRuangan } from './RuanganButtonList.module.css';

const RuanganButtonList = () => {
    return ( 
        <>
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
        </>
     );
}
 
export default RuanganButtonList;