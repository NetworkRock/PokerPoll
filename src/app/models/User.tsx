export class User {
  id: string
  displayName: string
  profilePictureURL: string
  email: string
  password: string

  constructor(
    id: string,
    displayName: string,
    profilePictureURL: string,
    email: string,
    password: string) {
      this.id = id
      this.displayName = displayName
      this.profilePictureURL = profilePictureURL
      this.email = email
      this.password = password
  }
}