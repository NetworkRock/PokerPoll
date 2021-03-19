import { configureStore } from '@reduxjs/toolkit'
import pollsReducer from '../features/polls/pollSlice'
import usersReducer from '../features/users/userSlice'
import teamsReducer from '../features/team/teamSlice'

export const store = configureStore({
  reducer: {
    polls: pollsReducer,
    user: usersReducer,
    teams: teamsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch