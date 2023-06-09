import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ListEventsStoreModel } from "./ListEventsStore"
import { ListTodoStoreModel } from "./ListTodoStore"
import { TodoStoreModel } from "./TodoStore"
import { EventStoreModel } from "./EventStore"
import { ListDiaryStoreModel } from "./ListDiaryStore"
import { AuthStoreModel } from "./AuthStore"
import { LanguagestoreModel } from "./Languagestore"
import { MemoModel } from "./Memo"
import { DiaryModel } from "./Diary"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  listEventsStore: types.optional(ListEventsStoreModel, {} as any),
  listTodoStore: types.optional(ListTodoStoreModel, {} as any),
  todoStore: types.optional(TodoStoreModel, {} as any),
  eventStore: types.optional(EventStoreModel, {} as any),
    diaryStore: types.optional(DiaryModel, {} as any),
    authStore: types.optional(AuthStoreModel, {} as any),
    languageStore:  types.optional(LanguagestoreModel, {} as any),
    AuthStore : types.optional(AuthStoreModel, {} as any),
    memoStore: types.optional(MemoModel, {} as any)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
