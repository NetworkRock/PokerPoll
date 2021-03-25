export class Rating {
  rateId: string
  pollId: string
  ratingMap: Map<string, number> 

  constructor(
    rateId: string,
    pollId: string,
    ratingMap: Map<string, number>) {
      this.rateId = rateId
      this.pollId = pollId
      this.ratingMap = ratingMap
  }
}