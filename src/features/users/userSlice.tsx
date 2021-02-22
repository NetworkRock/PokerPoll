import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firebaseApp } from "../../../config";


const initialState = {
  user: {},
  titleOfDisplayNameUserSearch: '',
  filteredUsersByDisplayUserName: [],
  status: 'idle',
  error: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addSearchUserTitle(state, action) {
      state.titleOfDisplayNameUserSearch = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase('user/fetchUsers/pending', (state, action) => {
      state.status = 'loading'
    })
    builder.addCase('user/fetchUsers/fulfilled', (state, action) => {
      state.status = 'succeeded'
      state.filteredUsersByDisplayUserName = action.payload
    })
    builder.addCase('user/fetchUsers/rejected', (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
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
  const db = firebaseApp.firestore();
  try {
    let dataResponse
    if (user.uid) {
      dataResponse = await db.collection('users').doc(user.uid).get()
      return dataResponse.data()
    } else {
      await db.collection('users').doc(user.id).set(user)
      dataResponse = await db.collection('users').doc(user.id).get()
      return dataResponse.data()
    }
  } catch (error) {
    console.error("Error by safing user to db: ", error)
  }

})

/**
 * Query a user in realtime to the given user id
 */
/**
 * Define a thunk function create slice not support that
 */
export const fetchUserListById = createAsyncThunk('user/fetchUsers', async (search) => {
  const db = firebaseApp.firestore();
  let filteredUsersArray: Array<Object> = [];
  try {
    const snapshot = await db.collection('users').where("displayName", "==", search.searchTitle).get()
    snapshot.forEach((user) => {
      if(search.searchTitle !== search.currentUser.displayName) {
        filteredUsersArray = filteredUsersArray.concat(user.data())
      }
    });
  } catch (error) {
    console.error("Fetch user error: ", error)
  }
  console.info("FILTERED USERS: ", filteredUsersArray)
  return filteredUsersArray
})


export const fetchAllUsersBytheirRatings = createAsyncThunk('user/fetchUsers', async (userRatings) => {
  const db = firebaseApp.firestore();
  let filteredUsersArray: Array<Object> = [];
  try {
    
    for(let i = 0; i < userRatings.length; i++) {
        const snapshot = await db.collection('users').doc(userRatings[i].user).get()
        filteredUsersArray = filteredUsersArray.concat(snapshot.data())
    }
  } catch (error) {
    console.error("Fetch user error: ", error)
  }
  console.info("USERS: ", filteredUsersArray)
  return filteredUsersArray
})

export const { addSearchUserTitle } = userSlice.actions

export const selectCurrentUser = state => state.user.user

export const selectAllFilteredUsers = state => state.user.filteredUsersByDisplayUserName

export default userSlice.reducer