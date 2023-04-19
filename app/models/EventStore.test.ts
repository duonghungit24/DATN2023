import { EventStoreModel } from "./EventStore"

test("can be created", () => {
  const instance = EventStoreModel.create({})

  expect(instance).toBeTruthy()
})
