import firebase from 'firebase'


export class Team {
  teamId: string
  displayName: string
  teamPictureURL: string
  members: Array<string>
  createdBy: firebase.User

  constructor(
    teamId: string,
    displayName: string,
    teamPictureURL: string,
    members: Array<string>,
    createdBy: firebase.User) {
      this.teamId = teamId
      this.displayName = displayName
      this.teamPictureURL = teamPictureURL
      this.members = members
      this.createdBy = createdBy
  }
}