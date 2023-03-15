import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, ViewStyle, View, TouchableOpacity, Image, ImageStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps, goBack } from "../navigators"
import { Header, ItemSerapator, Screen, Text, VectorsIcon } from "../components"
import { colors } from "../theme"
import { configs } from "../utils/configs"
import { useStores } from "../models"
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
export const ChangeLanguageScreen: FC<StackScreenProps<AppStackScreenProps, "ChangeLanguage">> =
  observer(function ChangeLanguageScreen() {
    // Pull in one of our MST stores
    const { languageStore } = useStores()
    const [isRefresh , setIsRefresh] = useState(false)

    useEffect(() => {
      setIsRefresh(!isRefresh)
    }, [languageStore.language])
    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen style={$root} preset="fixed">
        <Header
          typeIconLeft="AntDesign"
          backgroundColor={colors.neutral000}
          leftIcon="arrowleft"
          titleTx="ngonngu"
          onLeftPress={() => goBack()}
        />
        <FlatList
          data={configs.LIST_LANGUAGE}
          keyExtractor={(_, index) => `${index}`}
          renderItem={({ item }) => {
            return (
              <ItemLanguage
                item={item}
                check={languageStore.language == item.type}
                onPress={() => languageStore.setLanguage(item.type)}
              />
            )
          }}
          style={$listView}
          ItemSeparatorComponent={() => <ItemSerapator />}
        />
      </Screen>
    )
  })

const ItemLanguage = ({ item, check, onPress }) => {
  return (
    <TouchableOpacity style={$viewItem} onPress={onPress} activeOpacity={0.7}>
      <Image
        source={{ uri: "https://cdn-icons-png.flaticon.com/512/323/323319.png" }}
        style={$image}
      />
      <Text>{item.name}</Text>
      <View style={{ flex: 1 }} />
      {check && (
        <VectorsIcon type="AntDesign" name="checkcircle" size={20} color={colors.secondary500} />
      )}
    </TouchableOpacity>
  )
}

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.neutral000,
}
const $viewItem: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: colors.neutral000,
  padding: 12,
  paddingHorizontal: 16,
}
const $listView: ViewStyle = {
  height: configs.windowHeight,
  backgroundColor: colors.neutral000,
  ...configs.shadow,
}
const $image: ImageStyle = {
  width: 30,
  height: 30,
  borderRadius: 15,
  marginRight: 12,
}
