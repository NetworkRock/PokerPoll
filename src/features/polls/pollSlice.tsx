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
    builder.addCase('polls/addNewPoll/fulfilled', (state, action) => {
      state.polls.push(action.payload)
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
    console.log("Polls: Array: ", pollsArray);
  } catch (error) {
    console.log("Fetch polls error: ", error)
  }
  return pollsArray
})

/**
 * Define a thunk funktion for save a new poll
 */
export const addNewPoll = createAsyncThunk('polls/addNewPoll', async (initialPoll) => {
  const db = firebase.firestore();
  const response = await db.collection('polls').add(initialPoll)
  const dataResponse = await db.collection('polls').doc(response.id).get()
  return dataResponse.data()
})



export const selectAllPolls = state => state.polls.polls

export const { pollAdded } = pollSlice.actions

export default pollSlice.reducer