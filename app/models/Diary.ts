import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { ListDiaryStoreModel } from "./ListDiaryStore"

/**
 * Model description here for TypeScript hints.
 */


export const DiaryModel = types
  .model("Diary")
  .props({
    diaryMap: types.map(types.frozen(ListDiaryStoreModel)),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    addDiray : (key,data) => {
      if(self.diaryMap.has(key))
      {

      }
      else
      {
        self.diaryMap.set(key, {listDiary:[ data] })
      }
    },
    getListDiary : () => {
      const data = []
      self.diaryMap.forEach((value, key) => {
        data.push({
          title: key,
          ...value
        })
      })
      return data
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Diary extends Instance<typeof DiaryModel> {}
export interface DiarySnapshotOut extends SnapshotOut<typeof DiaryModel> {}
export interface DiarySnapshotIn extends SnapshotIn<typeof DiaryModel> {}
export const createDiaryDefaultModel = () => types.optional(DiaryModel, {})
