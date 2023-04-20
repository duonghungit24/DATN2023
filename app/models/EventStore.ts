import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
const EventItemModel = types.model({
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
export const EventStoreModel = types
  .model("EventStore")
  .props({})
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface EventStore extends Instance<typeof EventStoreModel> {}
export interface EventStoreSnapshotOut extends SnapshotOut<typeof EventStoreModel> {}
export interface EventStoreSnapshotIn extends SnapshotIn<typeof EventStoreModel> {}
export const createEventStoreDefaultModel = () => types.optional(EventStoreModel, {})
