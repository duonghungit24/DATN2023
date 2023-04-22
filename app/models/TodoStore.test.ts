import { TodoStoreModel } from "./TodoStore"

test("can be created", () => {
  const instance = TodoStoreModel.create({})

  expect(instance).toBeTruthy()
})
