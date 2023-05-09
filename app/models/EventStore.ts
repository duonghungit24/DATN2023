import { Instance, SnapshotIn, SnapshotOut, destroy, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { ListEventsStoreModel } from "./ListEventsStore"

/**
 * Model description here for TypeScript hints.
 */
export const EventStoreModel = types
  .model("EventStore")
  .props({
    eventsMap: types.map(types.array(ListEventsStoreModel)),
    refreshEvent: types.optional(types.number, 0),
  })
  .actions(withSetPropAction)
  .actions((self) => ({
    setRefreshEvent: () => {
      self.refreshEvent += 1
    },
  }))
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    addEvent: (key, data) => {
      if (self.eventsMap.has(key)) {
        self.eventsMap.get(key).push(data)
      } else {
        const dt = []
        dt.push(data)
        self.eventsMap.set(key, dt)
      }
      self.setRefreshEvent()
    },
    removeEvent: (key, item) => {
      if (self.eventsMap.has(key)) {
        console.log("ok")
        self.eventsMap.get(key).splice(self.eventsMap.get(key).indexOf(item), 1)
        // destroy(item)
        self.setRefreshEvent()
      }
    },
    getListEvents: () => {
      const data = {}
      self.eventsMap.forEach((value, key) => {
        if (value.length > 0) {
          const dt = value.map((el) => {
            return {
              ...el,
              start: new Date(el.timeStart).toISOString(),
              end: new Date(el.timeEnd).toISOString(),
              summary: el.content,
            }
          })
          data[key] = dt.slice()
        }
      })
      return data
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface EventStore extends Instance<typeof EventStoreModel> {}
export interface EventStoreSnapshotOut extends SnapshotOut<typeof EventStoreModel> {}
export interface EventStoreSnapshotIn extends SnapshotIn<typeof EventStoreModel> {}
export const createEventStoreDefaultModel = () => types.optional(EventStoreModel, {})
