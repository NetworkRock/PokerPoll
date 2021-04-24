import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import firebase, { firestore } from 'firebase'

// Enum
import { status } from '../../app/enums/StatusEnum'

// Models
import { Rating } from '../../app/models/Rating'
import { RootState } from '../../app/store'



const initialState = {
  ratings: [] as Array<Rating>,
  status: status.idle,
  error: null
}

export const ratingSlice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
    /**
     * On Snapshot trigger redux functions
     * @param state 
     * @param action 
     */
    ratingAdded(state, action) {
      const payloadRating: Rating = action.payload
      const ratingExistsAlready = state.ratings.find((rate: Rating) => rate.rateId === payloadRating.rateId)
      if (!ratingExistsAlready) {
        state.ratings.push(payloadRating)
      }
      state.status = status.succeeded
    },
    exchangeModifiedRatingToExistingRating(state, action) {
      const payloadRating: Rating = action.payload
      const existingRating = state.ratings.find((rate: Rating) => rate.rateId === payloadRating.rateId)
      if (existingRating) {
        existingRating.pollId = payloadRating.pollId
        existingRating.rateId = payloadRating.rateId
        existingRating.rateNumber = payloadRating.rateNumber
        existingRating.teamId = payloadRating.teamId
        existingRating.userId = payloadRating.userId
      }
      state.status = status.succeeded
    },
    /**
    * Clear up the state
    * @returns 
    */
    clearUpRatingState() {
      return initialState
    }
  },
  extraReducers: builder => {
    builder.addCase('ratings/ratePoll/pending', (state) => {
      state.status = status.loading
    })
    builder.addCase('ratings/ratePoll/fulfilled', (state) => {
      state.status = status.succeeded
    })
    builder.addCase('ratings/ratePoll/rejected', (state, action) => {
      state.status = status.failed
      state.error = action.error.message
    })
  }
})




/**
 * Define a thunk function for rate a poll
 */

 export const ratePoll = createAsyncThunk('polls/ratePoll', async (rate: Rating) => {
  try {
    const db = firebase.firestore()
    rate.rateId = rate.pollId + rate.userId
    await db.collection('teams')
    .doc(rate.teamId)
    .collection('userRatings')
    .doc(rate.rateId)
    .set(JSON.parse(JSON.stringify(rate)), {merge: true})

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
  ratingAdded,
  exchangeModifiedRatingToExistingRating,
  clearUpRatingState
} = ratingSlice.actions


export default ratingSlice.reducer