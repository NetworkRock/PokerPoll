export class Poll {
  pollId: string
  teamId: string
  title: string
  description: string
  createdBy: string
  pollFlag: string

  constructor(
    pollId: string,
    teamId: string,
    title: string,
    description: string,
    createdBy: string,
    pollFlag: string) {
      this.pollId = pollId
      this.teamId = teamId
      this.title = title
      this.description = description
      this.createdBy = createdBy
      this.pollFlag = pollFlag
  }
}