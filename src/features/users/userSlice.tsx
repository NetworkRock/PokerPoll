import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { firebaseApp } from '../../../config'
import { RootState } from '../../app/store'
import { status } from '../../app/enums/StatusEnum'
import firebase from 'firebase'

const db = firebaseApp.firestore()

const initialState = {
  user: null,
  titleOfDisplayNameUserSearch: '',
  filteredUsersByDisplayUserName: [],
  status: status.idle,
  error: ''
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addSearchUserTitle(state, action) {
      state.titleOfDisplayNameUserSearch = action.payload
    },
    clearUpUserState() {
      return initialState
    }
  },
  extraReducers: builder => {
    builder.addCase('user/signUpUser/fulfilled', (state, action) => {
      state.user = action.payload
      state.status = status.succeeded
    })
    builder.addCase('user/signUpUser/pending', (state) => {
      state.status = status.loading
    })
    builder.addCase('user/signUpUser/rejected', (state, action) => {
      state.status = status.failed
      state.error = action.error.message
    })
  }
})


/**
 * Define a thunk funktion for sign up a new user to the database
 * Get the user back and add them to the redux store as the actual user then
 */
 export const signUpUser = createAsyncThunk('user/signUpUser', async (user: firebase.User) => {
  try {
      await db.collection('users').doc(user.uid).set(JSON.parse(JSON.stringify(user)))
      const dataResponse = await db.collection('users').doc(user.uid).get()
      return dataResponse.data()
  } catch (error) {
    console.error('Error by signUp user to db: ', error)
  }

})

/**
 * Define a thunk funktion for logIn user to the database
 * Get the user back and add them to the redux store as the actual user then
 */
export const logInUser = createAsyncThunk('user/logInUser', async (user: firebase.User) => {
  try {
      const dataResponse = await db.collection('users').doc(user.uid).get()
      return dataResponse.data()
  } catch (error) {
    console.error('Error by logIn user to db: ', error)
  }

})

/**
 * Query a user in realtime to the given user id
 */
/**
 * Define a thunk function create slice not support that
 */
export const fetchUserListById = createAsyncThunk('user/fetchUsers', async (search) => {
  let filteredUsersArray: Array<Object> = [];
  try {
    const snapshot = await db.collection('users').where('displayName', '==', search.searchTitle).get()
    snapshot.forEach((user) => {
      if(search.searchTitle !== search.currentUser.displayName) {
        filteredUsersArray = filteredUsersArray.concat(user.data())
      }
    });
  } catch (error) {
    console.error('Fetch user error: ', error)
  }
  console.info('FILTERED USERS: ', filteredUsersArray)
  return filteredUsersArray
})


export const fetchAllUsersBytheirRatings = createAsyncThunk('user/fetchUsers', async (userRatings) => {
  let filteredUsersArray: Array<Object> = [];
  try {
    
    for(let i = 0; i < userRatings.length; i++) {
        const snapshot = await db.collection('users').doc(userRatings[i].user).get()
        filteredUsersArray = filteredUsersArray.concat(snapshot.data())
    }
  } catch (error) {
    console.error('Fetch user error: ', error)
  }
  console.info('USERS: ', filteredUsersArray)
  return filteredUsersArray
})

export const { addSearchUserTitle, clearUpUserState} = userSlice.actions

export const selectUser = (state: RootState): firebase.User | null => state.user.user

export const selectAllFilteredUsers = state => state.user.filteredUsersByDisplayUserName

export default userSlice.reducer