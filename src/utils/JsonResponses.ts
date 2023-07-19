import {
  type IErrorObject,
  type ISuccessObject
} from '../interfaces/jsonResponses.dtos'

export const ErrorObject = (error: any, code: number): IErrorObject => ({
  message: error.message,
  code
})

export const SuccessObject = (result: any, code: number): ISuccessObject => ({
  data: result,
  code
})
