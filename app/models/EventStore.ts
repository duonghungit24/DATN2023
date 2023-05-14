import { Instance, SnapshotIn, SnapshotOut, destroy, detach, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { ListEventsStoreModel } from "./ListEventsStore"
import { utils } from "../utils"

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
        self.eventsMap.get(key).splice(self.eventsMap.get(key).indexOf(item), 1)
        self.setRefreshEvent()
      }
    },
    updateEvent: (key, item) => {
      if (self.eventsMap.has(key)) {
        const index = self.eventsMap.get(key).findIndex((el) => el.id == item.id)
        if (key == utils.displayDateCalendar(item.timeStart)) {
          self.eventsMap.get(key)[index] = item
        } else {
          detach(self.eventsMap.get(key)[index])
          if (self.eventsMap.has(utils.displayDateCalendar(item.timeStart))) {
            self.eventsMap.get(utils.displayDateCalendar(item.timeStart)).push(item)
          } else {
            const dt = []
            dt.push(item)
            self.eventsMap.set(utils.displayDateCalendar(item.timeStart), dt)
          }
        }
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
