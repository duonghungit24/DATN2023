import { LanguagestoreModel } from "./Languagestore"

test("can be created", () => {
  const instance = LanguagestoreModel.create({})

  expect(instance).toBeTruthy()
})
