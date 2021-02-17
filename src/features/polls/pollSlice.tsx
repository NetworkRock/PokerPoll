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
    addCurrentSelectedGroup(state, action) {
      state.currentSelectedGroup = action.payload
      state.status = 'succeeded'
    },
    pollAdded(state, action) {
      console.log("PAY:", action.payload)
      const existsAlready = state.polls.find((poll) => poll.id === action.payload.id)
      if (!existsAlready) {
        state.polls.push(action.payload)
      }
      state.status = 'succeeded'
    },
    exchangeModifiedPollToExistingPoll(state, action) {
      const { title, description, id } = action.payload
      const exisitngPoll = state.polls.find((poll) => poll.id === id)
      if (exisitngPoll) {
        exisitngPoll.title = title
        exisitngPoll.description = description
      }
    }
  },
  extraReducers: builder => {
    builder.addCase('polls/addNewPoll/pending', (state, action) => {
      state.status = 'loading'
    })
    builder.addCase('polls/addNewPoll/fulfilled', (state, action) => {
      state.status = 'succeeded'
    })
    builder.addCase('polls/addNewPoll/rejected', (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
  }
})

/**
 * Define a thunk funktion for save a new poll
 */
export const addNewPoll = createAsyncThunk('polls/addNewPoll', async (poll) => {
  let dataResponse
  try {
    const db = firebase.firestore();
    const pRef = await db.collection('poll')
    const reponse = pRef.doc(poll.currentTeamId)
    const pollsRef = reponse.collection('polls').doc()

    reponse.collection('polls').doc(pollsRef.id).set({
      id: pollsRef.id,
      title: poll.title,
      description: poll.description
    })


    dataResponse = await db.collection('poll')
      .doc(poll.currentTeamId)
      .collection('polls')
      .doc(reponse.id).get()
  } catch (error) {
    console.error("Error by creating a poll: ", error)
  }

  return dataResponse.data()
})



export const {
  pollAdded,
  addCurrentSelectedGroup,
  exchangeModifiedPollToExistingPoll
} = pollSlice.actions


export const selectAllPolls = state => state.polls.polls

export const selectCurrentGroup = state => state.polls.currentSelectedGroup

export default pollSlice.reducer