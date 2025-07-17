import { type Handler } from 'express'
import { createDiaries, getDiaries } from '../services/diaries.service'
import { Codes } from '../utils/codeStatus'
import { ErrorObject } from '../utils/jsonResponses'

export const diaries: Handler = (req, res) => {
  return res.send(getDiaries())
}

export const diariesCreate: Handler = (req, res) => {
  try {
    res.send(createDiaries(req.body))
  } catch (error) {
    res.status(Codes.errorServer).json(ErrorObject(error, Codes.errorServer))
  }
}
