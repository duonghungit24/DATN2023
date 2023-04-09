import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, ViewStyle, View, ScrollView, FlatList } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Header, Icon, Screen, Text } from "../components"
import { colors } from "../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Diary: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Diary" component={DiaryScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const DiaryScreen: FC<StackScreenProps<AppStackScreenProps, "Diary">> = observer(function DiaryScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="fixed">
       <Header titleTx="caidat" backgroundColor={colors.neutral000} />
      {/* <ItemDiary /> */}
      <FlatList 
                data={[1,2,3,4,5,6,7,8,1,1,1,10]}
              keyExtractor={(_, index) => `${index}`}
              renderItem={({item, index}) => {
                return (
                  <View style={{height: 50, width: 50, backgroundColor: "red", margin: 4}} />
                )
              }}
              // horizontal
              />

    </Screen>
  )
})

const ItemDiary = () => {
  return (
    <TouchableOpacity activeOpacity={0.9} style={$viewRow}>
      <Text>05:09 CH</Text>
      
      <View style={[$viewRow, {flex: 1}]}>
          <View style={{flex: 1}}> 
              <Text>hiihi</Text>
              <FlatList 
                data={[1,2,3,4,5,6,7,8,1,1,1,10]}
              keyExtractor={(_, index) => `${index}`}
              renderItem={({item, index}) => {
                return (
                  <View style={{height: 50, width: 50, backgroundColor: "red", margin: 4}} />
                )
              }}
              // horizontal
              style={{flexGrow:1}}
              />

          </View>
          <Icon icon="bell" />
      </View>
    </TouchableOpacity>
  )
}

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.neutral000,
}
const $viewRow : ViewStyle = {
  flexDirection: "row",
  // justifyContent: "center",
  // alignItems: 'center'
}