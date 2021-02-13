import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firebase from "firebase";


const initialState = {
  user: {},
  status: 'idle',
  error: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase('user/addNewUser/fulfilled', (state, action) => {
      state.user = action.payload
    })
  }
})


/**
 * Define a thunk funktion for add the user to the database users
 * Get the user back and add them to the redux store as the actual user then
 */
export const addNewUser = createAsyncThunk('user/addNewUser', async (user) => {
  console.log("USER: ", user);
  const db = firebase.firestore();
  const response = await db.collection('users').add(user)
  const dataResponse = await db.collection('users').doc(response.id).get()
  return dataResponse.data()
})

export default userSlice.reducer