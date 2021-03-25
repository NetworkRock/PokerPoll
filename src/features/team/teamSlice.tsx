import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Team } from '../../app/models/Team'
import { RootState } from '../../app/store'
import { status } from '../../app/enums/StatusEnum'
import firebase from 'firebase'
import { ServerResponse } from 'node:http'

const initialState = {
  teams: [] as Array<Team>,
  createANewTeamWithNewMembers: {
    title: '',
    members: [] as Array<firebase.User>,
  },
  status: status.idle,
  error: null
}

export const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    addMemberToNewTeam(state, action: { payload: firebase.User, type: string }) {
      const found = state.createANewTeamWithNewMembers.members.find((user: firebase.User) => user.uid === action.payload.uid)
      if (!found) {
        state.createANewTeamWithNewMembers.members.push(action.payload)
      } else {
        state.createANewTeamWithNewMembers.members = state.createANewTeamWithNewMembers.members.filter((exisitngUser: firebase.User) =>
          exisitngUser.uid !== found.uid)
      }
    },
    addTeamTitle(state, action) {
      state.createANewTeamWithNewMembers.title = action.payload
    },
    /**
     * On Snapshot trigger redux functions
     * @param state 
     * @param action 
     */
    addTeamToAllTeams(state, action) {
      const exisitngTeam = state.teams.find((team: Team) => team.teamId === action.payload.teamId)
      if (!exisitngTeam) {
        state.teams.push(action.payload)
      }
      state.status = status.succeeded
    },
    exchangeModifiedTeamToExistingTeam(state, action) {
      const payloadTeam: Team = action.payload
      const exisitngTeam = state.teams.find((team) => team.teamId === payloadTeam.teamId)
      if (exisitngTeam) {
        exisitngTeam.createdBy = payloadTeam.createdBy
        exisitngTeam.displayName = payloadTeam.displayName
        exisitngTeam.teamPictureURL = payloadTeam.teamPictureURL
        exisitngTeam.members = payloadTeam.members
      }
      state.status = status.succeeded
    },
    /**
     * Clear up the state
     * @returns 
     */
    clearUpTeamState() {
      return initialState
    }
  },
  extraReducers: builder => {
    builder.addCase('teams/addNewTeam/pending', (state) => {
      state.status = status.loading
    })
    builder.addCase('teams/addNewTeam/fulfilled', (state) => {
      state.status = status.succeeded
    })
    builder.addCase('teams/addNewTeam/rejected', (state, action) => {
      state.status = status.failed
      state.error = action.error.message
    })
  }
})

/**
 * Define a thunk funktion for save a new team
 */
export const addNewTeam = createAsyncThunk('teams/addNewTeam', async (team: Team) => {
  try {
    const db = firebase.firestore()
    const teamRef = await db.collection('teams')
    const userRef = await db.collection('users')
    const response = await teamRef.doc()
    team.teamId = response.id
    await teamRef.doc(response.id).set(JSON.parse(JSON.stringify(team)))
    const dataResponse = await teamRef.doc(response.id).get()

    // Update the connected team members array for user
    team.members.map(async (memberId: string) => {
      await userRef.doc(memberId).update({
        members: firebase.firestore.FieldValue.arrayUnion(response.id)
      })
    })

    // At the end also upate the team members for the creator
    await userRef.doc(team.createdBy.uid).update({
      members: firebase.firestore.FieldValue.arrayUnion(response.id)
    })
    return dataResponse.data()
  } catch (error) {
    console.error('Error by creating a team: ', error)
  }
})

export const {
  addMemberToNewTeam,
  addTeamTitle,
  addTeamToAllTeams,
  exchangeModifiedTeamToExistingTeam,
  clearUpTeamState
} = teamSlice.actions

export const selectNewAddedTeamMembers = (state: RootState): Array<firebase.User> => state.teams.createANewTeamWithNewMembers.members
export const selectTeamTitle = (state: RootState): string => state.teams.createANewTeamWithNewMembers.title

export const selectAllTeams = (state: RootState): Array<Team> => state.teams.teams

export default teamSlice.reducer