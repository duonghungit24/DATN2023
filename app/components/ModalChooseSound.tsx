import * as React from "react"
import { FlatList, ScrollView, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import Modal from "react-native-modal"
import { configs } from "../utils/configs"
import { Button } from "./Button"
import { VectorsIcon } from "./Vectoricon"
import { ItemSerapator } from "./ItemSerapator"

export interface ModalChooseSoundProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  isVisible: boolean
  onBackDropPress: () => void
}

const LIST_SOUND = [
  {
    nameDisplay: "Mặc định",
    source: "",
    nameSound: ""
  },
  {
    nameDisplay: "Clock Alarm",
    source: require("../../assets/sounds/clockAlarm.wav"),
    nameSound: "clockAlarm.wav"
  },
  {
    nameDisplay: "Quân đội",
    source: require("../../assets/sounds/clockAlarm.wav"),
    nameSound: "clockAlarm.wav"
  },
]
/**
 * Describe your component here
 */
export const ModalChooseSound = observer(function ModalChooseSound(props: ModalChooseSoundProps) {
  const { style, isVisible, onBackDropPress } = props
  const $styles = [$container, style]
  const [sound, setSound] = React.useState<any>({})

  return (
    <Modal
      isVisible={isVisible}
      style={$styles}
      animationInTiming={500}
      animationOutTiming={500}
    >
      <View style={$content}>
        <Text preset="bold" tx="chonambao" style={$label} />
        <FlatList 
          data={LIST_SOUND}
          keyExtractor={(_, index) => `${index}`}
          renderItem={({item, index}) => {
            return <ItemSound item={item} onPress={() => setSound(item)} check={sound.nameSound == item.nameSound} />
          }}
          contentContainerStyle={{padding: 16}}
          ItemSeparatorComponent={() => <ItemSerapator  />}
        />
        <View style={$viewButton}>
          <Button
            tx="huy"
            style={[$viewBtn, { backgroundColor: colors.neutral300 }]}
            textStyle={{ color: colors.neutral900 }}
            onPress={onBackDropPress}
          />
          <View style={{ width: 16 }} />
          <Button tx="luu" style={$viewBtn} />
        </View>
      </View>
    </Modal>
  )
})

const ItemSound = ( {check, onPress, item}) => {
  return (
    <TouchableOpacity style={$viewItem} onPress={onPress}>
      <Text preset="medium" style={$text}>{item.nameDisplay}</Text>
      {
        check && <VectorsIcon type="AntDesign" name="checkcircle" size={20} color={colors.success} />
      }
   
    </TouchableOpacity>
  )
}

const $container: ViewStyle = {
  justifyContent: "center",
  margin: 0,
}
const $content: ViewStyle = {
  height: configs.windowHeight / 2,
  backgroundColor: colors.neutral000,
  marginHorizontal: 16,
  borderRadius: 12,
}

const $label: TextStyle = {
  fontSize: 18,
  textAlign: "center",
  color: colors.neutral900,
  padding: 16,
}
const $viewButton: ViewStyle = {
  flexDirection: "row",
  padding: 16,
}
const $viewBtn: ViewStyle = {
  flex: 1,
  borderRadius: 24,
}
const $viewItem : ViewStyle = {
  flexDirection: "row",
  paddingVertical: 12,
}
const $text : TextStyle = {
  flex: 1,
  color: colors.neutral700,
  fontSize: 14
}