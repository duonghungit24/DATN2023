import { ListTodoStoreModel } from "./ListTodoStore"

test("can be created", () => {
  const instance = ListTodoStoreModel.create({})

  expect(instance).toBeTruthy()
})
