export class Rating {
  userId: string
  teamId: string
  pollId: string
  rateNumber: number
  constructor(
    userId: string,
    teamId: string,
    pollId: string,
    rateNumber: number) {
      this.userId = userId
      this.teamId = teamId
      this.pollId = pollId
      this.rateNumber = rateNumber
  }
}