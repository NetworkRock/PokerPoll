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
  extraReducers: builder => {
    builder.addCase('polls/fetchPolls/pending', (state, action) => {
      state.status = 'loading'
    })
    builder.addCase('polls/fetchPolls/fulfilled', (state, action) => {
      state.status = 'succeeded'
      state.polls = state.polls.concat(action.payload)
    })
    builder.addCase('polls/fetchPolls/rejected', (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  }
})


/**
 * Define a thunk function create slice not support that
 */
export const fetchPolls = createAsyncThunk('polls/fetchPolls', async () => {
  const db = firebase.firestore();
  let pollsArray: Array<Object> = [];
  try {
    const snapshot = await db.collection('polls').get(); 
    snapshot.forEach((doc) => {
      // Use concat because of immutability
      pollsArray = pollsArray.concat(doc.data())
    })
    console.log(pollsArray);
  } catch (error) {
    console.log(error)
  }
  return pollsArray
})



export const selectAllPolls = state => state.polls.polls

export const { pollAdded } = pollSlice.actions

export default pollSlice.reducer