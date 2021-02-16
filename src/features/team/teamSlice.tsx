import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firebase from "firebase";

const initialState = {
  teams: [],
  createANewTeamWithNewMembers: {
    title: null,
    members: [],
  },
  status: 'idle',
  error: null
}

export const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    addMemberToNewTeam(state, action) {
      const found = state.createANewTeamWithNewMembers.members.find((user) => user.id === action.payload.id)
      if(!found){
        state.createANewTeamWithNewMembers.members.push(action.payload);
      } else {
        state.createANewTeamWithNewMembers.members = state.createANewTeamWithNewMembers.members.filter((exisitngUser) => exisitngUser.id !== found.id)
      }
    },  
    addTeamTitle(state, action) {
      state.createANewTeamWithNewMembers.title = action.payload
    },
  },
  extraReducers: builder => {
    builder.addCase('teams/fetchAllTeamsForOneUser/pending', (state, action) => {
      state.status = 'loading'
    })
    builder.addCase('teams/fetchAllTeamsForOneUser/fulfilled', (state, action) => {
      state.status = 'succeeded'
      state.teams = action.payload
    })
    builder.addCase('teams/fetchAllTeamsForOneUser/rejected', (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
    builder.addCase('teams/addNewTeam/fulfilled', (state, action) => {
      state.status = 'idle'
    })
  }
})


/**
 * Define a thunk function create slice not support that
 */
export const fetchAllTeamsForOneUser = createAsyncThunk('teams/fetchAllTeamsForOneUser', async (user) => {
  const db = firebase.firestore();
  let teamsArray: Array<Object> = [];
  try {
    const teamsRef = db.collection('teams')
    teamsRef.where('addedUsersId','array-contains', [user.currentUser.id])
    const snapshot = await teamsRef.get(); 
    snapshot.forEach((doc) => {
      // Use concat because of immutability
      teamsArray = teamsArray.concat(doc.data())
    })
  } catch (error) {
    console.error("Fetch polls error: ", error)
  }
  console.info("TEAMSARRAY:", teamsArray)
  return teamsArray
})

/**
 * Define a thunk funktion for save a new team
 */
export const addNewTeam = createAsyncThunk('teams/addNewTeam', async (team) => {
  const db = firebase.firestore();
  const response = await db.collection('teams').add(team)
  await db.collection('teams').doc(response.id).update({id: response.id})
  const dataResponse = await db.collection('teams').doc(response.id).get()
  return dataResponse.data()
})

export const { addMemberToNewTeam, addTeamTitle } = teamSlice.actions

export const selectNewAddedTeamMembers = state => state.teams.createANewTeamWithNewMembers.members

export const selectTeamTitle = state => state.teams.createANewTeamWithNewMembers.title

export const selectAllTeams = state => state.teams.teams

export default teamSlice.reducer