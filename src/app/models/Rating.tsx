export class Rating {
  rateId: string
  userId: string
  teamId: string
  pollId: string
  rateNumber: number
  constructor(
    rateId: string,
    userId: string,
    teamId: string,
    pollId: string,
    rateNumber: number) {
      this.rateId = rateId
      this.userId = userId
      this.teamId = teamId
      this.pollId = pollId
      this.rateNumber = rateNumber
  }
}