import { Instance, SnapshotIn, SnapshotOut, getParent, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const ListDiaryStoreModel = types
  .model("ListDiaryStore")
  .props({
    id: types.maybeNull(types.string),
    content: types.maybeNull(types.string),
    time: types.maybeNull(types.string),
    emoji: types.maybeNull(types.string),
    isPin: types.maybeNull(types.boolean),
    color: types.maybeNull(types.string),
    location: types.maybeNull(types.string),
    url: types.maybeNull(types.string),
    images: types.maybeNull(types.optional(types.frozen(), [])),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    remove: () => {
      getParent(self, 2).remove(self)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ListDiaryStore extends Instance<typeof ListDiaryStoreModel> {}
export interface ListDiaryStoreSnapshotOut extends SnapshotOut<typeof ListDiaryStoreModel> {}
export interface ListDiaryStoreSnapshotIn extends SnapshotIn<typeof ListDiaryStoreModel> {}
export const createListDiaryStoreDefaultModel = () => types.optional(ListDiaryStoreModel, {})
