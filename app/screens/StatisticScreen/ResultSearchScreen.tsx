import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, Pressable, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../../navigators"
import { Header, Screen, Text, TextField, VectorsIcon } from "../../components"
import { colors } from "../../theme"
import { utils } from "../../utils"
import { ListEmpty } from "../../components/ListEmty"
import { useStores } from "../../models"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `ResultSearch: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="ResultSearch" component={ResultSearchScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const ResultSearchScreen: FC<StackScreenProps<AppStackScreenProps, "ResultSearch">> =
  observer(function ResultSearchScreen({ navigation, route }) {
    // Pull in one of our MST stores
    const { todoStore } = useStores()

    const [textSearch, setTextSearch] = useState("")
    const [listTodo, setListTodo] = useState([])

    // useEffect(() => {
    //   setTextSearch(route.params.textSearch)
    // }, [])

    useEffect(() => {
      setListTodo(todoStore.findTodoBySearch(route.params.textSearch))
    }, [textSearch, todoStore.isRefreshTodo])

    const renderItem = ({ item, index }) => {
      return (
        <ItemResult
          item={item}
          onPressDetail={() => navigation.navigate("detailTodoScreen", { itemTodo: item })}
        />
      )
    }

    return (
      <Screen style={$root} preset="fixed">
        <Header
          typeIconLeft="AntDesign"
          leftIcon="arrowleft"
          typeIconRight="Entypo"
          titleTx="ketqua"
          backgroundColor={colors.neutral000}
        />
        {/* <TextField
          LeftAccessory={() => (
            <VectorsIcon
              type="Feather"
              name="search"
              color={colors.neutral900}
              size={20}
              style={{ marginLeft: 12 }}
            />
          )}
          onChangeText={setTextSearch}
          placeholderTx="placeholderTask"
          containerStyle={{ width: "100%", paddingHorizontal: 16, marginVertical: 12 }}
          inputWrapperStyle={{ alignItems: "center", justifyContent: "center" }}
        /> */}
        <View style={$line} />
        <FlatList
          data={listTodo}
          keyExtractor={(_, index) => `${index}`}
          renderItem={renderItem}
          ListEmptyComponent={<ListEmpty />}
          contentContainerStyle={{ flexGrow: 1 }}
          ItemSeparatorComponent={() => <View style={$line} />}
        />
      </Screen>
    )
  })

const ItemResult = ({ item = {}, onPressDetail }: any) => {
  console.log("item", item)
  return (
    <TouchableOpacity style={[$viewItem]} onPress={onPressDetail}>
      <Text preset="medium" style={$textTime}>
        {utils.displayDateHour(item.time)}
      </Text>
      <Text preset="semibold" style={$title}>
        {item.title}
      </Text>
      <Text preset="regular" style={$text}>
        {item.content}
      </Text>
    </TouchableOpacity>
  )
}

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}
const $viewItem: ViewStyle = {
  backgroundColor: colors.neutral000,
  borderRadius: 5,
  padding: 16,
  // marginHorizontal: 16,
  paddingHorizontal: 16,
}
const $title: TextStyle = { fontSize: 14, color: colors.neutral900, marginTop: 4 }
const $text: TextStyle = { fontSize: 14, color: colors.neutral700, marginTop: 4 }
const $textTime: TextStyle = { color: colors.neutral600, fontSize: 14 }
const $line: ViewStyle = { height: 12 }
