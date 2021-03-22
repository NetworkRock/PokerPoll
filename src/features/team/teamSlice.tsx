import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import firebase from 'firebase'
import { Team } from '../../app/models/Team'
import { RootState } from '../../app/store'

const initialState = {
  teams: [],
  createANewTeamWithNewMembers: {
    title: '',
    members: [],
  },
  status: 'idle',
  error: null
}

export const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    addMemberToNewTeam(state, action: {payload: firebase.User, type: string}) {
      const found: Array<firebase.User> | undefined = state.createANewTeamWithNewMembers.members.find((user: firebase.User) => user.uid === action.payload.uid)
      if (!found) {
        state.createANewTeamWithNewMembers.members.push(action.payload)
      } else {
        state.createANewTeamWithNewMembers.members = state.createANewTeamWithNewMembers.members.filter((exisitngUser: firebase.User) => exisitngUser.uid !== found.uid)
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
      // Maybe the most important line of the whole program :D
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
    },
    clearUpTeamState() {
      return initialState
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
export const addNewTeam = createAsyncThunk('teams/addNewTeam', async (team: Team) => {
  try {
    const db = firebase.firestore()
    const teamRef = await db.collection('teams')
    const userRef = await db.collection('users')
    const response = await teamRef.doc()
    await teamRef.doc(response.id).set({ ...{ id: response.id }, ...team })
    const dataResponse = await teamRef.doc(response.id).get()

    // Update the connected membersOfTeam array for user
    team.members.map(async (memberId: string) => {
      await userRef.doc(memberId).update({
        members: firebase.firestore.FieldValue.arrayUnion(response.id)
      })
    })
    return dataResponse.data()
  } catch (error) {
    console.error('Error by creating a team: ', error)
  }})

export const {
  addMemberToNewTeam,
  addTeamTitle,
  addTeamToAllTeams,
  exchangeModifiedTeamToExistingTeam,
  clearUpTeamState
} = teamSlice.actions

export const selectNewAddedTeamMembers = (state: RootState): Array<firebase.User> => state.teams.createANewTeamWithNewMembers.members

export const selectTeamTitle = state => state.teams.createANewTeamWithNewMembers.title

export const selectAllTeams = state => state.teams.teams

export default teamSlice.reducer