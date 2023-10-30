import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  getDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../config/firebase";

export const fetchSummary = createAsyncThunk(
    "dashboard/fetchSummary",
    async (ruanganData, { rejectWithValue }) => {
    try {
        const summaries = await Promise.all(
        ruanganData.map(async (ruangan) => {
            const subcollectionRef = collection(
            db,
            `ruangan/${ruangan.id}/layout`
            );
            const querySnapshot = await getDocs(subcollectionRef);
            let goodCount = 0;
            let badCount = 0;
            let warningCount = 0;
            querySnapshot.forEach((doc) => {
            const computer = doc.data();
            if (computer.status === 'good') {
                goodCount++;
            } else if (computer.status === 'bad') {
                badCount++;
            } else if (computer.status === 'warning') {
                warningCount++;
            }
            });

            return {
            id: ruangan.id,
            nama: ruangan.namaRuangan,
            good: goodCount,
            bad: badCount,
            warning: warningCount,
            };
        })
        );
        // console.log(summaries);
        return summaries;
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message);
    }
    }
);