import { Instance, SnapshotIn, SnapshotOut, destroy, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { ListTodoStoreModel } from "./ListTodoStore"
import moment from "moment"
import { utils } from "../utils"

/**
 * Model description here for TypeScript hints.
 */

export const TodoStoreModel = types
  .model("TodoStore")
  .props({
    todoMap: types.map(types.array(ListTodoStoreModel)),
    isRefreshTodo: types.optional(types.number, 0),
  })
  .actions(withSetPropAction)
  .views((self) => ({
    findTodoBySearch: (textSearch: string) => {
      let data = []
      self.todoMap.forEach((value, key) => {
        if (value.length > 0) {
          value.forEach((el) => {
            if (
              textSearch &&
              el.title.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase())
            ) {
              data.push(el)
            }
          })
        }
      })
      return data.slice()
    },
    getNumberStatusTask: () => {
      let statusDone = 0
      let statusDoing = 0
      let statusExpired = 0
      self.todoMap.forEach((value, _) => {
        if (value.length > 0) {
          const dateNow = moment(new Date())
          value.map((el) => {
            console.log("time", dateNow.diff(moment(el.time)))
            if (el.isDone) {
              statusDone += 1
            } else if (!el.isDone && dateNow.diff(moment(el.time)) < 0) {
              statusDoing += 1
            } else {
              statusExpired += 1
            }
          })
        }
      })
      return {
        statusDone,
        statusDoing,
        statusExpired,
      }
    },
    getListStatusTask: (type: string) => {},
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setRefreshTodo: () => {
      self.isRefreshTodo += 1
    },
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
    removeTodo: (key, item) => {
      if (self.todoMap.has(key)) {
        //  self.todoMap.get(key).splice(self.todoMap.get(key).indexOf(item), 1)
        destroy(item)
        self.setRefreshTodo()
      }
    },
    getListTodo: () => {
      const data = {}
      self.todoMap.forEach((value, key) => {
        if (value.length > 0) {
          const sortData = value.sort((a, b) => {
            const momena = moment(a.time)
            const momentb = moment(b.time)
            return momena.diff(momentb)
          })
          data[key] = sortData.slice()
        }
      })
      return data
    },
    getCountTaskNow: () => {
      let countNow = 0
      let countAll = 0
      const date = utils.displayDateCalendar(new Date())
      self.todoMap.forEach((value, key) => {
        countAll += value.length
      })
      if (self.todoMap.has(date)) {
        countNow = self.todoMap.get(date).length
      }
      return {
        numberTaskAll: countAll,
        numberTaskNow: countNow,
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface TodoStore extends Instance<typeof TodoStoreModel> {}
export interface TodoStoreSnapshotOut extends SnapshotOut<typeof TodoStoreModel> {}
export interface TodoStoreSnapshotIn extends SnapshotIn<typeof TodoStoreModel> {}
export const createTodoStoreDefaultModel = () => types.optional(TodoStoreModel, {})
