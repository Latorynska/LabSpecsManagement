import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";
import Input from "../Input/Input";
import Select from "../Select/Select";
import TextArea from "../TextArea/TextArea";
import Swal from 'sweetalert2';
import { setSelectedRuangan, resetSelectedRuangan } from "../../redux/slices/ruanganSlice";
import { addRuanganData, updateRuanganData, deleteRuanganData, fetchRuanganData } from "../../redux/thunks/ruanganAPI";

import { formManageTitle } from "./FormRuangan.module.css";

const FormRuangan = () => {
  const dispatch = useDispatch();
  const ruanganData = useSelector((state) => state.ruangan.ruanganData);
  const loading = useSelector(state => state.ruangan.loading);
  const selectedRuangan = useSelector((state) => state.ruangan.selectedRuangan);
  const [selectedOption, setSelectedOption] = useState(selectedRuangan?.id ? "Update Ruangan" : "Tambah Baru");
  const [submitDisabled, setSubmitDisabled] = useState(false);

  const [formData, setFormData] = useState({
    id: selectedRuangan?.id || "",
    namaRuangan: selectedRuangan?.namaRuangan || "",
    konfigurasi: selectedRuangan?.konfigurasi || "",
    posisiServer: selectedRuangan?.posisiServer || "",
    deskripsi: selectedRuangan?.deskripsi || "",
  });
  const [formError, setFormError] = useState({
    namaRuangan: "",
    deskripsi: "",
  });

  const optionsKonfigurasi = [
    { label: "3 kolom", value: "3" },
    { label: "4 kolom", value: "4" },
    { label: "5 kolom", value: "5" },
  ];

  const optionsPosisi = [
    { label: "Kiri Atas", value: "Kiri Atas" },
    { label: "Kanan Atas", value: "Kanan Atas" },
  ];

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-start',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  useEffect(() => {
    dispatch(fetchRuanganData());
  }, []);

  useEffect(() => {
    setSubmitDisabled(!isValid());
  }, [formData]);

  useEffect(() => {
    if (loading) {
      Swal.fire({
        title: 'Data sedang diproses, mohon tunggu :)',
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (value === "") {
      setFormError({ ...formError, [name]: "input tidak boleh kosong" });
    }
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);
    if (value === "Tambah Baru") {
      setFormData({
        id: "",
        namaRuangan: "",
        konfigurasi: "",
        posisiServer: "",
        deskripsi: "",
      });
      dispatch(resetSelectedRuangan());
    } else {
      const selectedRuanganData = ruanganData.find((ruangan) => ruangan.id === value);
      dispatch(setSelectedRuangan(selectedRuanganData));
      setFormData(selectedRuanganData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid()) {
      if (selectedOption === "Tambah Baru") {
        dispatch(addRuanganData(formData))
          .then(() => {
            Toast.fire({
              icon: 'success',
              title: 'Data Berhasil Ditambahkan!'
            });
            setFormData({
              id: "",
              namaRuangan: "",
              konfigurasi: "",
              posisiServer: "",
              deskripsi: "",
            });
            setSelectedOption("Tambah Baru");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        dispatch(updateRuanganData({ id: formData.id, updatedData: formData }))
          .then(() => {
            Toast.fire({
              icon: 'success',
              title: 'Data Berhasil Dirubah!'
            });
            setFormData({
              id: "",
              namaRuangan: "",
              konfigurasi: "",
              posisiServer: "",
              deskripsi: "",
            });
            setSelectedOption("Tambah Baru");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Masih terdapat kolom kosong yang wajib diisi!',
        icon: 'error',
        timer: 3000,
      });
    }
  };

  const handleDelete = () => {
    if (selectedRuangan.id) {
      Swal.fire({
        title: 'Anda yakin?',
        text: 'Sekalinya data dihapus tidak akan bisa dikembalikan!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#1A6AA5',
        cancelButtonColor: '#C75E6C',
        confirmButtonText: 'Ya hapus saja',
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteRuanganData(selectedRuangan.id))
            .then(() => {
              setSelectedOption("Tambah Baru");
              setFormData({
                id: "",
                namaRuangan: "",
                konfigurasi: "",
                posisiServer: "",
                deskripsi: "",
              });
              Swal.fire('Deleted!', 'Ruangan berhasil dihapus!', 'success');
            })
            .catch(err => {
              alert('Oops, ada error');
              console.log(err);
            });
        }
      });
    }
  };

  const optionsRuangan = [
    ...ruanganData.map((ruangan) => ({
      value: ruangan.id,
      label: ruangan.namaRuangan,
    })),
    { value: "Tambah Baru", label: "Tambah Baru" },
  ];

  const isValid = () => {
    const updatedFormError = {
      namaRuangan: formData.namaRuangan ? "" : "Nama ruangan tidak boleh kosong",
      deskripsi: formData.deskripsi ? "" : "Deskripsi ruangan harus diisi tidak boleh kosong",
    };
    setFormError(updatedFormError);
    const errorValues = Object.values(formError);
    return errorValues.every((error) => error === "");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {selectedRuangan?.id && <input type="hidden" name="id" value={formData.id} />}
        <p className={`text-center ${formManageTitle}`}>Form Informasi Ruangan</p>
        <div className="row">
          <div className="col-6 ps-5">
            <div className="mb-3">
                <Select
                    options={optionsRuangan}
                    label="Pilih Operasi"
                    value={selectedOption}
                    name="operation"
                    onChange={handleSelectChange}
                />
            </div>
            <div className="mb-3">
                <Input
                    name="namaRuangan"
                    value={formData.namaRuangan}
                    onChange={handleInputChange}
                    label="Nama Ruangan"
                    placeholder="Masukkan Nama Ruangan"
                    errorHelper={formError.namaRuangan}
                />
            </div>
            <div className="mb-3">
                <Select
                    options={optionsKonfigurasi}
                    name="konfigurasi"
                    value={formData.konfigurasi}
                    onChange={handleInputChange}
                    label="Konfigurasi Ruangan"
                />
            </div>
            <div className="mb-3">
                <Select
                    options={optionsPosisi}
                    name="posisiServer"
                    value={formData.posisiServer}
                    onChange={handleInputChange}
                    label="Posisi Server atau Komputer Pengajar"
                />
            </div>
            <div className="mb-3">
                <TextArea
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleInputChange}
                    label="Deskripsi Tujuan atau Fungsi Ruangan"
                    placeholder=""
                    errorHelper={formError.deskripsi}
                />
            </div>
            <div className={`d-flex mb-3 ${formData.id ? "justify-content-between" : "justify-content-end"}`}>
              {formData.id && (
                <Button text="Hapus Data" customClassName="btnDanger" onClick={handleDelete} />
              )}
              <Button disabled={submitDisabled} text={selectedOption === "Tambah Baru" ? "Tambah Data" : "Update Data"} customClassName="btnPrimary" type="submit" />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default FormRuangan;
