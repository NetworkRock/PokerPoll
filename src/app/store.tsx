import { configureStore } from '@reduxjs/toolkit'
import pollsReducer from '../features/polls/pollSlice'
import usersReducer from '../features/users/userSlice'
import teamsReducer from '../features/team/teamSlice'

export default configureStore({
  reducer: {
    polls: pollsReducer,
    user: usersReducer,
    teams: teamsReducer
  }
})