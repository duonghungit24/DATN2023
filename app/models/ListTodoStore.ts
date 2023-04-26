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

export const ListTodoStoreModel = types
  .model("ListTodoStore")
  .props({
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
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface ListTodoStore extends Instance<typeof ListTodoStoreModel> {}
export interface ListTodoStoreSnapshotOut extends SnapshotOut<typeof ListTodoStoreModel> {}
export interface ListTodoStoreSnapshotIn extends SnapshotIn<typeof ListTodoStoreModel> {}
export const createListTodoStoreDefaultModel = () => types.optional(ListTodoStoreModel, {})
