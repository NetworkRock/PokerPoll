import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import firebase from "firebase";
import { stringify } from 'querystring';
import { POLL_FLAG_ENUM } from '../../app/components/Polls/PollList/PollFlagEnum';

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
      const { title, description, id, userRatings, pollFlag, pollEstimation } = action.payload
      const exisitngPoll = state.polls.find((poll) => poll.id === id)
      if (exisitngPoll) {
        exisitngPoll.title = title
        exisitngPoll.description = description
        exisitngPoll.userRatings = userRatings
        exisitngPoll.pollFlag = pollFlag     
        exisitngPoll.pollEstimation = pollEstimation   
      }
      state.status = 'succeeded'
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
      createdBy: poll.currentUser.id,
      groupId: poll.currentTeamId,
      pollTitle: poll.pollTitle,
      pollDescription: poll.pollDescription,
      pollFlag: POLL_FLAG_ENUM.OPEN,
      userRatings: []
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
 * Define a thunk funktion for close a poll with a evaluation of the group
 */
export const closePoll = createAsyncThunk('polls/closePoll', async (poll: Object) => {
  console.log("SEND")
  const db = firebase.firestore()
  try {
    await db.collection('poll')
    .doc(poll.poll.groupId)
    .collection('polls')
    .doc(poll.poll.id)
    .set({pollFlag: POLL_FLAG_ENUM.CLOSE, pollEstimation: poll.estimation}, { merge: true })
  } catch (error) {
    console.error("Error by creating a poll: ", error)
  }
})


/**
 * Define a thunk function for rate a poll
 */

export const ratePoll = createAsyncThunk('polls/ratePoll', async (poll: Object) => {
  console.log(poll)

  try {
    const db = firebase.firestore()

    await db.collection('poll')
      .doc(poll.pollWithRating.groupId)
      .collection('polls')
      .doc(poll.pollWithRating.id)
      .set({ userRatings: firebase.firestore.FieldValue.arrayUnion({ user: poll.pollWithRating.user, rate: poll.pollWithRating.rating }) }, { merge: true })


    const dbPoll = await db.collection('poll')
      .doc(poll.pollWithRating.groupId)
      .collection('polls')
      .doc(poll.pollWithRating.id).get()

    let ratingsArray: Array<Object> = dbPoll.data().userRatings

    let arrayWithoutPreviouseRates = ratingsArray.filter(data => (data.user !== poll.pollWithRating.user));

    arrayWithoutPreviouseRates.push({ user: poll.pollWithRating.user, rate: poll.pollWithRating.rating })

    await db.collection('poll')
      .doc(poll.pollWithRating.groupId)
      .collection('polls')
      .doc(poll.pollWithRating.id)
      .set({ userRatings: arrayWithoutPreviouseRates }, { merge: true })

    const currentGroup = await db.collection('teams')
      .doc(poll.pollWithRating.groupId).get()


    if (currentGroup.data().addedUsersId.length === arrayWithoutPreviouseRates.length) {
      await db.collection('poll')
        .doc(poll.pollWithRating.groupId)
        .collection('polls')
        .doc(poll.pollWithRating.id)
        .set({pollFlag: POLL_FLAG_ENUM.VOTED}, { merge: true })
    }

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


export const selectAllOpenAndVotedPollsForOneGroup = (state, currentTeamId) =>
  state.polls.polls.filter((poll) => poll.groupId === currentTeamId
  && poll.pollFlag !== POLL_FLAG_ENUM.CLOSE)

export const selectAllPollsWhichAreClosed = (state) =>
  state.polls.polls.filter((poll) => poll.pollFlag === POLL_FLAG_ENUM.CLOSE)

export const selectCurrentGroup = state => state.polls.currentSelectedGroup
export const selectCurrentPoll = state => state.polls.currentSelectedPoll
export const selectCurrentPollTitle = state => state.polls.currentPollTitle
export const selectCurrentPollDescription = state => state.polls.currentPollDescription
export const selectCurrenPollTitle = state => state.current

export default pollSlice.reducer