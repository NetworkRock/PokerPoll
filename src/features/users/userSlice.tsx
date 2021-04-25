import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { firebaseApp } from '../../../config'
import { RootState } from '../../app/store'
import { status } from '../../app/enums/StatusEnum'
import firebase from 'firebase'
import { Rating } from '../../app/models/Rating'

const db = firebaseApp.firestore()

const initialState = {
  user: null,
  titleOfDisplayNameUserSearch: '' as string,
  filteredUsersByDisplayUserName: [],
  status: status.idle,
  error: null
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

    // SignUp
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

    // LogIn
    builder.addCase('user/logInUser/fulfilled', (state, action) => {
      state.user = action.payload
      state.status = status.succeeded
    })
    builder.addCase('user/logInUser/pending', (state) => {
      state.status = status.loading
    })
    builder.addCase('user/logInUser/rejected', (state, action) => {
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
 * Get a list of users by list of user id's
 */
export const fetchUserListByUserIdList = createAsyncThunk('user/fetchUsers', async (members: Array<string>) => {
  const filteredUsersArray: firebase.firestore.DocumentData = []
  try {
    const snapshot = await db.collection('users').get()
    snapshot.docs
    .filter((user, index) => user.data().uid === members[index])
    .map(user => {
      filteredUsersArray.push(user.data())
    })
    return filteredUsersArray
  } catch (error) {
    console.error('Fetch user error: ', error)
  }
  return filteredUsersArray
})


export const fetchAllUsersBytheirRatings = createAsyncThunk('user/fetchUsers', async (userRatings: Array<Rating>) => {
  let filteredUsersArray: Array<firebase.User> = []
  try {
    
    for(let i = 0; i < userRatings.length; i++) {
        const snapshot = await db.collection('users').doc(userRatings[i].userId).get()
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