import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import firebase from "firebase";

const initialState = {
  polls: [],
  currentSelectedGroup: null,
  status: 'idle',
  error: null
}

export const pollSlice = createSlice({
  name: 'polls',
  initialState,
  reducers: {
    pollAdded(state, action) {
      state.polls.push(action.payload)
    },
    addCurrentSelectedGroup(state, action) {
      state.currentSelectedGroup = action.payload
      state.status = 'idle'
    }
  },
  extraReducers: builder => {
    builder.addCase('polls/fetchPollsByGroupId/pending', (state, action) => {
      state.status = 'loading'
    })
    builder.addCase('polls/fetchPollsByGroupId/fulfilled', (state, action) => {
      state.status = 'succeeded'
      state.polls = action.payload
    })
    builder.addCase('polls/fetchPollsByGroupId/rejected', (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
    builder.addCase('polls/addNewPoll/fulfilled', (state, action) => {
      state.status = 'idle'
    })
  }
})


/**
 * Define a thunk function create slice not support that
 */
export const fetchPollsByGroupId = createAsyncThunk('polls/fetchPollsByGroupId', async (teamId) => {
  const db = firebase.firestore();
  let pollsArray: Array<Object> = [];
  console.log("CURREN FETCH:", teamId)
  try {
    const snapshot = await db.collection('poll').doc(teamId.currentTeamId).collection('polls').get()
    snapshot.forEach((doc) => {
      // Use concat because of immutability
      pollsArray = pollsArray.concat(doc.data())
    })
  } catch (error) {
    console.error("Fetch polls error: ", error)
  }
  console.info("Polls-Array: ", pollsArray);
  return pollsArray
})

/**
 * Define a thunk funktion for save a new poll
 */
export const addNewPoll = createAsyncThunk('polls/addNewPoll', async (poll) => {
  const db = firebase.firestore();
  const response = await db.collection('poll').doc(poll.currentTeamId).collection('polls').add({
    title: poll.title,
    description: poll.description
  })
  const dataResponse = await db.collection('poll').doc(poll.currentTeamId).collection('polls').doc(response.id).get()
  return dataResponse.data()
})



export const selectAllPolls = state => state.polls.polls

export const selectCurrentGroup = state => state.polls.currentSelectedGroup

export const { pollAdded, addCurrentSelectedGroup} = pollSlice.actions

export default pollSlice.reducer