import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: [  
    { id: '0', name: 'James Bond', value: 0},
    { id: '1', name: 'Carly Mill', value: 0},
    { id: '2', name: 'Britney Pearce', value: 0},
  ],
    reducers: {
    test: state => {
    },
  }
})

export const { test } = userSlice.actions

export default userSlice.reducer