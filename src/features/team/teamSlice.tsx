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
      state.teams.push(action.payload)
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
  console.log("TEAMSARRAY:", teamsArray)
  return teamsArray
})

/**
 * Define a thunk funktion for save a new team
 */
export const addNewTeam = createAsyncThunk('teams/addNewTeam', async (team) => {
  const db = firebase.firestore();
  const response = await db.collection('teams').add(team)
  const dataResponse = await db.collection('teams').doc(response.id).get()
  console.log('RESPONSE TEAM:', dataResponse.data());
  return dataResponse.data()
})

export const { addMemberToNewTeam, addTeamTitle } = teamSlice.actions

export const selectNewAddedTeamMembers = state => state.teams.createANewTeamWithNewMembers.members

export const selectTeamTitle = state => state.teams.createANewTeamWithNewMembers.title

export const selectAllTeams = state => state.teams.teams

export default teamSlice.reducer