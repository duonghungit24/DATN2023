import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { AuthStoreModel } from "./AuthStore"
import { LanguagestoreModel } from "./Languagestore"
import { MemoModel } from "./Memo"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
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
