import { MemoModel } from "./Memo"

test("can be created", () => {
  const instance = MemoModel.create({})

  expect(instance).toBeTruthy()
})
