// react specific
import React from 'react'
import { View,  Button } from 'react-native'

// redux 
import { useAppDispatch, useAppSelector } from '../../hooks'
import { unwrapResult } from '@reduxjs/toolkit'
import { selectTeamTitle, addNewTeam } from '../../../features/team/teamSlice'
import { selectNewAddedTeamMembers } from '../../../features/team/teamSlice'
import { selectUser } from '../../../features/users/userSlice'

// style
import style_addTeamForm from './style_addTeamForm'

// enum
import { HEADER_BTN_TYPES } from '../NavigationComponents/HeaderButtonEnum'
import firebase from 'firebase'



const AddTeamHeaderBtn = (props) => {
  const teamTitle = useAppSelector(selectTeamTitle)
  const currentUser = useAppSelector(selectUser)
  const addedUsers = useAppSelector(selectNewAddedTeamMembers)
  

  const canSave =
    [teamTitle.trim().length, addedUsers.length > 0].every(Boolean)

  const dispatch = useAppDispatch()

  const onCreatedTeamClicked = async () => {
    if (canSave) {
      try {
        if (currentUser !== null) {

          const team = new Team(
            null,
            teamTitle,
            null,
            addedUsers,
            currentUser.uid
          )

          const createdBy = currentUser.uid
          const addedUsersId = addedUsers.map(user => user.id)
          addedUsersId.push(createdBy)
          const resultAction = await dispatch(
            addNewTeam(team)
          )
          unwrapResult(resultAction)
        }
      } catch (error) {
        console.error('Failed to save the team: ', error)
      } finally {
        props.navigation.navigate('PollTeamStack')
      }
    }
  }

  return (
      <View style={style_addTeamForm.btn}>
        <Button title={HEADER_BTN_TYPES.CREATE} onPress={onCreatedTeamClicked} disabled={!canSave}/>
      </View>
  )

  }

export default AddTeamHeaderBtn