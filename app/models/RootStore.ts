import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { LanguagestoreModel } from "./Languagestore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
    languageStore:  types.optional(LanguagestoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
