import { cast, Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import i18n from "i18n-js"
/**
 * Model description here for TypeScript hints.
 */
type Language = "vi" | "ko" | "en" | "ja"
export const LanguagestoreModel = types
  .model("Languagestore")
  .props({
    language: types.optional(types.string, "vi"),
  })
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    setLanguage: (language: Language) => {
      if (self.language === language) return
      self.language = language
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .postProcessSnapshot(snap => {
    console.log('snap',snap)
    i18n.locale = snap.language
  })  


export interface Languagestore extends Instance<typeof LanguagestoreModel> {}
export interface LanguagestoreSnapshotOut extends SnapshotOut<typeof LanguagestoreModel> {}
export interface LanguagestoreSnapshotIn extends SnapshotIn<typeof LanguagestoreModel> {}
export const createLanguagestoreDefaultModel = () => types.optional(LanguagestoreModel, {})
