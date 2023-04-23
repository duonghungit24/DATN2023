import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { ListTodoStoreModel } from "./ListTodoStore"
import moment from "moment"

/**
 * Model description here for TypeScript hints.
 */

export const TodoStoreModel = types
  .model("TodoStore")
  .props({
    todoMap: types.map(types.array(ListTodoStoreModel)),
    isRefreshTodo: types.optional(types.number, 0)
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setRefreshTodo : () => {
      self.isRefreshTodo += 1
    }
  }))
  .actions((self) => ({
    addTodo: (key, data) => {
      if (self.todoMap.has(key)) {
        self.todoMap.get(key).push(data)
      } else {
        const dt = []
        dt.push(data)
        self.todoMap.set(key, dt)
      }
      self.setRefreshTodo()
    },
    getListTodo : () => {
      const data = {}
      self.todoMap.forEach((value, key) => {
        const sortData = value.sort((a, b) => {
          const momena = moment(a.time)
          const momentb = moment(b.time)
          return momena.diff(momentb)
        })
        data[key] = sortData.slice()
      })
      return data
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface TodoStore extends Instance<typeof TodoStoreModel> {}
export interface TodoStoreSnapshotOut extends SnapshotOut<typeof TodoStoreModel> {}
export interface TodoStoreSnapshotIn extends SnapshotIn<typeof TodoStoreModel> {}
export const createTodoStoreDefaultModel = () => types.optional(TodoStoreModel, {})
