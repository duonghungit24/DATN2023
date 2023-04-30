import { ListEventsStoreModel } from "./ListEventsStore"

test("can be created", () => {
  const instance = ListEventsStoreModel.create({})

  expect(instance).toBeTruthy()
})
