import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  deleteDoc,
  setDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../config/firebase";

// Create
export const addRuanganData = createAsyncThunk(
  'ruangan/addRuanganData',
  async (formData, { rejectWithValue }) => {
    try {
      const ruanganCollectionRef = collection(db, 'ruangan');
      const docRef = await addDoc(ruanganCollectionRef, formData);
      const docSnapshot = await getDoc(docRef);
      const newIdRuangan = docSnapshot.id;

      const serverData = {
        nomor: "server",
        posisi: 0,
        kodeInventaris: 'server',
        prosesor: "",
        vga: "",
        ram: {
            ukuran: '',
            tipe: "ddr3",
            konfigurasi: "1"
        },
        storage: ["","","","",],
        motherboard: "",
        case: "",
        monitor: "",
        psu: "",
        keyboard: "",
        mouse: "",
        sound: "",
        additional: "",
        status: "warning",
      };
      const serverCollectionRef = collection(db, `ruangan/${newIdRuangan}/layout`);
      await setDoc(doc(serverCollectionRef, 'server'), serverData);

      return { ...formData, id: newIdRuangan };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
  

// Read
export const fetchRuanganData = createAsyncThunk(
  "ruangan/fetchRuanganData",
  async (owner, { rejectWithValue }) => { // Pass 'owner' as a parameter
    try {
      const ruanganData = [];

      // Create a query that filters based on the 'owner' field
      const ruanganQuery = query(collection(db, "ruangan"), where("owner", "==", owner));

      const querySnapshot = await getDocs(ruanganQuery);
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const id = doc.id;
        ruanganData.push({ ...data, id: id });
      });

      return ruanganData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
  

// Update
export const updateRuanganData = createAsyncThunk(
  "ruangan/updateRuanganData",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "ruangan", id);
      await updateDoc(docRef, updatedData);
      return updatedData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete
async function deleteLayoutSubcollection(idRuangan) {
  const ruanganDocRef = doc(db, "ruangan", idRuangan);
  const layoutCollectionRef = collection(ruanganDocRef, "layout");
  const layoutQuery = query(layoutCollectionRef);
  const layoutSnapshot = await getDocs(layoutQuery);
  layoutSnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
}

export const deleteRuanganData = createAsyncThunk(
  "ruangan/deleteRuanganData",
  async (idRuangan, { rejectWithValue }) => {
    try {
      await deleteLayoutSubcollection(idRuangan);
      await deleteDoc(doc(db, "ruangan", idRuangan));
      return idRuangan;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllLaporanData = createAsyncThunk(
  "ruangan/fetchAllLaporanData",
  async (idRuangan, { rejectWithValue }) => {
    try {
      const laporanData = [];
      const ruanganRef = doc(db, "ruangan", idRuangan);
      const layoutQuery = collection(ruanganRef, "layout");

      const layoutSnapshot = await getDocs(layoutQuery);

      for (const layoutDoc of layoutSnapshot.docs) {
        const kodeInventaris = layoutDoc.data().kodeInventaris;
        const nomor = layoutDoc.data().nomor;
        const layoutRef = doc(db, "ruangan", idRuangan, "layout", kodeInventaris);

        const laporanQuery = collection(layoutRef, "laporan");
        const laporanSnapshot = await getDocs(laporanQuery);

        for (const laporanDoc of laporanSnapshot.docs) {
          const laporanDataItem = laporanDoc.data();

          laporanData.push({
            kodeInventaris: kodeInventaris,
            nomor: nomor,
            data: laporanDataItem,
          });
        }
      }

      laporanData.sort((a, b) => {
        const dateA = new Date(
          parseInt(a.data.tanggal.split('/')[2]),
          parseInt(a.data.tanggal.split('/')[1]) - 1,  
          parseInt(a.data.tanggal.split('/')[0]) 
        );
        const dateB = new Date(
          parseInt(b.data.tanggal.split('/')[2]),
          parseInt(b.data.tanggal.split('/')[1]) - 1,
          parseInt(b.data.tanggal.split('/')[0]) 
        );

        return dateB - dateA;
      });
      // console.log(laporanData);
      return laporanData;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  }
);
