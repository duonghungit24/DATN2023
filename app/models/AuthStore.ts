import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
const SoundModel = types.model({
  nameDisplay: types.maybeNull(types.string),
  source: types.maybeNull(types.frozen()),
  nameSound: types.maybeNull(types.string),
})

export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    isIntro: types.optional(types.boolean, true),
    biometric: types.optional(types.boolean, false),
    sound: types.optional(SoundModel, { nameDisplay: "Mặc định", source: "", nameSound: "" }),
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setIntro: () => {
      self.isIntro = false
    },
    setBiometric: (status: boolean) => {
      self.biometric = status
    },
    setSound: (sound) => {
      self.sound = sound
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface AuthStore extends Instance<typeof AuthStoreModel> {}
export interface AuthStoreSnapshotOut extends SnapshotOut<typeof AuthStoreModel> {}
export interface AuthStoreSnapshotIn extends SnapshotIn<typeof AuthStoreModel> {}
export const createAuthStoreDefaultModel = () => types.optional(AuthStoreModel, {})
