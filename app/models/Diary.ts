import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
const DiaryItemModel = types.model({
  id: types.maybeNull(types.string),
  content: types.maybeNull(types.string),
  time: types.maybeNull(types.string),
  emoji: types.maybeNull(types.string),
  isPin: types.maybeNull(types.boolean),
  color: types.maybeNull(types.string),
  location: types.maybeNull(types.string),
  url: types.maybeNull(types.string),
  images: types.maybeNull(types.optional(types.frozen(), []))
})

export const DiaryModel = types
  .model("Diary")
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Diary extends Instance<typeof DiaryModel> {}
export interface DiarySnapshotOut extends SnapshotOut<typeof DiaryModel> {}
export interface DiarySnapshotIn extends SnapshotIn<typeof DiaryModel> {}
export const createDiaryDefaultModel = () => types.optional(DiaryModel, {})
