import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, ViewStyle , View, TouchableOpacity} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Header, Screen, Text } from "../components"
import { colors } from "../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `ChangeLanguage: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="ChangeLanguage" component={ChangeLanguageScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const ChangeLanguageScreen: FC<StackScreenProps<AppStackScreenProps, "ChangeLanguage">> = observer(function ChangeLanguageScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="fixed">
      <Header typeIconLeft="Feather"  backgroundColor="blue"  leftIcon="search" titleTx="common.ok"/>
      <FlatList 
          data={[1,2,3,4]}
          keyExtractor={(_, index) => `${index}`}
          renderItem={({item}) => {
            return <ItemLanguage item={item}/>
          }}
      />
    </Screen>
  )
})

const ItemLanguage = ({item}) => {
  return (
    <TouchableOpacity style={$viewItem}>
        {/* <Image source={} /> */}
        <Text>hello</Text>
    </TouchableOpacity>
  )
}

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.neutral000
}
const $viewItem : ViewStyle = {
  paddingVertical: 12, 
  backgroundColor: colors.neutral400,
  marginTop: 12
}