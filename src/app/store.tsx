import { configureStore } from '@reduxjs/toolkit'
import pollsReducer from '../features/polls/pollSlice'
import usersReducer from '../features/users/userSlice'

export default configureStore({
  reducer: {
    polls: pollsReducer,
    user: usersReducer
  }
})