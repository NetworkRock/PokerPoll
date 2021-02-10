import { configureStore } from '@reduxjs/toolkit'
import pollSlice from '../features/polls/pollSlice'

export default configureStore({
  reducer: {
    polls: pollSlice,
  }
})