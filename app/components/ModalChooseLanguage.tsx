import React, { useState } from "react"
import { FlatList, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle, Image, ImageStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import Modal from "react-native-modal"
import { configs } from "../utils/configs"
import { ItemSerapator } from "./ItemSerapator"
import { VectorsIcon } from "./Vectoricon"
import { useStores } from "../models"

export interface ModalChooseLanguageProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  isVisible: boolean
  itemSelect: any
  onBackDropPress: () => void
  onPressValue: (value) => void
}

/**
 * Describe your component here
 */
export const ModalChooseLanguage = observer(function ModalChooseLanguage(
  props: ModalChooseLanguageProps,
) {
  const { languageStore } = useStores()
  const { style, isVisible, onBackDropPress, onPressValue, itemSelect } = props
  const $styles = [$container, style]

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackDropPress}
      style={$styles}
      animationInTiming={500}
      animationOutTiming={500}
    >
      <View style={$viewModal}>
        <Text tx="chonngonngu" style={$title} />
        <FlatList
          data={configs.LIST_LANGUAGE}
          keyExtractor={(_, index) => `${index}`}
          renderItem={({ item }) => {
            return (
              <ItemLanguage
                item={item}
                check={item.type == itemSelect.type}
                onPress={() => {
                  languageStore.setLanguage(item.type)
                  onPressValue(item)
                  onBackDropPress()
                }}
              />
            )
          }}
          style={{ paddingHorizontal: 16 }}
          ItemSeparatorComponent={() => <ItemSerapator />}
        />
      </View>
    </Modal>
  )
})

const ItemLanguage = ({ item, check, onPress, image }: any) => {
  return (
    <TouchableOpacity style={$viewBtn} onPress={onPress}>
      <Image source={item.image} style={$image} />
      <Text style={$name}>{item.name}</Text>
      <View style={{flex: 1}}/>
      {check && (
        <VectorsIcon type="AntDesign" name="checkcircle" size={20} color={colors.primary600} />
      )}
    </TouchableOpacity>
  )
}

const $container: ViewStyle = {
  margin: 0,
  justifyContent: "center",
}
const $viewModal: ViewStyle = {
  height: configs.windowHeight / 3,
  backgroundColor: colors.neutral000,
  marginHorizontal: 16,
  borderRadius: 8,
}
const $title: TextStyle = {
  textAlign: "center",
  color: colors.neutral900,
  fontSize: 16,
  padding: 8,
}
const $viewBtn: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  padding: 12,
}
const $name: TextStyle = {
  fontSize: 14,
  color: colors.neutral800,
}
const $image : ImageStyle = {
  height: 30,
  width: 30,
  borderRadius: 15,
  marginRight:12
}