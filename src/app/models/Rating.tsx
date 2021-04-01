export class Rating {
  userId: string
  pollId: string
  rateNumber: number
  constructor(
    userId: string,
    pollId: string,
    rateNumber: number) {
      this.userId = userId
      this.pollId = pollId
      this.rateNumber = rateNumber
  }
}