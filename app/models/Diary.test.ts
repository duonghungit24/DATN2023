import { DiaryModel } from "./Diary"

test("can be created", () => {
  const instance = DiaryModel.create({})

  expect(instance).toBeTruthy()
})
