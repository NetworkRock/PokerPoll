import { createSlice } from '@reduxjs/toolkit'

export const pollSlice = createSlice({
  name: 'polls',
  initialState: [
    { id: '0', title: 'User Story 1', value: 0 },
    { id: '1', title: 'User Story 2', value: 0 },
    { id: '2', title: 'User Story 3', value: 0 },
  ],
  reducers: {
    test: state => {
    },
  }
})

export default pollSlice.reducer