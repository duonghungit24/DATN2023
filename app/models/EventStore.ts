import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
const EventItemModel = types.model({
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
export const EventStoreModel = types
  .model("EventStore")
  .props({
    listEvents: types.optional(types.array(EventItemModel), []),
    refreshEvent: types.optional(types.number,0)
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    setRefreshEvent: () => {
      self.refreshEvent += 1
    },
  }))
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    addEvent: (objEvent) => {
      self.listEvents.push(objEvent)
      self.setRefreshEvent()
    },
    getListEvents: () => {
    const data =  self.listEvents.map((el) => {
        return {
          start: new Date(el.timeStart).toISOString(),
          end: new Date(el.timeEnd).toISOString(),
          summary: el.content,
          ...el,
        }
      })
      return data.slice()
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface EventStore extends Instance<typeof EventStoreModel> {}
export interface EventStoreSnapshotOut extends SnapshotOut<typeof EventStoreModel> {}
export interface EventStoreSnapshotIn extends SnapshotIn<typeof EventStoreModel> {}
export const createEventStoreDefaultModel = () => types.optional(EventStoreModel, {})
