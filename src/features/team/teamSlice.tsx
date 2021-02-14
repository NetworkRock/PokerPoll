import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import firebase from "firebase";

const initialState = {
  teams: null,
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
      state.createANewTeamWithNewMembers.members = action.payload
    },  
    addTeamTitle(state, action) {
      state.createANewTeamWithNewMembers.title = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase('teams/fetchTeams/pending', (state, action) => {
      state.status = 'loading'
    })
    builder.addCase('teams/fetchTeams/fulfilled', (state, action) => {
      state.status = 'succeeded'
      state.teams = state.teams.concat(action.payload)
    })
    builder.addCase('teams/fetchTeams/rejected', (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    })
    builder.addCase('teams/addNewTeam/fulfilled', (state, action) => {
      state.teams = action.payload
    })
  }
})


/**
 * Define a thunk function create slice not support that
 */
export const fetchTeams = createAsyncThunk('teams/fetchTeams', async () => {
  const db = firebase.firestore();
  let teamsArray: Array<Object> = [];
  try {
    const snapshot = await db.collection('teams').get(); 
    snapshot.forEach((doc) => {
      // Use concat because of immutability
      teamsArray = teamsArray.concat(doc.data())
    })
    console.log("Teams: Array: ", teamsArray);
  } catch (error) {
    console.log("Fetch polls error: ", error)
  }
  return teamsArray
})

/**
 * Define a thunk funktion for save a new team
 */
export const addNewTeam = createAsyncThunk('teams/addNewTeam', async (team) => {
  console.log('TEAM:', team);
  const db = firebase.firestore();
  const response = await db.collection('teams').add(team)
  const dataResponse = await db.collection('teams').doc(response.id).get()
  return dataResponse.data()
})

export const { addMemberToNewTeam, addTeamTitle } = teamSlice.actions

export const selectNewAddedTeamMembers = state => state.teams.createANewTeamWithNewMembers.members

export default teamSlice.reducer