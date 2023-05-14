import { Instance, SnapshotIn, SnapshotOut, destroy, detach, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { ListDiaryStoreModel } from "./ListDiaryStore"
import moment from "moment"
import _ from "lodash"
import { utils } from "../utils"
import { getsRootStore } from "./helpers/setupRootStore"
/**
 * Model description here for TypeScript hints.
 */

export const DiaryModel = types
  .model("Diary")
  .props({
    diaryMap: types.map(types.array(ListDiaryStoreModel)),
    isRefreshDiary: types.optional(types.number, 0),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    setRefreshDiary: () => {
      self.isRefreshDiary += 1
    },
  }))
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    addDiray: (key, data) => {
      if (self.diaryMap.has(key)) {
        self.diaryMap.get(key).push(data)
      } else {
        const dt = []
        dt.push(data)
        self.diaryMap.set(key, dt)
      }
      self.setRefreshDiary()
    },
    removeDiary: (key, item) => {
      if (self.diaryMap.has(key)) {
        // self.todoMap.get(key).splice(self.todoMap.get(key).indexOf(item), 1)
        destroy(item)
        self.setRefreshDiary()
      }
    },
    updateDiary: (key, item) => {
      if (self.diaryMap.has(key)) {
        const index = self.diaryMap.get(key).findIndex((el) => el.id == item.id)
        if (key == utils.displayDateCalendar(item.time)) {
          if (index > -1) {
            self.diaryMap.get(key)[index] = item
          }
        } else {
          detach(self.diaryMap.get(key)[index])
          if (self.diaryMap.has(utils.displayDateCalendar(item.time))) {
            self.diaryMap.get(utils.displayDateCalendar(item.time)).push(item)
          } else {
            const dt = []
            dt.push(item)
            self.diaryMap.set(utils.displayDateCalendar(item.time), dt)
          }
        }
        self.setRefreshDiary()
      }
    },
    getListDiary: () => {
      const data = []
      self.diaryMap.forEach((value, key) => {
        if (value.length > 0) {
          const sortData = value.sort((a, b) => {
            const momena = moment(a.time)
            const momentb = moment(b.time)
            return momena.diff(momentb)
          })
          data.push({
            title: key,
            data: sortData.slice(),
          })
        }
      })
      data.sort((a, b) => new Date(a.title).getTime() - new Date(b.title).getTime())
      return data
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Diary extends Instance<typeof DiaryModel> {}
export interface DiarySnapshotOut extends SnapshotOut<typeof DiaryModel> {}
export interface DiarySnapshotIn extends SnapshotIn<typeof DiaryModel> {}
export const createDiaryDefaultModel = () => types.optional(DiaryModel, {})
