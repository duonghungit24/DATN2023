import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
const TaskChild = types.model({
  id: types.maybeNull(types.string),
  nameTaskChild: types.maybeNull(types.string),
  isDone: types.optional(types.maybeNull(types.boolean), false),
})

const TodoItemModel = types.model({
  id: types.maybeNull(types.string),
  idNotification: types.maybeNull(types.string),
  title: types.maybeNull(types.string),
  content: types.maybeNull(types.string),
  time: types.maybeNull(types.string),
  color: types.maybeNull(types.string),
  location: types.maybeNull(types.string),
  url: types.maybeNull(types.string),
  listTaskChild: types.optional(types.array(TaskChild), []),
  isDone: types.optional(types.maybeNull(types.boolean), false),
})


export const TodoStoreModel = types
  .model("TodoStore")
  .props({
    listTodo : types.optional(types.array(TodoItemModel), []),
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

  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface TodoStore extends Instance<typeof TodoStoreModel> {}
export interface TodoStoreSnapshotOut extends SnapshotOut<typeof TodoStoreModel> {}
export interface TodoStoreSnapshotIn extends SnapshotIn<typeof TodoStoreModel> {}
export const createTodoStoreDefaultModel = () => types.optional(TodoStoreModel, {})
