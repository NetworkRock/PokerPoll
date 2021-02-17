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
      const exisitngTeam = state.teams.find((team) => team.id === action.payload.id)
      if (!exisitngTeam) {
        state.teams.push(action.payload)
      }
      //Maybe the most important line of the whole program :D
      state.status = 'succeeded'
    },
    exchangeModifiedTeamToExistingTeam(state, action) {
      const { createdBy, teamTitle, addedUsersId, id } = action.payload
      const exisitngTeam = state.teams.find((team) => team.id === id)
      if (exisitngTeam) {
        exisitngTeam.createdBy = createdBy
        exisitngTeam.teamTitle = teamTitle
        exisitngTeam.addedUsersId = addedUsersId
      }
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
 * Define a thunk funktion for save a new team
 */
export const addNewTeam = createAsyncThunk('teams/addNewTeam', async (team) => {
  let dataResponse
  try {
    const db = firebase.firestore();
    const teamRef = await db.collection('teams');
    const userRef = await db.collection('users');
    const response = await teamRef.doc()
    console.log("TEAM:", team)
    await teamRef.doc(response.id).set({ ...{ id: response.id }, ...team })
    dataResponse = await teamRef.doc(response.id).get()
    console.log("RESPONSE", dataResponse.data())


    //Update the connected membersOfTeam array for user
    team.addedUsersId.map(async (userId) => {
      await userRef.doc(userId).update({
        memberOfTeams: firebase.firestore.FieldValue.arrayUnion(response.id)
      });
    })

  } catch (error) {
    console.error("Error by creating a team: ", error)
  }

  return dataResponse.data()
})

export const {
  addMemberToNewTeam,
  addTeamTitle,
  addTeamToAllTeams,
  exchangeModifiedTeamToExistingTeam
} = teamSlice.actions

export const selectNewAddedTeamMembers = state => state.teams.createANewTeamWithNewMembers.members

export const selectTeamTitle = state => state.teams.createANewTeamWithNewMembers.title

export const selectAllTeams = state => state.teams.teams

export default teamSlice.reducer