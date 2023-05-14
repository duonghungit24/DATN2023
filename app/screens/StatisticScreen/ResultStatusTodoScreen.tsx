import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../../navigators"
import { Header, Screen, Text } from "../../components"
import { colors } from "../../theme"
import { ListEmpty } from "../../components/ListEmty"
import { useStores } from "../../models"
import { ItemResult } from "./ResultSearchScreen"
import { toJS } from "mobx"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `ResultStatusTodo: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="ResultStatusTodo" component={ResultStatusTodoScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const ResultStatusTodoScreen: FC<StackScreenProps<AppStackScreenProps, "ResultStatusTodo">> =
  observer(function ResultStatusTodoScreen({ route, navigation }) {
    // Pull in one of our MST stores
    const type = route.params?.type

    const { todoStore } = useStores()
    const [listTodo, setListTodo] = useState([])

    useEffect(() => {
      setListTodo(todoStore.getListStatusTask(type))
      console.log("item", todoStore.getListStatusTask(type))
    }, [todoStore.isRefreshTodo])

    const renderItem = ({ item, index }) => {
      return (
        <ItemResult
          item={item}
          onPressDetail={() =>
            navigation.navigate("detailTodoScreen", { itemTodo: toJS(item), key: item.time })
          }
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

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}
const $line: ViewStyle = { height: 12 }
