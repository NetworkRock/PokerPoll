import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { setStatusBarBackgroundColor } from 'expo-status-bar';
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
      if (!found) {
        state.createANewTeamWithNewMembers.members.push(action.payload);
      } else {
        state.createANewTeamWithNewMembers.members = state.createANewTeamWithNewMembers.members.filter((exisitngUser) => exisitngUser.id !== found.id)
      }
    },
    addTeamTitle(state, action) {
      state.createANewTeamWithNewMembers.title = action.payload
    },
    addTeamToAllTeams(state, action) {
      state.teams.push(action.payload)
      //Maybe the most important line of the whole program :D
      state.status = 'succeeded'
    }
  },
  extraReducers: builder => {
    builder.addCase('teams/addNewTeam/pending', (state, action) => {
      state.status = 'loading'
    })
    builder.addCase('teams/addNewTeam/fulfilled', (state, action) => {
      state.status = 'succeeded'
    })
    builder.addCase('teams/addNewTeam/rejected', (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
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
    teamsRef.where('addedUsersId', 'array-contains', [user.currentUser.id])
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
  let dataResponse
  try {
    const db = firebase.firestore();
    const teamRef = await db.collection('teams');
    const userRef = await db.collection('users');
    const response = await teamRef.add(team)
    console.log("TEAM:", team)
    team.addedUsersId.map(async (userId) => {
      await userRef.doc(userId).update({
        memberOfTeams: firebase.firestore.FieldValue.arrayUnion(response.id)
      });
    })
    await teamRef.doc(response.id).update({ id: response.id })
    dataResponse = await teamRef.doc(response.id).get()
    console.log("RESPONSE", dataResponse.data())
  } catch (error) {
    console.error("Error by creating a team: ", error)
  }

  return dataResponse.data()
})

export const { addMemberToNewTeam, addTeamTitle, addTeamToAllTeams } = teamSlice.actions

export const selectNewAddedTeamMembers = state => state.teams.createANewTeamWithNewMembers.members

export const selectTeamTitle = state => state.teams.createANewTeamWithNewMembers.title

export const selectAllTeams = state => state.teams.teams

export default teamSlice.reducer