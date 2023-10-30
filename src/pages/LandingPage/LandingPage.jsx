import { useEffect, useState } from "react";
import CustomInputWithButton from "../../components/CustomInputWithButton/CustomInputWithButton";
import GuideInformation from "../../components/GuideInformation/GuideInformation";
import LabLayout from "../../components/LabLayout/LabLayout";
import ListNotifikasi from "../../components/ListNotifikasi/ListNotifikasi";
import RuanganButtonList from "../../components/RuanganButtonList/RuanganButtonList";
import { useDispatch } from "react-redux";
import { resetRuanganData, resetSelectedRuangan } from "../../redux/slices/ruanganSlice";
import { fetchRuanganData } from "../../redux/thunks/ruanganAPI";
import { resetSelectedLaporan } from "../../redux/slices/computerSlice";

const LandingPage = () => {
    const dispatch = useDispatch();
    const [usernameSearch, setUsernameSearch] = useState('');
    const [usernameSearchError, setUsernameSearchError] = useState('');


    useEffect(() => {
    //     dispatch(resetSelectedLaporan());
        dispatch(resetSelectedRuangan());
    //     dispatch(resetRuanganData());

    //     return () => {
    //         dispatch(resetSelectedRuangan());
    //         dispatch(resetSelectedRuangan());
    //         dispatch(resetRuanganData());
    //     }
    }, []);

    const handleSearchInputChange = (e) => {
        setUsernameSearch(e.target.value)
        if(e.target.value == ""){
            setUsernameSearchError("silahkan masukkan username terlebih dahulu");
        }
        else{
            setUsernameSearchError("");
        }
    }

    const handleSubmitSearch = () => {
        if(usernameSearch){
            dispatch(fetchRuanganData(usernameSearch))
            .then((res) => {
                if(res.payload.length < 1){
                    setUsernameSearchError("nama pengguna tidak ditemukan");   
                }
            });
        }
        else{
            setUsernameSearchError("silahkan masukkan username terlebih dahulu");
        }
    }
    return ( 
        <>
            <section className="container-fluid">
                <div className="row">
                    <div className="col-5 p-5">
                        <CustomInputWithButton 
                            value={usernameSearch}
                            onChange={handleSearchInputChange}
                            label={`Instansi`}
                            errorHelper={usernameSearchError}
                            onSubmit={handleSubmitSearch}
                        />
                        <RuanganButtonList />
                        <ListNotifikasi />
                    </div>
                    <div className="col-2 pt-5">
                        <GuideInformation />
                    </div>
                    <div className="col-5">
                        <LabLayout access={`guest`}/>
                    </div>
                </div>
            </section>
        </>
     );
}
 
export default LandingPage;