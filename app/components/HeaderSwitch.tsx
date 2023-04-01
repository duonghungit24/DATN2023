import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import { TextField } from "./TextField"
import { Toggle } from "./Toggle"
import { TypeVectorsIcon, VectorsIcon } from "./Vectoricon"
import { TxKeyPath } from "../i18n"

export interface HeaderSwitchProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  activeToggle: boolean
  onChangeToggle: () => void
  typeIcon : TypeVectorsIcon
  nameIcon: string
  colorIcon?: string
  titleTx: TxKeyPath
}

/**
 * Describe your component here
 */
export const HeaderSwitch = observer(function HeaderSwitch(props: HeaderSwitchProps) {
  const { style , activeToggle, onChangeToggle , colorIcon, nameIcon, typeIcon, titleTx} = props
  const $styles = [$container, style]

  return (
    <View style={$styles}>
      <TextField
        LeftAccessory={() => (
          <LeftAccesstory typeIcon={typeIcon} nameIcon={nameIcon} colorIcon={colorIcon || colors.primary500} />
        )}
        placeholderTx={titleTx}
        inputWrapperStyle={$wrapInput}
        containerStyle={{ flex: 1 }}
        style={{ ...typography.textBold }}
        placeholderTextColor={colors.neutral900}
        editable={false}
      />
      <Toggle
        variant="switch"
        value={activeToggle}
        onPress={onChangeToggle}
      />
    </View>
  )
})
const LeftAccesstory = ({ typeIcon, nameIcon, colorIcon }: any) => {
  return <VectorsIcon type={typeIcon} name={nameIcon} color={colorIcon} size={20} />
}

const $container: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}
const $wrapInput: ViewStyle = {
  borderWidth: 0,
  backgroundColor: colors.neutral000,
  alignItems: "center",
}