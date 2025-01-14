import {
  type INewDiaryEntry,
  type IDiaryObject
} from '../entities/diary.entity'
import diariesData from '../json/diary.json'

export const getDiaries = (): IDiaryObject[] => diariesData as IDiaryObject[]

export const createDiaries = (newDiaryEntry: INewDiaryEntry): IDiaryObject => {
  const newDiary = {
    id: diariesData.length + 1,
    ...newDiaryEntry
  }

  diariesData.push(newDiary)
  return newDiary
}
