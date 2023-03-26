import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Button, ModalChooseLanguage, Screen, Text, VectorsIcon } from "../components"
import { colors, spacing, typography } from "../theme"
import { configs } from "../utils/configs"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `ChooseLanguage: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="ChooseLanguage" component={ChooseLanguageScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const ChooseLanguageScreen: FC<StackScreenProps<AppStackScreenProps, "ChooseLanguage">> =
  observer(function ChooseLanguageScreen({navigation}) {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    const [isVisible, setIsVisible] = useState(false)
    const [itemSelect, setItemSelect] = useState<any>({
    })
    // Pull in navigation via hook
    // const navigation = useNavigation()
    const nextScreen = () => {
      navigation.navigate("onboardingScreen")
    }
    return (
      <Screen style={$root} preset="fixed">
        <ModalChooseLanguage
          itemSelect={itemSelect}
          isVisible={isVisible}
          onBackDropPress={() => setIsVisible(false)}
          onPressValue={(value) => setItemSelect(value)}
        />
        <ButtonChoose text={itemSelect.name} onPress={() => setIsVisible(true)} />
        <Button tx="tieptuc" style={$btnContinue} onPress={nextScreen}/>
      </Screen>
    )
  })

const ButtonChoose = ({ text, onPress }: any) => {
  return (
    <TouchableOpacity style={$viewBtn} activeOpacity={0.7} onPress={onPress}>
      <Text preset="medium" tx={!text && "chonngonngu"} text={text} style={{ color: colors.neutral900, fontSize: 16 }} />
    </TouchableOpacity>
  )
}

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.neutral000,
  justifyContent: "center", 
  paddingHorizontal: 16,
}
const $viewBtn: ViewStyle = {
  width: "100%",
  height: 48,
  backgroundColor: colors.neutral000,
  ...configs.shadow,
  borderWidth: 1,
  borderColor: colors.neutral100,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 24,
}
const $btnContinue :ViewStyle = {
  marginTop: spacing.huge
}