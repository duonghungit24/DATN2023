import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { ListDiaryStoreModel } from "./ListDiaryStore"
import moment from "moment"
import _ from "lodash"
/**
 * Model description here for TypeScript hints.
 */

export const DiaryModel = types
  .model("Diary")
  .props({
    diaryMap: types.map(types.optional(ListDiaryStoreModel, {})),
    isRefreshDiary: types.optional(types.number, 0)
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    setRefreshDiary: () => {
      self.isRefreshDiary += 1
    }
  }))
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    addDiray: (key, data) => {
      if (self.diaryMap.has(key)) {
        self.diaryMap.get(key).listDiary.push(data)
      } else {
        const dt = []
        dt.push(data)
        self.diaryMap.set(key, { listDiary: dt })
      }
      self.setRefreshDiary()
    },
    getListDiary: () => {
      const data = []
      self.diaryMap.forEach((value, key) => {
        const sortData = value.listDiary.sort((a, b) => {
          const momena = moment(a.time)
          const momentb = moment(b.time)
          return momena.diff(momentb)
        })
        data.push({
          title: key,
          data: sortData.slice()
        })
      })
      data.sort((a, b) => new Date(a.title).getTime() -  new Date(b.title).getTime())
      return data
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Diary extends Instance<typeof DiaryModel> {}
export interface DiarySnapshotOut extends SnapshotOut<typeof DiaryModel> {}
export interface DiarySnapshotIn extends SnapshotIn<typeof DiaryModel> {}
export const createDiaryDefaultModel = () => types.optional(DiaryModel, {})
