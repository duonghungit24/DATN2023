import { Instance, SnapshotIn, SnapshotOut, destroy, detach, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { ListTodoStoreModel } from "./ListTodoStore"
import moment from "moment"
import { utils } from "../utils"
import { toJS, values } from "mobx"

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
    getListStatusTask: (type: string) => {
      let data = []
      switch (type) {
        case "all":
          self.todoMap.forEach((value, _) => {
            if (value.length > 0) {
              value.map((el) => {
                data.push(el)
              })
            }
          })
          break
        case "now":
          if (self.todoMap.has(utils.displayDateCalendar(new Date()))) {
            data = self.todoMap.get(utils.displayDateCalendar(new Date()))
          }
          break
        case "done":
          self.todoMap.forEach((value, _) => {
            if (value.length > 0) {
              value.map((el) => {
                if (el.isDone) {
                  data.push(el)
                }
              })
            }
          })
          break
        case "doing":
          self.todoMap.forEach((value, _) => {
            if (value.length > 0) {
              const dateNow = moment(new Date())
              value.map((el) => {
                if (!el.isDone && dateNow.diff(moment(el.time)) < 0) {
                  data.push(el)
                }
              })
            }
          })
          break
        case "expired":
          self.todoMap.forEach((value, _) => {
            if (value.length > 0) {
              const dateNow = moment(new Date())
              value.map((el) => {
                if (!el.isDone && dateNow.diff(moment(el.time)) > 0) {
                  data.push(el)
                }
              })
            }
          })
          break
        default:
          break
      }
      return data.slice()
    },
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
        self.todoMap.get(key).splice(self.todoMap.get(key).indexOf(item), 1)
        self.setRefreshTodo()
      }
    },
    editTodo: (key, item) => {
      if (self.todoMap.has(key)) {
        const index = self.todoMap.get(key).findIndex((el) => el.id == item.id)
        if (key == utils.displayDateCalendar(item.time)) {
          if (index > -1) {
            self.todoMap.get(key)[index] = item
          }
        } else {
          detach(self.todoMap.get(key)[index])
          if (self.todoMap.has(utils.displayDateCalendar(item.time))) {
            self.todoMap.get(utils.displayDateCalendar(item.time)).push(item)
          } else {
            const dt = []
            dt.push(item)
            self.todoMap.set(utils.displayDateCalendar(item.time), dt)
          }
        }
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
