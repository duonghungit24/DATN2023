import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const ListEventsStoreModel = types
  .model("ListEventsStore")
  .props({
    id: types.maybeNull(types.string),
    idNotification: types.maybeNull(types.string),
    title: types.maybeNull(types.string),
    content: types.maybeNull(types.string),
    timeStart: types.maybeNull(types.string),
    timeEnd: types.maybeNull(types.string),
    color: types.maybeNull(types.string),
    location: types.maybeNull(types.string),
    url: types.maybeNull(types.string),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ListEventsStore extends Instance<typeof ListEventsStoreModel> {}
export interface ListEventsStoreSnapshotOut extends SnapshotOut<typeof ListEventsStoreModel> {}
export interface ListEventsStoreSnapshotIn extends SnapshotIn<typeof ListEventsStoreModel> {}
export const createListEventsStoreDefaultModel = () => types.optional(ListEventsStoreModel, {})
