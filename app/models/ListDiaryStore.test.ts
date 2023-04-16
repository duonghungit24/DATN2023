import { ListDiaryStoreModel } from "./ListDiaryStore"

test("can be created", () => {
  const instance = ListDiaryStoreModel.create({})

  expect(instance).toBeTruthy()
})
