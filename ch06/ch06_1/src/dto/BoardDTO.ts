export class BoardDTO {
  bid: number
  title: string
  content: string

  constructor(bid: number, title: string, content: string) {
    this.bid = bid
    this.title = title
    this.content = content
  }
}
