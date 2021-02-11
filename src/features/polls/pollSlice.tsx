import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firebase from "firebase";

const initialState = {
  polls: [],
  status: 'idle',
  error: null
}

export const pollSlice = createSlice({
  name: 'polls',
  initialState,
  reducers: {
    pollAdded(state, action) {
      state.polls.push(action.payload)
    }
  },
})


/**
 * Define a thunk function create slice not support that
 */
export const fetchPolls = createAsyncThunk('polls/fetchPolls', async () => {
  const db = firebase.firestore();
  let polls = {};
  try {
    const snapshot = await db.collection('polls').get(); 
    snapshot.forEach((doc) => {
      polls = {...{}, ...doc.data()}
      console.log(polls);
    })
  } catch (error) {
    console.log(error)
  }
  return polls.polls
})



export const selectAllPolls = state => state.polls.polls

export const { pollAdded } = pollSlice.actions

export default pollSlice.reducer