import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import firebase from "firebase";

const initialState = {
  currentSelectedGroup: null,
  currentSelectedPoll: null,
  polls: [],
  currentPollTitle: '',
  currentPollDescription: '',
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
    addCurrentSelectedPoll(state, action) {
      state.currentSelectedPoll = action.payload
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
    },
    addCurrentPollTitle(state, action) {
      state.currentPollTitle = action.payload
    },
    addCurrentPollDescription(state, action) {
      state.currentPollDescription = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase('polls/addNewPoll/pending', (state, action) => {
      state.status = 'loading'
    })
    builder.addCase('polls/addNewPoll/fulfilled', (state, action) => {
      console.log("POLL ADDED:", action.payload)
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
    const db = firebase.firestore()
    const pRef = await db.collection('poll')
    const response = pRef.doc(poll.currentTeamId)
    const pollsRef = response.collection('polls').doc()

    response.collection('polls').doc(pollsRef.id).set({
      id: pollsRef.id,
      groupId: poll.currentTeamId,
      pollTitle: poll.pollTitle,
      pollDescription: poll.pollDescription
    })


    dataResponse = await db.collection('poll')
      .doc(poll.currentTeamId)
      .collection('polls')
      .doc(pollsRef.id).get()


  } catch (error) {
    console.error("Error by creating a poll: ", error)
  }

  return dataResponse.data()
})


/**
 * Define a thunk function for rate a poll
 */

 export const ratePoll = createAsyncThunk('polls/ratePoll', async (poll: Object) => {
   console.log(poll)

   try {
     const db = firebase.firestore()
     const userRatingsRef = await db.collection('userRatings')
     
     db.collection('poll')
     .doc(poll.pollWithRating.groupId)
     .collection('polls')
     .doc(poll.pollWithRating.id)
     .collection('userRatings')
     .doc(poll.pollWithRating.user).set(
       {
         [poll.pollWithRating.user]: {rate: poll.pollWithRating.rating}
        })
   } catch (error) {
     console.error('Error by rating a poll: ', error)
   }
 })



export const {
  pollAdded,
  addCurrentSelectedGroup,
  addCurrentSelectedPoll,
  exchangeModifiedPollToExistingPoll,
  addCurrentPollDescription,
  addCurrentPollTitle,
} = pollSlice.actions


export const selectAllPollsForOneGroup = (state, currentTeamId) => 
  state.polls.polls.filter((poll) => poll.groupId === currentTeamId)

  export const selectCurrentGroup = state => state.polls.currentSelectedGroup
  export const selectCurrentPoll = state => state.polls.currentSelectedPoll
export const selectCurrentPollTitle = state => state.polls.currentPollTitle
export const selectCurrentPollDescription = state => state.polls.currentPollDescription
export const selectCurrenPollTitle = state => state.current

export default pollSlice.reducer