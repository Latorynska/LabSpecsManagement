import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { generateChat } from "../../redux/thunks/aiAPI";
import { addUserMessage } from "../../redux/slices/aiSlice";
import TextArea from "../../components/TextArea/TextArea";
import Button from "../../components/Button/Button";

const AiChat = () => {
    const dispatch = useDispatch();
    const [inputMessage, setInputMessage] = useState('');
    const { chatMessages, loading } = useSelector((state) => state.ai);
    const { selectedLaporan, data } = useSelector(state => state.computer);
    const owner = useSelector(state => state.auth.userData.username);
    const [textAreaRows, setTextAreaRows] = useState(14);

    
    const handleInputChange = (event) => {
        setInputMessage(event.target.value);
    };

    const handleSendMessage = () => {
        const messages = [...chatMessages, { content: inputMessage, role: "user" }];
        dispatch(addUserMessage(inputMessage));
        setInputMessage('');
        dispatch(generateChat(messages));
    };

    

    function getRamConfiguration(konfigurasi) {
        switch (konfigurasi) {
          case "1":
            return "single channel";
          case "2":
            return "dual channel";
          case "3":
            return "triple channel";
          case "4":
            return "quad channel";
          default:
            return "not configured";
        }
    }
      
    useEffect(() => {
        if (selectedLaporan) {
            const excludedFields = ['kodeInventaris', 'nomor', 'posisi', 'status'];
        
            const formattedData = Object.entries(data)
                .filter(([key, value]) => !excludedFields.includes(key) && value !== '')
                .map(([key, value]) => {
                let formattedValue = value;
                if (key === 'ram' && value.konfigurasi) {
                    formattedValue = `${value.ukuran}GB ddr4 ${getRamConfiguration(value.konfigurasi)}`;
                } else if (typeof value === 'object') {
                    const nonEmptyValues = Object.values(value).filter((val) => val !== '');
                    formattedValue = nonEmptyValues.join(', ');
                }
                return `${key.charAt(0).toUpperCase() + key.slice(1)}: ${formattedValue}`;
                });
        
            const dataString = formattedData.join('\n');
        
            setInputMessage(
                `Saya memiliki komputer dengan spesifikasi sebagai berikut:\n${dataString}\nYang kini memiliki kronologi masalah seperti ini: ${selectedLaporan.details}, kira-kira penyebab masalah dan cara perbaiki nya gimana ya?`
            );
        }
    }, []);
      
      

    useEffect(() => {
        if (loading) {
            Swal.fire({
            title: 'mohon tunggu, AI sedang berpikir',
            allowOutsideClick: false,
            showConfirmButton: false, 
            didOpen: () => {
                Swal.showLoading();
            }
            });
        } else {
            Swal.close();
        }
    }, [loading]);

    useEffect(() => {
        const messageLines = inputMessage.split('\n').length;
        setTextAreaRows(Math.min(14, messageLines));
    }, [inputMessage]);
    return (
        <div className="container mt-5">
            {
                chatMessages.length > 0 ? 
                <div className="row">
                        <div className="chat-messages overflow-auto" style={{ height:'50vh' }}>
                            {chatMessages.map((message, index) => (
                                message.role === 'assistant' ?
                                <div className="row" key={index}>
                                    <h6 className="text-white">Ai assisstant</h6>
                                    <div className="col-8">
                                        <div 
                                            key={index} 
                                            className={`alert alert-success`}
                                        >
                                            {message.content}
                                        </div>
                                    </div>
                                    <div className="col-4"></div>
                                </div>
                                :
                                <div className="row" key={index}>
                                    <h6 className="text-white text-end">{owner}</h6>
                                    <div className="col-4"></div>
                                    <div className="col-8">
                                        <div 
                                            key={index} 
                                            className={`alert alert-dark`}
                                        >
                                            {message.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                </div> : 
                <h5 className="text-white">Mulai Konsultasi anda sekarang!</h5>
            }
            <div className="row mt-5">
                <div className="col-10">
                    <TextArea 
                        type="text" 
                        placeholder="Ketik pesan Anda..." 
                        value={inputMessage} 
                        onChange={handleInputChange} 
                        rows={textAreaRows}
                    />
                </div>
                <div className="col-2 d-flex justify-content-center align-items-center">
                    <Button 
                        onClick={handleSendMessage} 
                        customClassName={`btnPrimary`}
                        className={`w-100`}
                        text={`Kirim`}
                    />
                </div>
            </div>
        </div>
    );
}

export default AiChat;
