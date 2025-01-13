export class ErrorException extends Error {
  code: string
  status: number
  message: string

  constructor(code: string, status: number, message: string) {
    super(message)

    this.code = code
    this.status = status
    this.message = message
  }
}
