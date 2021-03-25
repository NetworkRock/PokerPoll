import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import firebase from 'firebase'

// Enum
import { POLL_FLAG_ENUM } from '../../app/components/Polls/PollList/PollFlagEnum'
import { status } from '../../app/enums/StatusEnum'

// Models
import { Poll } from '../../app/models/Poll'
import { Rating } from '../../app/models/Rating'
import { Team } from '../../app/models/Team'
import { RootState } from '../../app/store'

const initialState = {
  currentSelectedTeam: null,
  currentSelectedPoll: null,
  polls: [] as Array<Poll>,
  currentPollTitle: '' as string,
  currentPollDescription: '' as string,
  status: status.idle,
  error: null
}

export const pollSlice = createSlice({
  name: 'polls',
  initialState,
  reducers: {
    addCurrentSelectedTeam(state, action) {
      state.currentSelectedTeam = action.payload
      state.status = status.succeeded
    },
    addCurrentSelectedPoll(state, action) {
      state.currentSelectedPoll = action.payload
      state.status = status.succeeded
    },
    /**
     * On Snapshot trigger redux functions
     * @param state 
     * @param action 
     */
    pollAdded(state, action) {
      const existsAlready = state.polls.find((poll: Poll) => poll.pollId === action.payload.pollId)
      if (!existsAlready) {
        state.polls.push(action.payload)
      }
      state.status = status.succeeded
    },
    exchangeModifiedPollToExistingPoll(state, action) {
      const payloadPoll: Poll = action.payload
      const exisitngPoll = state.polls.find((poll: Poll) => poll.pollId === payloadPoll.pollId)
      if (exisitngPoll) {
        exisitngPoll.title = payloadPoll.title
        exisitngPoll.teamId = payloadPoll.teamId
        exisitngPoll.description = payloadPoll.description
        exisitngPoll.pollFlag = payloadPoll.pollFlag
        exisitngPoll.createdBy = payloadPoll.createdBy
      }
      state.status = status.succeeded
    },
    addCurrentPollTitle(state, action) {
      state.currentPollTitle = action.payload
    },
    addCurrentPollDescription(state, action) {
      state.currentPollDescription = action.payload
    },
    /**
    * Clear up the state
    * @returns 
    */
    clearUpPollState() {
      return initialState
    }
  },
  extraReducers: builder => {
    builder.addCase('polls/addNewPoll/pending', (state) => {
      state.status = status.loading
    })
    builder.addCase('polls/addNewPoll/fulfilled', (state) => {
      state.status = status.succeeded
    })
    builder.addCase('polls/addNewPoll/rejected', (state, action) => {
      state.status = status.failed
      state.error = action.error.message
    })
  }
})

/**
 * Define a thunk funktion for save a new poll
 */
export const addNewPoll = createAsyncThunk('polls/addNewPoll', async (poll: Poll) => {
  let dataResponse
  try {
    const db = firebase.firestore()
    const pRef = await db.collection('poll')
    const response = pRef.doc(poll.teamId)
    const pollsRef = response.collection('polls').doc()
    poll.pollId = pollsRef.id
    response.collection('polls').doc(pollsRef.id).set(JSON.parse(JSON.stringify(poll)))

    dataResponse = await db.collection('poll')
      .doc(poll.teamId)
      .collection('polls')
      .doc(pollsRef.id).get()

    return dataResponse.data()
  } catch (error) {
    console.error('Error by creating a poll: ', error)
  }
})

/**
 * Define a thunk funktion for close a poll with a evaluation of the group
 */
export const closePoll = createAsyncThunk('polls/closePoll', async (poll: Poll) => {
  const db = firebase.firestore()
  try {
    await db.collection('poll')
      .doc(poll.teamId)
      .collection('polls')
      .doc(poll.pollId)
      .set({ pollFlag: POLL_FLAG_ENUM.CLOSE, pollEstimation: poll.estimation }, { merge: true })
  } catch (error) {
    console.error('Error by creating a poll: ', error)
  }
})


/**
 * Define a thunk function for rate a poll
 */

export const ratePoll = createAsyncThunk('polls/ratePoll', async (rate: Rating) => {
  try {
    const db = firebase.firestore()
    const ratingRef = await db.collection('rating')
    const response = ratingRef.doc(rate.pollId)
    const ratingsRef = response.collection('ratings').doc()
    rate.rateId = ratingsRef.id

     // Really use set here ? Check that if update maybe is better maybe baby!
    response.collection('rating').doc(ratingsRef.id).set(JSON.parse(JSON.stringify(rate)))

    /* MAybe baby in a other functions
    if (rate.ratingMap.size) {
      await db.collection('poll')
        .doc(ratingsRef.id)
        .collection('ratings')
        .doc(ratingsRef.id)
        .set({ pollFlag: POLL_FLAG_ENUM.VOTED }, { merge: true })
    } 
    */

  } catch (error) {
    console.error('Error by rating a poll: ', error)
  }
})



export const {
  pollAdded,
  addCurrentSelectedTeam,
  addCurrentSelectedPoll,
  exchangeModifiedPollToExistingPoll,
  addCurrentPollDescription,
  addCurrentPollTitle,
  clearUpPollState
} = pollSlice.actions


export const selectAllOpenAndVotedPollsForOneTeam = (state: RootState, team: Team | null): Array<Poll> => 
  state.polls.polls.filter((poll: Poll) => poll.teamId === team?.teamId
    && poll.pollFlag !== POLL_FLAG_ENUM.CLOSE)


export const selectAllPollsWhichAreClosed = (state: RootState): Array<Poll> => 
  state.polls.polls.filter((poll: Poll) => poll.pollFlag === POLL_FLAG_ENUM.CLOSE)

export const selectCurrentTeam = (state: RootState): Team | null => state.polls.currentSelectedTeam
export const selectCurrentPoll = (state: RootState): Poll | null => state.polls.currentSelectedPoll
export const selectCurrentPollTitle = (state: RootState): string => state.polls.currentPollTitle
export const selectCurrentPollDescription = (state: RootState): string => state.polls.currentPollDescription

export default pollSlice.reducer