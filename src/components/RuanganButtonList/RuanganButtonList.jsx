import { useDispatch, useSelector } from 'react-redux';
import Button from '../Button/Button';
import { containerNavigasiRuangan } from './RuanganButtonList.module.css';
import { setSelectedRuangan } from '../../redux/slices/ruanganSlice';

const RuanganButtonList = () => {
    const dispatch = useDispatch();
    const { ruanganData, selectedRuangan } = useSelector(state => state.ruangan);

    const handleClick = (ruangan) => {
        dispatch(setSelectedRuangan(ruangan))
    }
    return ( 
        <>
            <div className={`d-grid gap-4 ${containerNavigasiRuangan}`}>
                {
                    ruanganData && ruanganData. length > 0 ? 
                    ruanganData.map((item, index) => (
                        <Button 
                            key={item.id}
                            id="btnSubmitSearchUser"
                            type="button"
                            text={item.namaRuangan}
                            icon="right"
                            className={`d-flex justify-content-between`}
                            customClassName={ selectedRuangan?.id == item.id ? `btnFocus` : `btnWhite`}
                            onClick={() => {handleClick(item)}}
                        />
                    )) :
                    ''
                }
            </div>
        </>
     );
}
 
export default RuanganButtonList;