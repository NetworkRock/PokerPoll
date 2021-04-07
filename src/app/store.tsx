import { configureStore } from '@reduxjs/toolkit'
import pollsReducer from '../features/polls/pollSlice'
import usersReducer from '../features/users/userSlice'
import teamsReducer from '../features/team/teamSlice'
import ratingsReducer from '../features/polls/rateSlice'

export const store = configureStore({
  reducer: {
    polls: pollsReducer,
    ratings: ratingsReducer,
    user: usersReducer,
    teams: teamsReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch