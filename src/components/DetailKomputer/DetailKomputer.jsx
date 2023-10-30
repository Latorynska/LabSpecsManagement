import { useEffect, useState } from 'react';
import ButtonComp from '../ButtonComp/ButtonComp';
import { textSpecs } from './DetailKomputer.module.css';
import { useSelector } from 'react-redux';
import { text } from '@fortawesome/fontawesome-svg-core';

const DetailKomputer = ({ data, ruangan }) => {
    // useEffect(() => {
    //     console.log(data);
    // }, []);
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
      
  return (
    <>
      <div className="row">
        <div className="d-flex justify-content-center">
          <ButtonComp text={data.nomor} computerStatus={data.status} />
        </div>
      </div>
      <div className="row mt-5">
        <table>
          <tbody>
            <tr className={`${textSpecs}`}>
              <td width={`35%`}>Kode Inventaris</td>
              <td width={`5%`}>:</td>
              <td width={`auto`}>{data.kodeInventaris}</td>
            </tr>
            <tr className={`${textSpecs}`}>
              <td width={`35%`}>Ruangan</td>
              <td width={`5%`}>:</td>
              <td width={`auto`}>{ruangan.namaRuangan}</td>
            </tr>
            <tr className={`${textSpecs}`}>
              <td width={`35%`}>Posisi</td>
              <td width={`5%`}>:</td>
              <td width={`auto`}>{data.posisi}</td>
            </tr>
            <tr className={`${textSpecs}`}>
              <td width={`35%`}>Status Unit</td>
              <td width={`5%`}>:</td>
              <td width={`auto`}>{data.status}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="row mt-3">
        <p className={`${textSpecs} p-0 m-0`}>Spesifikasi</p>
        <table>
          <tbody>
            <tr className={`${textSpecs}`}>
                <td width={`35%`}>Prosesor</td>
                <td width={`5%`}>:</td>
                <td width={`auto`}>{data.prosesor}</td>
            </tr>
            <tr className={`${textSpecs}`}>
                <td width={`35%`}>RAM</td>
                <td width={`5%`}>:</td>
                <td width={`auto`}>
                    {data.ram ? (
                        <>
                            {`${data.ram.ukuran} GB ${data.ram.tipe} `}
                            {getRamConfiguration(data.ram.konfigurasi)}
                        </>
                    ) : (
                        "N/A"
                    )}
                </td>
            </tr>
            <tr className={`${textSpecs}`}>
                <td width={`35%`}>VGA</td>
                <td width={`5%`}>:</td>
                <td width={`auto`}>{data.vga}</td>
            </tr>
            {
                data?.storage?.map((storageItem, index) => (
                    storageItem && (
                        <tr key={index} className={`${textSpecs}`}>
                            <td width={`35%`}>{index === 0 ? 'Storage' : ''}</td>
                            <td width={`5%`}>:</td>
                            <td width={`auto`}>{storageItem}</td>
                        </tr>
                    )
                ))
            }
            <tr className={`${textSpecs}`}>
                <td width={`35%`}>Motherboard</td>
                <td width={`5%`}>:</td>
                <td width={`auto`}>{data.motherboard}</td>
            </tr>
            <tr className={`${textSpecs}`}>
                <td width={`35%`}>Case</td>
                <td width={`5%`}>:</td>
                <td width={`auto`}>{data.case}</td>
            </tr>
            <tr className={`${textSpecs}`}>
                <td width={`35%`}>Monitor</td>
                <td width={`5%`}>:</td>
                <td width={`auto`}>{data.monitor}</td>
            </tr>
            <tr className={`${textSpecs}`}>
                <td width={`35%`}>Keyboard</td>
                <td width={`5%`}>:</td>
                <td width={`auto`}>{data.keyboard}</td>
            </tr>
            <tr className={`${textSpecs}`}>
                <td width={`35%`}>Mouse</td>
                <td width={`5%`}>:</td>
                <td width={`auto`}>{data.mouse}</td>
            </tr>
            <tr className={`${textSpecs}`}>
                <td width={`35%`}>Sound Device</td>
                <td width={`5%`}>:</td>
                <td width={`auto`}>{data.sound}</td>
            </tr>
            <tr className={`${textSpecs}`}>
                <td width={`35%`}>Additional Peripheral</td>
                <td width={`5%`}>:</td>
                <td width={`auto`}>{data.additional}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DetailKomputer;
