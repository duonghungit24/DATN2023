import { Instance, SnapshotIn, SnapshotOut, destroy, types, cast, detach } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
const MemoItemModel = types.model({
  id: types.maybeNull(types.string),
  title: types.maybeNull(types.string),
  content: types.maybeNull(types.string),
  time: types.maybeNull(types.string),
  emoji: types.maybeNull(types.string),
  isPin: types.maybeNull(types.boolean),
  color: types.maybeNull(types.string),
  location: types.maybeNull(types.string),
  url: types.maybeNull(types.string),
  listImg: types.maybeNull(types.optional(types.frozen(), []))
})
export const MemoModel = types
  .model("Memo")
  .props({
    listMemo : types.optional(types.array(MemoItemModel), []),
    isRefreshMemo: types.optional(types.number, 0)
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    addMemo : (item) => {
      const arr = [item, ...self.listMemo]
       self.listMemo = cast(arr)
       self.isRefreshMemo += 1
    },
    editMemo: (item) => {

    },
    deleteMemo:(id: string) => {
      const index = self.listMemo.findIndex((el) => el.id == id)
      if(index > -1)
      {
        detach(self.listMemo[index])
        self.isRefreshMemo +=1
      }
      
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Memo extends Instance<typeof MemoModel> {}
export interface MemoSnapshotOut extends SnapshotOut<typeof MemoModel> {}
export interface MemoSnapshotIn extends SnapshotIn<typeof MemoModel> {}
export const createMemoDefaultModel = () => types.optional(MemoModel, {})
